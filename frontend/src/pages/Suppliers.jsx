import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { Truck, Mail, Phone, MapPin, Trash2, Search, Award, ShieldCheck } from "lucide-react";
import { useSocket } from "../hooks/useSocket";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    category: "Standard"
  });

  const fetchSuppliers = async () => {
    try {
      const res = await API.get("/suppliers");
      setSuppliers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch suppliers error:", error);
    }
  };

  useSocket("suppliers_changed", () => {
    fetchSuppliers();
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/suppliers", form);
      setForm({ name: "", email: "", phone: "", address: "", category: "Standard" });
      fetchSuppliers();
      alert("Supplier added successfully!");
    } catch (error) {
      alert("Failed to add supplier");
    }
  };

  const deleteSupplier = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await API.delete(`/suppliers/${id}`);
        fetchSuppliers();
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  const filteredSuppliers = suppliers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || s.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <Layout title="Supplier Management">
      <div className="supplier-page">
        
        <div className="panel add-panel">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Truck size={22} color="#6366f1" />
            <h2 style={{ margin: 0 }}>Add New Supplier</h2>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
            <div className="input-group">
              <label>Company Name</label>
              <input 
                placeholder="inventory company" 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})}
                required
              />
            </div>
            <div className="input-group">
              <label>Contact Email</label>
              <input 
                type="email" 
                placeholder="inventory@gmail.com" 
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>Supplier Category</label>
              <select 
                value={form.category} 
                onChange={(e) => setForm({...form, category: e.target.value})}
                style={{ padding: "12px 15px", borderRadius: "10px", border: "1px solid #e2e8f0" }}
              >
                <option value="Standard">Standard Supplier</option>
                <option value="Premium">Premium Partner</option>
              </select>
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input 
                placeholder="+91 98765 43210" 
                value={form.phone} 
                onChange={(e) => setForm({...form, phone: e.target.value})}
              />
            </div>
            <div className="input-group" style={{ gridColumn: "span 2" }}>
              <label>Warehouse Address</label>
              <input 
                placeholder="Block A, Warehouse Street, City" 
                value={form.address} 
                onChange={(e) => setForm({...form, address: e.target.value})}
              />
            </div>
            <button type="submit" className="standard-btn primary-btn" style={{ gridColumn: "span 3", marginTop: "10px" }}>
              Register Supplier
            </button>
          </form>
        </div>

        {/* SUPPLIER LIST PANEL */}
        <div className="panel list-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
            <div className="tab-group">
              {["All", "Standard", "Premium"].map(tab => (
                <button 
                  key={tab} 
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab} Partners
                </button>
              ))}
            </div>
            <div className="search-box">
              <Search size={18} />
              <input 
                placeholder="Search by company or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <p>Loading suppliers...</p>
          ) : (
            <div className="supplier-grid">
              {filteredSuppliers.length === 0 ? (
                <div style={{ gridColumn: "span 3", textAlign: "center", padding: "60px", color: "#64748b" }}>
                   <p>No suppliers found matching your criteria.</p>
                </div>
              ) : (
                filteredSuppliers.map(s => (
                  <div key={s._id} className={`supplier-card ${s.category.toLowerCase()}`}>
                    <div className="card-header">
                      <div className={`supplier-avatar ${s.category.toLowerCase()}`}>
                        {s.category === "Premium" ? <Award size={22} color="#8b5cf6" /> : <Truck size={20} color="#6366f1" />}
                      </div>
                      <div className="supplier-main-info">
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <h3>{s.name}</h3>
                          {s.category === "Premium" && <ShieldCheck size={14} color="#8b5cf6" />}
                        </div>
                        <p className="category-badge">{s.category} Tier</p>
                      </div>
                      <div className="card-actions">
                        <button className="action-icon-btn delete" onClick={() => deleteSupplier(s._id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="card-details">
                      <div className="detail-item">
                        <Mail size={14} /> <span>{s.email || "No email"}</span>
                      </div>
                      <div className="detail-item">
                        <Phone size={14} /> <span>{s.phone || "No phone"}</span>
                      </div>
                      <div className="detail-item">
                        <MapPin size={14} /> <span>{s.address || "No address provided"}</span>
                      </div>
                    </div>

                    <div className="card-footer">
                       <span className={`type-tag ${s.category.toLowerCase()}`}>{s.category} Account</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .supplier-page { display: flex; flex-direction: column; gap: 25px; }
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group label { font-size: 13px; font-weight: 700; color: #64748b; }
        .input-group input, .input-group select { padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 10px; outline: none; font-size: 14px; transition: border-color 0.2s; }
        .input-group input:focus, .input-group select:focus { border-color: #6366f1; }
        
        .standard-btn { height: 45px; border-radius: 8px; font-weight: bold; cursor: pointer; border: none; transition: background 0.2s; }
        .primary-btn { background: #6366f1; color: white; }
        .primary-btn:hover { background: #4f46e5; }

        .tab-group { display: flex; gap: 10px; background: #f1f5f9; padding: 5px; border-radius: 12px; }
        .tab-btn { padding: 8px 20px; border: none; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; color: #64748b; background: transparent; transition: all 0.2s; }
        .tab-btn.active { background: white; color: #6366f1; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

        .search-box { display: flex; align-items: center; gap: 10px; background: white; border: 1px solid #e2e8f0; padding: 0 15px; border-radius: 12px; width: 280px; height: 40px; }
        .search-box input { border: none; background: transparent; outline: none; font-size: 14px; width: 100%; }

        .supplier-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .supplier-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
        .supplier-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); border-color: #6366f1; }
        .supplier-card.premium { border-left: 4px solid #8b5cf6; }

        .card-header { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
        .supplier-avatar { width: 45px; height: 45px; background: #f5f3ff; color: #6366f1; display: flex; align-items: center; justify-content: center; border-radius: 12px; font-weight: 800; font-size: 18px; border: 1px solid #ede9fe; }
        .supplier-avatar.premium { background: #f5f3ff; color: #8b5cf6; border-color: #ddd6fe; }
        
        .supplier-main-info h3 { margin: 0; font-size: 16px; font-weight: 700; color: #1e293b; }
        .category-badge { margin: 2px 0 0; font-size: 12px; color: #6366f1; font-weight: 600; background: #eef2ff; padding: 2px 8px; border-radius: 4px; display: inline-block; }
        
        .card-actions { margin-left: auto; }
        .action-icon-btn { width: 32px; height: 32px; border-radius: 8px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
        .action-icon-btn.delete { background: #fef2f2; color: #ef4444; }
        .action-icon-btn.delete:hover { background: #fee2e2; }

        .card-details { display: grid; gap: 10px; border-top: 1px solid #f1f5f9; padding-top: 15px; margin-top: 15px; }
        .detail-item { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #64748b; }
        
        .card-footer { margin-top: 15px; padding-top: 12px; border-top: 1px dashed #e2e8f0; display: flex; justify-content: flex-end; }
        .type-tag { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
        .type-tag.standard { background: #eef2ff; color: #6366f1; }
        .type-tag.premium { background: #f5f3ff; color: #8b5cf6; }
      `}} />
    </Layout>
  );
}

export default Suppliers;
