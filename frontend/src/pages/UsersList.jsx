import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/auth/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Layout title="Registered Users">
      <div className="panel">
        <h2>User Accounts</h2>
        <p>List of all registered users in the system.</p>
        
        <table className="recent-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="4">No users found</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span style={{ 
                      padding: "4px 10px", 
                      borderRadius: "20px", 
                      fontSize: "12px", 
                      fontWeight: "bold",
                      background: u.role === "Admin" ? "#ede8ff" : "#f1f3f9",
                      color: u.role === "Admin" ? "#6646ee" : "#64748b"
                    }}>
                      {u.role || "User"}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default UsersList;
