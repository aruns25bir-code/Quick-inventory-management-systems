import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import { Pencil, Trash2 } from "lucide-react";
import { useSocket } from "../hooks/useSocket";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  
  useSocket("products_changed", () => {
    loadProducts();
  });
  const [form, setForm] = useState({
    name: "",
    category: "",
    supplier: "",
    price: "",
    stock: ""
  });

  const [editId, setEditId] = useState(null);

  const logoutIfNoToken = (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.message === "No token found" ||
      error.response?.data?.message === "No token provided"
    ) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      logoutIfNoToken(error);
      console.log("Product load error:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/products/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/products", form);
      }

      setForm({
        name: "",
        category: "",
        supplier: "",
        price: "",
        stock: ""
      });

      loadProducts();
    } catch (error) {
      logoutIfNoToken(error);
      alert(error.response?.data?.message || "Product save failed");
    }
  };

  const editProduct = (product) => {
    setEditId(product._id);

    setForm({
      name: product.name,
      category: product.category,
      supplier: product.supplier,
      price: product.price,
      stock: product.stock
    });
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);
      loadProducts();
    } catch (error) {
      logoutIfNoToken(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({
      name: "",
      category: "",
      supplier: "",
      price: "",
      stock: ""
    });
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

  return (
    <Layout title="Products">
      <div className="panel">
        <h2>{editId ? "Update Product" : "Add New Product"}</h2>

        <form className="data-form" onSubmit={submit}>
          <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          <input name="supplier" placeholder="Supplier" value={form.supplier} onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />

          <button
           type="submit"
           onMouseOver={(e) => e.target.style.opacity = "0.9"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
          style={{
        height: "52px",
        padding: "0 28px",
        fontSize: "17px",
        fontWeight: "800",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
        color: "#fff",
        border: "none"
  }}  
>
  {editId ? "Update Product" : "Add Product"}
</button>

          {editId && (
            <button type="button" className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="panel">
        <h2>Product List</h2>

        <table className="recent-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="8">No products added yet</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.supplier}</td>
                  <td>₹{Number(p.price).toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td>{formatDate(p.createdAt)}</td>
                  <td>{formatDate(p.updatedAt)}</td>
                  <td className="table-icons">
                    <Pencil size={16} onClick={() => editProduct(p)} />
                    <Trash2 size={16} onClick={() => deleteProduct(p._id)} />
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

export default Products;