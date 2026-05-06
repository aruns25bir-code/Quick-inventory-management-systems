import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { Search, Star, X, Trash2, ChevronDown } from "lucide-react";

function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [customName, setCustomName] = useState("");

  const templates = [
    "Sales by Customer",
    "Sales by Item",
    "Order Fulfillment By Item",
    "Sales Return History",
    "Sales by Category",
    "Sales by Sales Person",
    "Sales Summary",
    "Profit By Item"
  ];

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data);
    } catch (error) {
      console.error("Fetch reports error:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleCreateReport = async () => {
    if (!selectedTemplate) return alert("Please select a template");
    
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      await API.post("/reports", { 
        name: customName || selectedTemplate,
        category: selectedTemplate.includes("Sales") ? "Sales" : selectedTemplate.includes("Profit") ? "Profit" : "Inventory",
        createdBy: user.name || "System User",
        lastVisited: "Just now"
      });
      setShowModal(false);
      setSelectedTemplate("");
      setCustomName("");
      fetchReports();
    } catch (error) {
      alert("Failed to create report");
    }
  };

  const clearAllReports = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to clear all reports?")) {
      try {
        await API.delete("/reports");
        fetchReports();
      } catch (error) {
        alert("Failed to clear reports");
      }
    }
  };

  const filteredReports = reports.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Reports">
      <div className="reports-container">
        
        <div className="reports-toolbar">
          <div className="search-box-wrapper">
            <Search size={18} className="search-icon-inner" />
            <input 
              type="text" 
              placeholder="Search reports" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", position: "absolute", right: 0 }}>
            <button 
              type="button"
              onClick={clearAllReports}
              className="clear-reports-btn"
            >
              <Trash2 size={16} /> Clear All
            </button>

            <button 
              type="button"
              className="create-report-btn"
              onClick={() => { setShowModal(true); setCustomName(""); setSelectedTemplate(""); }}
            >
              Create New Report
            </button>
          </div>
        </div>

        <div className="panel reports-panel">
          <div className="reports-header">
            <h3>All Reports <span className="count-badge">{reports.length}</span></h3>
          </div>

          <table className="recent-table reports-table">
            <thead>
              <tr>
                <th>REPORT NAME</th>
                <th>REPORT CATEGORY</th>
                <th>CREATED BY</th>
                <th>LAST VISITED</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: "center", padding: "40px" }}>No reports found</td></tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report._id}>
                    <td className="report-name-cell">
                      <Star size={16} className="star-icon" />
                      <a href="#" onClick={(e) => e.preventDefault()}>{report.name}</a>
                    </td>
                    <td>{report.category}</td>
                    <td>{report.createdBy}</td>
                    <td>{report.lastVisited}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <div className="modal-header">
              <h2>Create New Report</h2>
              <X className="close-btn" onClick={() => setShowModal(false)} />
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: "20px", color: "var(--text-secondary)", fontSize: "14px" }}>
                Select a template and give it a custom name if you wish.
              </p>
              
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Report Template</label>
                <div style={{ position: "relative" }}>
                  <select 
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    style={{ 
                      width: "100%", 
                      padding: "12px", 
                      borderRadius: "10px", 
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                      appearance: "none",
                      fontSize: "15px"
                    }}
                  >
                    <option value="">Select a Report Template</option>
                    {templates.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={18} style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-secondary)" }} />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Custom Report Name (Optional)</label>
                <input 
                  type="text"
                  placeholder={selectedTemplate || "My Custom Report"}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    borderRadius: "10px", 
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "15px",
                    outline: "none"
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="proceed-btn" onClick={handleCreateReport}>Create Report</button>
              <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .reports-container { padding-top: 10px; }
        .reports-toolbar { display: flex; justify-content: center; align-items: center; position: relative; margin-bottom: 30px; height: 60px; }
        .search-box-wrapper { position: relative; width: 400px; }
        .search-box-wrapper input { width: 100%; padding: 12px 15px 12px 45px; border: 1px solid var(--border-color); background: var(--bg-primary); border-radius: 12px; font-size: 14px; outline: none; color: var(--text-primary); }
        .search-icon-inner { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #3b82f6; }
        
        .create-report-btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .create-report-btn:hover { background: #2563eb; transform: translateY(-1px); }
        
        .clear-reports-btn { background: var(--bg-primary); color: #ef4444; border: 1px solid var(--border-color); padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 8px; }
        .clear-reports-btn:hover { background: #fee2e2; }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
        .custom-modal { background: var(--bg-secondary); width: 500px; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow); border: 1px solid var(--border-color); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 25px; border-bottom: 1px solid var(--border-color); }
        .modal-header h2 { margin: 0; font-size: 18px; color: var(--text-primary); }
        .close-btn { color: #64748b; cursor: pointer; }
        .modal-body { padding: 25px; }
        
        .modal-footer { padding: 20px 25px; background: var(--bg-primary); display: flex; flex-direction: row-reverse; gap: 12px; }
        .proceed-btn { background: #3b82f6; color: white; border: none; padding: 10px 25px; border-radius: 8px; font-weight: 700; cursor: pointer; }
        .cancel-btn { background: transparent; color: var(--text-primary); border: 1px solid var(--border-color); padding: 10px 25px; border-radius: 8px; font-weight: 600; cursor: pointer; }

        .reports-panel { padding: 0 !important; overflow: hidden; border: 1px solid var(--border-color); background: var(--bg-secondary); border-radius: 12px; }
        .reports-header { padding: 20px 24px; border-bottom: 1px solid var(--border-color); background: var(--bg-primary); }
        .reports-header h3 { margin: 0; font-size: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 10px; }
        .count-badge { background: #3b82f6; color: white; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        .reports-table th { font-size: 12px; text-transform: uppercase; color: var(--text-secondary); background: var(--bg-primary); padding: 14px 24px; text-align: left; }
        .reports-table td { padding: 16px 24px; color: var(--text-primary); font-size: 14px; border-bottom: 1px solid var(--border-color); }
        .report-name-cell { display: flex; align-items: center; gap: 12px; }
        .report-name-cell a { color: #3b82f6; text-decoration: none; font-weight: 600; }
        .star-icon { color: #eab308; }
      `}} />
    </Layout>
  );
}

export default Reports;
