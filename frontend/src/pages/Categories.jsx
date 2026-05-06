import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { Tags, Trash2, Search, Plus, FolderPlus } from "lucide-react";
import { useSocket } from "../hooks/useSocket";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch categories error:", error);
    }
  };

  useSocket("categories_changed", () => {
    fetchCategories();
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      await API.post("/categories", { name, description });
      setName("");
      setDescription("");
      fetchCategories();
    } catch (error) {
      alert("Failed to add category");
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await API.delete(`/categories/${id}`);
        fetchCategories();
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Product Categories">
      <div className="categories-page">
        <div className="panel add-panel">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <FolderPlus size={22} color="#6366f1" />
            <h2 style={{ margin: 0 }}>Create New Category</h2>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "15px", alignItems: "end" }}>
            <div className="input-group">
              <label>Category Name</label>
              <input 
                placeholder="e.g. Electronics, Furniture" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Description (Optional)</label>
              <input 
                placeholder="Brief description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="standard-btn primary-btn" style={{ padding: "0 25px" }}>
              <Plus size={18} /> Add Category
            </button>
          </form>
        </div>

        <div className="panel list-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
            <h3>Existing Categories ({categories.length})</h3>
            <div className="search-box">
              <Search size={18} />
              <input 
                placeholder="Search categories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <div className="category-grid">
              {filteredCategories.length === 0 ? (
                <div style={{ gridColumn: "span 3", textAlign: "center", padding: "60px", color: "#64748b" }}>
                   <p>No categories found.</p>
                </div>
              ) : (
                filteredCategories.map(c => (
                  <div key={c._id} className="category-card">
                    <div className="card-header">
                      <div className="category-icon">
                        <Tags size={20} color="#6366f1" />
                      </div>
                      <div className="category-main-info">
                        <h3>{c.name}</h3>
                        <p>{c.description || "No description"}</p>
                      </div>
                      <button className="action-icon-btn delete" onClick={() => deleteCategory(c._id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .categories-page { display: flex; flex-direction: column; gap: 25px; }
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group label { font-size: 13px; font-weight: 700; color: #64748b; }
        .input-group input { padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 10px; outline: none; font-size: 14px; transition: border-color 0.2s; }
        .input-group input:focus { border-color: #6366f1; }
        
        .standard-btn { height: 45px; border-radius: 8px; font-weight: bold; cursor: pointer; border: none; display: flex; align-items: center; gap: 8px; transition: background 0.2s; }
        .primary-btn { background: #6366f1; color: white; }
        .primary-btn:hover { background: #4f46e5; }

        .search-box { display: flex; align-items: center; gap: 10px; background: white; border: 1px solid #e2e8f0; padding: 0 15px; border-radius: 12px; width: 280px; height: 40px; }
        .search-box input { border: none; background: transparent; outline: none; font-size: 14px; width: 100%; }

        .category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .category-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: transform 0.2s, box-shadow 0.2s; }
        .category-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); border-color: #6366f1; }

        .category-icon { width: 40px; height: 40px; background: #eef2ff; color: #6366f1; display: flex; align-items: center; justify-content: center; border-radius: 10px; }
        .category-main-info h3 { margin: 0; font-size: 16px; font-weight: 700; color: #1e293b; }
        .category-main-info p { margin: 4px 0 0; font-size: 13px; color: #64748b; }
        
        .card-header { display: flex; align-items: center; gap: 15px; }
        .action-icon-btn { width: 32px; height: 32px; border-radius: 8px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; margin-left: auto; }
        .action-icon-btn.delete { background: #fef2f2; color: #ef4444; }
        .action-icon-btn.delete:hover { background: #fee2e2; }
      `}} />
    </Layout>
  );
}

export default Categories;
