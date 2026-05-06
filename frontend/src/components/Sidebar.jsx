import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  LogOut,
  Box,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  ShoppingCart,
  TrendingUp,
  Settings as SettingsIcon,
  Layers,
  History,
  Info
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const [inventoryOpen, setInventoryOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="side-menu">
      <div className="side-brand">
        <Box size={50} className="brand-icon" />
        <div className="brand-text">
          <h3>
            <span className="white-text">Quick</span> <span className="blue-text">Inventory</span>
          </h3>
          <p>Management System</p>
        </div>
      </div>

      <nav>
        <NavLink to="/dashboard"><LayoutDashboard size={20} /> Dashboard</NavLink>

        <div className="nav-group">
          <div className="nav-item-with-sub" onClick={() => setInventoryOpen(!inventoryOpen)}>
            <div className="nav-item-content">
              <Layers size={20} /> Inventory
            </div>
            {inventoryOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>

          {inventoryOpen && (
            <div className="sub-menu">
              <NavLink to="/inventory/all">All Stock</NavLink>
              <NavLink to="/inventory/low">Low Stock</NavLink>
              <NavLink to="/inventory/in">Stock In</NavLink>
              <NavLink to="/inventory/out">Stock Out</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/products"><Package size={20} /> Products</NavLink>
        <NavLink to="/suppliers"><Users size={20} /> Suppliers</NavLink>
        <NavLink to="/customers"><Users size={20} /> Customers</NavLink>

        <NavLink to="/stock-management"><ClipboardList size={20} /> Stock Management</NavLink>
        <NavLink to="/purchase-orders"><ShoppingCart size={20} /> Purchase Orders</NavLink>
        <NavLink to="/sales-orders"><TrendingUp size={20} /> Sales Orders</NavLink>

        <NavLink to="/reports"><BarChart3 size={20} /> Reports</NavLink>
        <NavLink to="/login-history"><History size={20} /> Login History</NavLink>
        <NavLink to="/users"><Users size={20} /> Users</NavLink>
        <NavLink to="/settings"><SettingsIcon size={20} /> Settings</NavLink>
        <NavLink to="/about"><Info size={20} /> About</NavLink>
      </nav>

      <button onClick={logout} className="logout"><LogOut size={18} /> Logout</button>
    </aside>
  );
}

export default Sidebar;
