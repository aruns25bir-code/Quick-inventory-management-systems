import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { User, Building2, ShieldCheck, Globe, Save, KeyRound, Mail, Phone, MapPin, DollarSign } from "lucide-react";
import "../styles/settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [companySettings, setCompanySettings] = useState({
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
    currency: "$",
  });

  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await API.get("/settings");
      setCompanySettings(res.data);
    } catch (error) {
      // Failed to fetch settings
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      localStorage.setItem("user", JSON.stringify(user));
      setMessage({ type: "success", text: "Profile updated successfully (locally)" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setMessage({ type: "error", text: "Passwords do not match" });
    }
    setLoading(true);
    try {
      await API.post("/auth/change-password", {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });
      setMessage({ type: "success", text: "Password changed successfully" });
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to change password" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put("/settings", companySettings);
      setMessage({ type: "success", text: "Company settings updated successfully" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update company settings" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Settings">
      <div className="settings-container">
        <div className="settings-nav">
          <button 
            className={activeTab === "profile" ? "active" : ""} 
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} /> User Profile
          </button>
          <button 
            className={activeTab === "company" ? "active" : ""} 
            onClick={() => setActiveTab("company")}
          >
            <Building2 size={18} /> Company Details
          </button>
          <button 
            className={activeTab === "security" ? "active" : ""} 
            onClick={() => setActiveTab("security")}
          >
            <ShieldCheck size={18} /> Security
          </button>
          <button 
            className={activeTab === "localization" ? "active" : ""} 
            onClick={() => setActiveTab("localization")}
          >
            <Globe size={18} /> Localization
          </button>
        </div>

        <div className="settings-content glass-effect">
          {message.text && (
            <div className={`alert ${message.type}`}>
              {message.text}
            </div>
          )}

          {activeTab === "profile" && (
            <form onSubmit={handleUpdateProfile} className="settings-form">
              <h3>Profile Information</h3>
              <p>Manage your account details and how others see you.</p>
              
              <div className="form-group">
                <label><User size={14} /> Full Name</label>
                <input 
                  type="text" 
                  value={user.name} 
                  onChange={(e) => setUser({...user, name: e.target.value})} 
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label><Mail size={14} /> Email Address</label>
                <input 
                  type="email" 
                  value={user.email} 
                  readOnly
                  className="readonly-input"
                />
                <small>Email cannot be changed for security reasons.</small>
              </div>

              <button type="submit" className="save-btn" disabled={loading}>
                <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}

          {activeTab === "security" && (
            <form onSubmit={handleChangePassword} className="settings-form">
              <h3>Security Settings</h3>
              <p>Update your password to keep your account secure.</p>
              
              <div className="form-group">
                <label><KeyRound size={14} /> Current Password</label>
                <input 
                  type="password" 
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label><KeyRound size={14} /> New Password</label>
                <input 
                  type="password" 
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label><KeyRound size={14} /> Confirm New Password</label>
                <input 
                  type="password" 
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                  required
                />
              </div>

              <button type="submit" className="save-btn" disabled={loading}>
                <ShieldCheck size={18} /> {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}

          {activeTab === "company" && (
            <form onSubmit={handleUpdateCompany} className="settings-form">
              <h3>Company Information</h3>
              <p>These details will appear on invoices and reports.</p>
              
              <div className="form-group">
                <label><Building2 size={14} /> Company Name</label>
                <input 
                  type="text" 
                  value={companySettings.companyName}
                  onChange={(e) => setCompanySettings({...companySettings, companyName: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label><Mail size={14} /> Company Email</label>
                <input 
                  type="email" 
                  value={companySettings.companyEmail}
                  onChange={(e) => setCompanySettings({...companySettings, companyEmail: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label><Phone size={14} /> Contact Number</label>
                <input 
                  type="text" 
                  value={companySettings.companyPhone}
                  onChange={(e) => setCompanySettings({...companySettings, companyPhone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label><MapPin size={14} /> Address</label>
                <textarea 
                  value={companySettings.companyAddress}
                  onChange={(e) => setCompanySettings({...companySettings, companyAddress: e.target.value})}
                />
              </div>

              <button type="submit" className="save-btn" disabled={loading}>
                <Save size={18} /> {loading ? "Saving..." : "Save Company Info"}
              </button>
            </form>
          )}

          {activeTab === "localization" && (
            <form onSubmit={handleUpdateCompany} className="settings-form">
              <h3>Localization & Display</h3>
              <p>Configure how numbers and dates are displayed.</p>
              
              <div className="form-group">
                <label><DollarSign size={14} /> Primary Currency Symbol</label>
                <select 
                  value={companySettings.currency}
                  onChange={(e) => setCompanySettings({...companySettings, currency: e.target.value})}
                >
                  <option value="$">USD ($)</option>
                  <option value="€">EUR (€)</option>
                  <option value="£">GBP (£)</option>
                  <option value="₹">INR (₹)</option>
                  <option value="¥">JPY (¥)</option>
                </select>
              </div>

              <div className="form-group">
                <label><Globe size={14} /> Timezone</label>
                <select 
                  value={companySettings.timezone}
                  onChange={(e) => setCompanySettings({...companySettings, timezone: e.target.value})}
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                  <option value="IST">IST</option>
                </select>
              </div>

              <button type="submit" className="save-btn" disabled={loading}>
                <Save size={18} /> {loading ? "Saving..." : "Save Preferences"}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Settings;