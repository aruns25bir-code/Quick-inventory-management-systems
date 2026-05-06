import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { AlertCircle } from "lucide-react";

function LowStock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");
        const lowStock = res.data.filter(p => p.stock < 10);
        setProducts(lowStock);
      } catch (error) {
        console.log("Stock load error:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <Layout title="Low Stock">
      <div className="panel" style={{ borderLeft: "5px solid #ff3b3b" }}>
        <h2 style={{ color: "#ff3b3b", display: "flex", alignItems: "center", gap: "10px" }}>
          <AlertCircle /> Low Stock Warning
        </h2>
        <p>The following items are running low and need replenishment.</p>
        
        <table className="recent-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Current Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="5">No low stock items found.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.supplier}</td>
                  <td style={{ fontWeight: 800, color: "#ff3b3b" }}>{p.stock}</td>
                  <td><span className="orange-dot"></span> Needs Order</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default LowStock;