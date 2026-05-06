import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { useSocket } from "../hooks/useSocket";

function SalesOrders() {
  const [orders, setOrders] = useState([]);
  
  useSocket("orders_changed", () => {
    loadOrders();
  });
  const [form, setForm] = useState({
    customerName: "",
    items: [{ product: "", quantity: 0, price: 0 }],
    totalAmount: 0,
  });

  const loadOrders = async () => {
    const res = await API.get("/orders/sales");
    setOrders(res.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/orders/sales", form);
      alert("Sales Order created!");

      setForm({
        customerName: "",
        items: [{ product: "", quantity: 0, price: 0 }],
        totalAmount: 0,
      });

      loadOrders();
    } catch (error) {
      alert("Failed to create order");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/sales/${id}`, { status });
      loadOrders();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <Layout title="Sales Orders">
      <div className="panel">
        <h2>Create Sales Order</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Customer Name"
            value={form.customerName}
            onChange={(e) =>
              setForm({ ...form, customerName: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              border: "1px solid #dbe3f0",
              borderRadius: "10px",
              fontSize: "15px",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 150px",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <input
              placeholder="Product Name"
              value={form.items[0].product}
              onChange={(e) => {
                const newItems = [...form.items];
                newItems[0].product = e.target.value;
                setForm({ ...form, items: newItems });
              }}
              required
              style={{
                padding: "14px",
                border: "1px solid #dbe3f0",
                borderRadius: "10px",
                fontSize: "15px",
              }}
            />

            <input
              type="number"
              placeholder="Amount"
              value={form.items[0].quantity || ""}
              onChange={(e) => {
                const val = Number(e.target.value);
                const newItems = [...form.items];
                newItems[0].quantity = val;
                newItems[0].price = 1; // Default price to 1 so total = amount
                setForm({ ...form, items: newItems, totalAmount: val });
              }}
              required
              style={{
                padding: "14px",
                border: "1px solid #dbe3f0",
                borderRadius: "10px",
                fontSize: "15px",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 260px",
              gap: "16px",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                height: "70px",
                border: "2px dashed #10b981",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 22px",
                fontSize: "18px",
                fontWeight: "800",
                color: "#020617",
              }}
            >
              <span>Total Sale Value:</span>
              <span>{form.totalAmount > 0 ? `₹${form.totalAmount.toLocaleString()}` : ""}</span>
            </div>

            <button
              type="submit"
              style={{
                height: "45px",
                background: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Create Sales Order
            </button>
          </div>
        </form>
      </div>

      <div className="panel">
        <h2>Sales Order History</h2>

        <table className="recent-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5">No orders found</td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.customerName}</td>
                  <td>
                    {o.items
                      .map((i) => i.product)
                      .join(", ")}
                  </td>
                  <td>₹{o.totalAmount}</td>
                  <td style={{ fontWeight: "bold" }}>{o.status}</td>
                  <td>
                    {o.status === "Pending" && (
                      <div style={{ display: "flex", gap: "5px" }}>
                        <button
                          onClick={() => updateStatus(o._id, "Shipped")}
                          style={{
                            background: "#3b82f6",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "4px",
                          }}
                        >
                          Ship
                        </button>

                        <button
                          onClick={() => updateStatus(o._id, "Cancelled")}
                          style={{
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "4px",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
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

export default SalesOrders;
