import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function LoginHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/auth/login-history");
        setHistory(res.data);
      } catch (error) {
        console.error("Failed to fetch login history:", error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Layout title="Login History">
      <div className="panel">
        <h2>Recent Logins</h2>
        <p>Tracking users who have logged into the system.</p>
        
        <table className="recent-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Login Time</th>
              <th>IP Address</th>
              <th>Device / Browser</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr><td colSpan="5">No login records found</td></tr>
            ) : (
              history.map((h) => (
                <tr key={h._id}>
                  <td>{h.name}</td>
                  <td>{h.email}</td>
                  <td>{new Date(h.loginTime).toLocaleString()}</td>
                  <td>{h.ip}</td>
                  <td style={{ fontSize: "12px", color: "#6b7280" }}>{h.userAgent}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default LoginHistory;
