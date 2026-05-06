import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function AllStock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log("Stock load error:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <Layout title="All Stock">
      <div className="panel">
        <h2>Complete Inventory List</h2>

        <table className="recent-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Current Stock</th>
              <th>Price</th>
              <th>Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6">No products found.</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.supplier}</td>
                  <td
                    style={{
                      fontWeight: 700,
                      color: p.stock < 10 ? "#ef4444" : "inherit"
                    }}
                  >
                    {p.stock}
                  </td>
                  <td>₹{Number(p.price).toFixed(2)}</td>
                  <td style={{ fontSize: "12px", color: "#6b7280" }}>
                    {new Date(p.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AllStock;