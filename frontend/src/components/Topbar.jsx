import { useState, useEffect } from "react";
import {
  History,
  Search,
  ChevronDown,
  Plus,
  Bell,
  Settings,
  LogOut,
  Moon,
  Sun,
  X,
  AlertTriangle,
  Info,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useSocket } from "../hooks/useSocket";
import "../styles/topbar.css";

function Topbar() {
  const navigate = useNavigate();

  let user = {};
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("Failed to parse user data:", err);
  }

  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifTab, setNotifTab] = useState("all");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const logoutIfNoToken = (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      navigate("/login");
      return true;
    }
    return false;
  };

  const loadNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      if (!logoutIfNoToken(error)) {
        console.error("Failed to load notifications:", error.message);
      }
    }
  };

  useSocket("notifications_changed", () => {
    loadNotifications();
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      loadNotifications();
    } catch (error) {
      if (!logoutIfNoToken(error)) {
        console.error("Failed to mark as read:", error.message);
      }
    }
  };

  const clearAll = async () => {
    try {
      await API.delete("/notifications");
      setNotifications([]);
    } catch (error) {
      if (!logoutIfNoToken(error)) {
        console.error("Failed to clear notifications:", error.message);
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="topbar-header">
      <div className="topbar-left">
        <button className="history-btn" title="Recent History">
          <History size={20} />
        </button>

        <div className="topbar-search-wrapper">
          <div className="search-category-select">
            <Search size={18} />
            <ChevronDown size={14} />
          </div>
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Search in Customers ( / )"
          />
        </div>
      </div>

      <div className="topbar-right" style={{ position: "relative" }}>

        <div className="user-display-name" onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); }}>
          <span>{user.name || "User"}</span>
          <ChevronDown size={14} />
        </div>

        <button className="plus-btn" title="Quick Create" onClick={() => navigate("/products")}>
          <Plus size={20} />
        </button>

        <div className="topbar-icon-group">
          <button className="topbar-icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Notification Bell */}
          <div style={{ position: "relative" }}>
            <button
              className="topbar-icon-btn"
              title="Notifications"
              onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "16px",
                  height: "16px",
                  background: "#ef4444",
                  borderRadius: "50%",
                  border: "2px solid white",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="notification-dropdown">
                <div className="notif-header">
                  <h3>Notifications</h3>
                  <div className="notif-header-actions">
                    <X size={20} style={{ cursor: "pointer" }} onClick={() => setNotifOpen(false)} />
                  </div>
                </div>

                <div className="notif-tabs">
                  <div
                    className={`notif-tab ${notifTab === "all" ? "active" : ""}`}
                    onClick={() => setNotifTab("all")}
                  >
                    All <ChevronDown size={12} style={{ display: "inline", marginLeft: 4 }} />
                  </div>
                  <div
                    className={`notif-tab ${notifTab === "mentions" ? "active" : ""}`}
                    onClick={() => setNotifTab("mentions")}
                  >
                    Mentions
                  </div>
                </div>

                <div className="notif-content" style={{ display: notifications.length > 0 && notifTab === 'all' ? 'block' : 'flex' }}>
                  {notifTab === "all" ? (
                    notifications.length > 0 ? (
                      <div className="notif-list" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {notifications.map(n => (
                          <div
                            key={n._id}
                            className={`notif-item ${!n.read ? 'unread' : ''}`}
                            style={{
                              padding: "15px 20px",
                              borderBottom: "1px solid #f1f5f9",
                              display: "flex",
                              gap: "15px",
                              cursor: "pointer",
                              textAlign: "left",
                              background: !n.read ? "#f8faff" : "white",
                              position: "relative"
                            }}
                          >
                            <div style={{
                              background: n.type === 'alert' ? '#fef2f2' : n.type === 'success' ? '#f0fdf4' : '#eff6ff',
                              padding: "10px",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "40px",
                              width: "40px"
                            }}>
                              {n.type === 'alert' ? (
                                <AlertTriangle size={18} color="#ef4444" />
                              ) : n.type === 'success' ? (
                                <CheckCircle size={18} color="#10b981" />
                              ) : (
                                <Info size={18} color="#3b82f6" />
                              )}
                            </div>
                            <div style={{ flex: 1 }} onClick={() => { if (n.link) navigate(n.link); markAsRead(n._id); setNotifOpen(false); }}>
                              <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e293b", marginBottom: "4px" }}>{n.title}</div>
                              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.4" }}>{n.message}</div>
                              <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "8px" }}>
                                {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            {!n.read && (
                              <button
                                onClick={(e) => { e.stopPropagation(); markAsRead(n._id); }}
                                style={{ background: "none", border: "none", color: "#3b82f6", cursor: "pointer", alignSelf: "center" }}
                                title="Mark as read"
                              >
                                <CheckCircle size={18} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <img src="/images/empty-notif.png" alt="No notifications" className="empty-notif-img" />
                        <p className="empty-notif-text">Uhh... There are no notifications at the moment.</p>
                      </>
                    )
                  ) : (
                    <>
                      <img src="/images/empty-notif.png" alt="No notifications" className="empty-notif-img" />
                      <p className="empty-notif-text">You haven't been mentioned in any conversations yet.</p>
                    </>
                  )}
                </div>

                {notifications.length > 0 && notifTab === 'all' && (
                  <div style={{ padding: "12px", textAlign: "center", borderTop: "1px solid #f1f5f9" }}>
                    <button
                      onClick={clearAll}
                      style={{ background: "none", border: "none", color: "#64748b", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}
                    >
                      Clear All Notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="topbar-icon-btn" title="Settings" onClick={() => navigate("/settings")}>
            <Settings size={20} />
          </button>
        </div>

        <div style={{ position: "relative" }}>
          <img
            src={`https://ui-avatars.com/api/?name=${user.name || "User"}&background=random&color=fff`}
            alt="Avatar"
            className="topbar-avatar"
            onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); }}
            style={{ cursor: "pointer" }}
          />

          {/* User Dropdown */}
          {userOpen && (
            <div style={{
              position: "absolute",
              top: "45px",
              right: 0,
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              width: "180px",
              zIndex: 1001
            }}>
              <div
                style={{ padding: "12px 15px", borderBottom: "1px solid #f1f5f9", fontSize: "12px", color: "#64748b" }}
              >
                Logged in as <b>{user.email}</b>
              </div>
              <div
                className="dropdown-item"
                onClick={() => navigate("/settings")}
                style={{ padding: "10px 15px", cursor: "pointer", display: "flex", gap: "10px", alignItems: "center" }}
              >
                <Settings size={16} /> My Settings
              </div>
              <div
                onClick={logout}
                style={{
                  padding: "12px 15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderTop: "1px solid #f1f5f9"
                }}
              >
                <LogOut size={16} /> Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;