import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import API from "../services/api";
import AuthSide from "../components/AuthSide";



function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      setError("");
      setSuccess(true);

      setForm({
        name: "",
        email: "",
        password: ""
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };


  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <AuthSide />

        <div className="auth-form-area">
          <h2>Register</h2>

          {success ? (
            <div className="success-card">
              <CheckCircle size={70} />
              <h3>
                Register successful!
                <br />
                Please login.
              </h3>
              <p>Redirecting to login page...</p>
              <div className="progress">
                <span></span>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="auth-form">
              {error && <div className="error">{error}</div>}

              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <label>Password</label>
              <div className="password-box">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />

                {showPassword ? (
                  <EyeOff
                    size={17}
                    onClick={() => setShowPassword(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Eye
                    size={17}
                    onClick={() => setShowPassword(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>

              <button type="submit">Register</button>

              <p className="auth-link">

                Already have account? <Link to="/login">Login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;