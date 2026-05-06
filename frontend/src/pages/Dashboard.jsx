import { useEffect, useState } from "react";
import {
  Package,
  Tags,
  Users,
  ClipboardList,
  Plus,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import { useSocket } from "../hooks/useSocket";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useSocket("products_changed", () => {
    load();
  });

  useSocket("suppliers_changed", () => {
    load();
  });

  const load = async () => {
    try {
      const [p, s] = await Promise.all([
        API.get("/products"),
        API.get("/suppliers")
      ]);

      setProducts(p.data);
      setSuppliers(s.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    load();
  }, []);

  const lowStock = products.filter((p) => Number(p.stock) < 10).length;
  const categoriesCount = [...new Set(products.map(p => p.category))].length;

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <Layout title="Dashboard">
      <div className="dash-grid">
        <section className="left-content">
          <div className="stat-row">
            <div className="small-stat purple">
              <Package />
              <div>
                <p>Total Products</p>
                <h3>{products.length}</h3>
                <span>Live from MongoDB</span>
              </div>
            </div>

            <div className="small-stat green">
              <Tags />
              <div>
                <p>Categories</p>
                <h3>{categoriesCount}</h3>
                <span>Live update</span>
              </div>
            </div>

            <div className="small-stat orange">
              <Users />
              <div>
                <p>Suppliers</p>
                <h3>{suppliers.length}</h3>
                <span>Live update</span>
              </div>
            </div>

            <div className="small-stat blue">
              <ClipboardList />
              <div>
                <p>Low Stock Items</p>
                <h3>{lowStock}</h3>
                <span>Stock below 10</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>Recent Products</h2>

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
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="7">No products added yet</td>
                  </tr>
                ) : (
                  products.slice(0, 5).map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.supplier}</td>
                      <td>₹{Number(p.price).toFixed(2)}</td>
                      <td>{p.stock}</td>
                      <td>{formatDate(p.createdAt)}</td>
                      <td>{formatDate(p.updatedAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="right-content">
          <div className="panel stock-panel">
            <h2>Stock Overview</h2>
            <div className="donut"></div>
            <ul>
              <li><span className="green-dot"></span> In Stock <b>{products.filter(p => p.stock >= 10).length}</b></li>
              <li><span className="orange-dot"></span> Low Stock <b>{lowStock}</b></li>
              <li><span className="red-dot"></span> Out of Stock <b>{products.filter(p => p.stock == 0).length}</b></li>
            </ul>
          </div>

          <div className="panel quick-panel">
            <h2>Quick Actions</h2>
            <Link to="/products"><Plus /> Add New Product <ChevronRight /></Link>
            <Link to="/suppliers"><Users /> Add New Supplier <ChevronRight /></Link>
            <Link to="/reports"><ClipboardList /> View Reports <ChevronRight /></Link>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export default Dashboard;