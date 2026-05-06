import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { UserPlus, Mail, Phone, MapPin, Trash2, Edit2, Search, Star, UserCheck } from "lucide-react";
import { useSocket } from "../hooks/useSocket";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "New"
  });

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch customers error:", error);
    }
  };

  useSocket("customers_changed", () => {
    fetchCustomers();
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/customers", form);
      setForm({ name: "", email: "", phone: "", address: "", type: "New" });
      fetchCustomers();
      alert("Customer added successfully!");
    } catch (error) {
      alert("Failed to add customer");
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await API.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || c.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <Layout title="Customer Management">
      <div className="customer-page">

        <div className="panel add-panel">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <UserPlus size={22} color="#3b82f6" />
            <h2 style={{ margin: 0 }}>Add New Customer</h2>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                placeholder="Arun"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Arun@gamil.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Customer Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                style={{ padding: "12px 15px", borderRadius: "10px", border: "1px solid #e2e8f0" }}
              >
                <option value="New">New Customer</option>
                <option value="Regular">Regular Customer</option>
              </select>
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="input-group" style={{ gridColumn: "span 2" }}>
              <label>Address</label>
              <input
                placeholder=" inventory Street company,City"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <button type="submit" className="standard-btn primary-btn" style={{ gridColumn: "span 3", marginTop: "10px" }}>
              Save Customer Profile
            </button>
          </form>
        </div>

        <div className="panel list-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
            <div className="tab-group">
              {["All", "New", "Regular"].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab} Customers
                </button>
              ))}
            </div>
            <div className="search-box">
              <Search size={18} />
              <input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <p>Loading customers...</p>
          ) : (
            <div className="customer-grid">
              {filteredCustomers.length === 0 ? (
                <div style={{ gridColumn: "span 3", textAlign: "center", padding: "60px", color: "#64748b" }}>
                  <p>No customers found matching your criteria.</p>
                </div>
              ) : (
                filteredCustomers.map(c => (
                  <div key={c._id} className={`customer-card ${c.type.toLowerCase()}`}>
                    <div className="card-header">
                      <div className={`customer-avatar ${c.type.toLowerCase()}`}>
                        {c.type === "Regular" ? <Star size={20} fill="#f59e0b" strokeWidth={0} /> : c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="customer-main-info">
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <h3>{c.name}</h3>
                          {c.type === "Regular" && <UserCheck size={14} color="#f59e0b" />}
                        </div>
                      </div>
                      <div className="card-actions">
                        <button className="action-icon-btn delete" onClick={() => deleteCustomer(c._id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="card-details">
                      <div className="detail-item">
                        <Mail size={14} /> <span>{c.email}</span>
                      </div>
                      <div className="detail-item">
                        <Phone size={14} /> <span>{c.phone || "No phone"}</span>
                      </div>
                      <div className="detail-item">
                        <MapPin size={14} /> <span>{c.address || "No address provided"}</span>
                      </div>
                    </div>

                    <div className="card-footer">
                      <span className={`type-tag ${c.type.toLowerCase()}`}>{c.type} Customer</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .customer-page { display: flex; flex-direction: column; gap: 25px; }
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group label { font-size: 13px; font-weight: 700; color: #64748b; }
        .input-group input, .input-group select { padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 10px; outline: none; font-size: 14px; transition: border-color 0.2s; }
        .input-group input:focus, .input-group select:focus { border-color: #3b82f6; }
        
        .standard-btn { height: 45px; border-radius: 8px; font-weight: bold; cursor: pointer; border: none; transition: background 0.2s; }
        .primary-btn { background: #3b82f6; color: white; }
        .primary-btn:hover { background: #2563eb; }

        .tab-group { display: flex; gap: 10px; background: #f1f5f9; padding: 5px; border-radius: 12px; }
        .tab-btn { padding: 8px 20px; border: none; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; color: #64748b; background: transparent; transition: all 0.2s; }
        .tab-btn.active { background: white; color: #3b82f6; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

        .search-box { display: flex; align-items: center; gap: 10px; background: white; border: 1px solid #e2e8f0; padding: 0 15px; border-radius: 12px; width: 280px; height: 40px; }
        .search-box input { border: none; background: transparent; outline: none; font-size: 14px; width: 100%; }

        .customer-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .customer-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
        .customer-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); border-color: #3b82f6; }
        .customer-card.regular { border-left: 4px solid #f59e0b; }

        .card-header { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
        .customer-avatar { width: 45px; height: 45px; background: #eff6ff; color: #3b82f6; display: flex; align-items: center; justify-content: center; border-radius: 12px; font-weight: 800; font-size: 18px; border: 1px solid #dbeafe; }
        .customer-avatar.regular { background: #fffbeb; color: #f59e0b; border-color: #fef3c7; }
        
        .customer-main-info h3 { margin: 0; font-size: 16px; font-weight: 700; color: #1e293b; }
        .spent-badge { margin: 2px 0 0; font-size: 12px; color: #10b981; font-weight: 600; background: #f0fdf4; padding: 2px 8px; border-radius: 4px; display: inline-block; }
        
        .card-actions { margin-left: auto; }
        .action-icon-btn { width: 32px; height: 32px; border-radius: 8px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
        .action-icon-btn.delete { background: #fef2f2; color: #ef4444; }
        .action-icon-btn.delete:hover { background: #fee2e2; }

        .card-details { display: grid; gap: 10px; border-top: 1px solid #f1f5f9; padding-top: 15px; margin-top: 15px; }
        .detail-item { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #64748b; }
        
        .card-footer { margin-top: 15px; padding-top: 12px; border-top: 1px dashed #e2e8f0; display: flex; justify-content: flex-end; }
        .type-tag { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
        .type-tag.new { background: #eff6ff; color: #3b82f6; }
        .type-tag.regular { background: #fffbeb; color: #f59e0b; }
      `}} />
    </Layout>
  );
}

export default Customers;
