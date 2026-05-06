import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function StockIn() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    reason: "Restock"
  });

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Load products error:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/stock/move", { ...form, type: "IN" });
      alert("Stock added successfully!");
      setForm({ productId: "", quantity: "", reason: "Restock" });
      loadProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update stock");
    }
  };

  return (
    <Layout title="Stock In">
      <div className="panel">
        <h2>Record Incoming Stock</h2>
        <form className="data-form" onSubmit={submit}>
          <select 
            value={form.productId} 
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} - Current Stock: {p.stock}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Enter Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            required
          />

          <input 
            placeholder="Reason (optional)" 
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />

          <button type="submit" style={{
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold"
          }}>Confirm Stock In</button>
        </form>
      </div>
    </Layout>
  );
}

export default StockIn;