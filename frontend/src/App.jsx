import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";
import AllStock from "./pages/AllStock";
import LowStock from "./pages/LowStock";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import StockManagement from "./pages/StockManagement";
import PurchaseOrders from "./pages/PurchaseOrders";
import SalesOrders from "./pages/SalesOrders";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import LoginHistory from "./pages/LoginHistory";
import UsersList from "./pages/UsersList";
import About from "./pages/About";
import Home from "./pages/Home";
import Categories from "./pages/Categories";






import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
        
        <Route path="/inventory/all" element={<ProtectedRoute><AllStock /></ProtectedRoute>} />
        <Route path="/inventory/low" element={<ProtectedRoute><LowStock /></ProtectedRoute>} />
        <Route path="/inventory/in" element={<ProtectedRoute><StockIn /></ProtectedRoute>} />
        <Route path="/inventory/out" element={<ProtectedRoute><StockOut /></ProtectedRoute>} />
        
        <Route path="/stock-management" element={<ProtectedRoute><StockManagement /></ProtectedRoute>} />
        <Route path="/purchase-orders" element={<ProtectedRoute><PurchaseOrders /></ProtectedRoute>} />
        <Route path="/sales-orders" element={<ProtectedRoute><SalesOrders /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/login-history" element={<ProtectedRoute><LoginHistory /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />





      </Routes>
    </BrowserRouter>
  );
}

export default App;
