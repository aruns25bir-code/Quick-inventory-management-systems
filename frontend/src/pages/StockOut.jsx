import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function StockOut() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    reason: "Sale"
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

    const product = products.find((p) => p._id === form.productId);
    if (!product) {
      alert("Please select a product");
      return;
    }

    if (Number(form.quantity) > Number(product.stock)) {
      alert("Stock out quantity is greater than available stock");
      return;
    }

    try {
      await API.post("/stock/move", { ...form, type: "OUT" });
      alert("Stock removed successfully!");
      setForm({ productId: "", quantity: "", reason: "Sale" });
      loadProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update stock");
    }
  };

  return (
    <Layout title="Stock Out">
      <div className="panel">
        <h2>Record Outgoing Stock</h2>
        <form className="data-form" onSubmit={submit}>
          <select 
            value={form.productId} 
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} - Available Stock: {p.stock}
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
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold"
          }}>Confirm Stock Out</button>
        </form>
      </div>
    </Layout>
  );
}

export default StockOut;