import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function StockManagement() {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const loadMovements = async () => {
      try {
        const res = await API.get("/stock/movements");
        setMovements(res.data);
      } catch (error) {
        console.log("Movement load error:", error);
      }
    };
    loadMovements();
  }, []);

  return (
    <Layout title="Stock Management">
      <div className="panel">
        <h2>Stock Movement History</h2>
        <p>Tracking all IN, OUT, and ADJUSTMENT operations.</p>
        
        <table className="recent-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {movements.length === 0 ? (
              <tr><td colSpan="5">No movements recorded yet.</td></tr>
            ) : (
              movements.map((m) => (
                <tr key={m._id}>
                  <td>{new Date(m.date).toLocaleString()}</td>
                  <td>{m.productId?.name || "Deleted Product"}</td>
                  <td>
                    <span style={{ 
                      padding: "4px 10px", 
                      borderRadius: "20px", 
                      fontSize: "12px", 
                      fontWeight: "bold",
                      background: m.type === "IN" ? "#e2f8ed" : m.type === "OUT" ? "#fff0df" : "#f1f3f9",
                      color: m.type === "IN" ? "#22a464" : m.type === "OUT" ? "#fb8734" : "#64748b"
                    }}>
                      {m.type}
                    </span>
                  </td>
                  <td style={{ fontWeight: 800 }}>{m.quantity}</td>
                  <td>{m.reason}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default StockManagement;