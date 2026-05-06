import { Link } from "react-router-dom";
import { Box, Package, BarChart3, Shield, Zap, ArrowRight, CheckCircle } from "lucide-react";

function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="home-nav">
        <div className="home-logo">
          <Box size={28} />
          <span><strong>Quick</strong> Inventory</span>
        </div>
        <div className="home-nav-links">
          <Link to="/login" className="home-nav-login">Login</Link>
          <Link to="/register" className="home-nav-register">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-left">
          <div className="home-badge">
            <Zap size={14} /> Inventory Management System
          </div>
          <h1>
            Take Control of <br />
            <span className="home-highlight">Your Inventory</span><br />
            With Confidence
          </h1>
          <p>
            Manage products, suppliers, stock levels, orders and reports — all in one
            powerful and easy-to-use platform built for modern businesses.
          </p>
          <div className="home-hero-btns">
            <Link to="/register" className="home-btn-primary">
              Start for Free <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="home-btn-ghost">
              Already have an account?
            </Link>
          </div>
          <div className="home-checks">
            <span><CheckCircle size={15} /> No credit card required</span>
            <span><CheckCircle size={15} /> Real-time updates</span>
            <span><CheckCircle size={15} /> Secure & reliable</span>
          </div>
        </div>

        <div className="home-hero-right">
          <div className="home-dashboard-card">
            <div className="hdc-header">
              <div className="hdc-dot red" /><div className="hdc-dot yellow" /><div className="hdc-dot green" />
              <span>Quick Inventory Dashboard</span>
            </div>
            <div className="hdc-body">
              <div className="hdc-stats">
                <div className="hdc-stat blue">
                  <p>Total Products</p>
                  <h3>1,284</h3>
                </div>
                <div className="hdc-stat green">
                  <p>In Stock</p>
                  <h3>1,102</h3>
                </div>
                <div className="hdc-stat red">
                  <p>Low Stock</p>
                  <h3>182</h3>
                </div>
              </div>
              <div className="hdc-bars">
                <div className="hdc-bar-row">
                  <span>Electronics</span>
                  <div className="hdc-bar"><div style={{ width: "78%", background: "#3b82f6" }} /></div>
                  <span>78%</span>
                </div>
                <div className="hdc-bar-row">
                  <span>Clothing</span>
                  <div className="hdc-bar"><div style={{ width: "55%", background: "#10b981" }} /></div>
                  <span>55%</span>
                </div>
                <div className="hdc-bar-row">
                  <span>Food</span>
                  <div className="hdc-bar"><div style={{ width: "40%", background: "#f59e0b" }} /></div>
                  <span>40%</span>
                </div>
                <div className="hdc-bar-row">
                  <span>Tools</span>
                  <div className="hdc-bar"><div style={{ width: "65%", background: "#8b5cf6" }} /></div>
                  <span>65%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <h2>Everything your business needs</h2>
        <p>One platform to track, manage and grow your inventory operations.</p>
        <div className="home-features-grid">
          <div className="home-feature-card">
            <div className="home-feature-icon" style={{ background: "#eff6ff", color: "#3b82f6" }}>
              <Package size={24} />
            </div>
            <h3>Product Management</h3>
            <p>Add, update and track all your products with categories, pricing and stock levels in real time.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon" style={{ background: "#f0fdf4", color: "#22c55e" }}>
              <BarChart3 size={24} />
            </div>
            <h3>Reports & Analytics</h3>
            <p>Generate detailed sales, stock and purchase reports to make smarter business decisions.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon" style={{ background: "#fef3c7", color: "#f59e0b" }}>
              <Zap size={24} />
            </div>
            <h3>Real-Time Sync</h3>
            <p>All data updates instantly across every device using Socket.io live synchronisation.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon" style={{ background: "#fdf4ff", color: "#a855f7" }}>
              <Shield size={24} />
            </div>
            <h3>Secure & Reliable</h3>
            <p>JWT-based authentication and MongoDB storage keep your business data safe and protected.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to take control of your stock?</h2>
        <p>Join businesses already using Quick Inventory to manage smarter.</p>
        <Link to="/register" className="home-btn-primary">
          Create Free Account <ArrowRight size={18} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-logo">
          <Box size={20} />
          <span><strong>Quick</strong> Inventory</span>
        </div>
        <p>© 2026 Quick Inventory Management System. All rights reserved.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .home-page {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          color: #1e293b;
        }

        /* NAV */
        .home-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 8%;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .home-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.2rem;
          color: #1e3a8a;
        }

        .home-logo svg { color: #3b82f6; }

        .home-nav-links { display: flex; gap: 1rem; align-items: center; }

        .home-nav-login {
          padding: 0.5rem 1.2rem;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          text-decoration: none;
          color: #475569;
          font-weight: 600;
          transition: all 0.2s;
        }
        .home-nav-login:hover { background: #f1f5f9; }

        .home-nav-register {
          padding: 0.5rem 1.4rem;
          background: #1e3a8a;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          transition: background 0.2s;
        }
        .home-nav-register:hover { background: #1e40af; }

        /* HERO */
        .home-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: 5rem 8%;
          background: linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%);
        }

        .home-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #dbeafe;
          color: #1d4ed8;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .home-hero-left h1 {
          font-size: 3.2rem;
          line-height: 1.15;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1.2rem;
        }

        .home-highlight {
          background: linear-gradient(135deg, #1e3a8a, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .home-hero-left p {
          font-size: 1.05rem;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 480px;
        }

        .home-hero-btns {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .home-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.85rem 2rem;
          background: #1e3a8a;
          color: #fff;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          transition: background 0.2s, transform 0.2s;
        }
        .home-btn-primary:hover { background: #1e40af; transform: translateY(-2px); }

        .home-btn-ghost {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .home-btn-ghost:hover { text-decoration: underline; }

        .home-checks {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .home-checks span {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #475569;
          font-weight: 500;
        }
        .home-checks svg { color: #22c55e; }

        /* DASHBOARD CARD */
        .home-dashboard-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 25px 60px rgba(30, 58, 138, 0.12);
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .hdc-header {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f1f5f9;
          padding: 14px 20px;
          border-bottom: 1px solid #e2e8f0;
        }

        .hdc-dot { width: 12px; height: 12px; border-radius: 50%; }
        .hdc-dot.red { background: #ef4444; }
        .hdc-dot.yellow { background: #f59e0b; }
        .hdc-dot.green { background: #22c55e; }
        .hdc-header span { font-size: 0.8rem; color: #64748b; font-weight: 600; margin-left: 4px; }

        .hdc-body { padding: 24px; }

        .hdc-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .hdc-stat {
          padding: 16px;
          border-radius: 10px;
          text-align: center;
        }
        .hdc-stat.blue { background: #eff6ff; }
        .hdc-stat.green { background: #f0fdf4; }
        .hdc-stat.red { background: #fff1f2; }
        .hdc-stat p { font-size: 0.7rem; color: #64748b; font-weight: 600; margin-bottom: 4px; }
        .hdc-stat h3 { font-size: 1.4rem; font-weight: 800; color: #0f172a; }

        .hdc-bars { display: flex; flex-direction: column; gap: 14px; }

        .hdc-bar-row {
          display: grid;
          grid-template-columns: 80px 1fr 35px;
          align-items: center;
          gap: 10px;
          font-size: 0.78rem;
          color: #475569;
          font-weight: 600;
        }

        .hdc-bar {
          height: 8px;
          background: #f1f5f9;
          border-radius: 100px;
          overflow: hidden;
        }

        .hdc-bar div {
          height: 100%;
          border-radius: 100px;
          transition: width 0.3s;
        }

        /* FEATURES */
        .home-features {
          padding: 5rem 8%;
          text-align: center;
        }

        .home-features h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.75rem;
        }

        .home-features > p {
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 3rem;
        }

        .home-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          text-align: left;
        }

        .home-feature-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 2rem;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .home-feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .home-feature-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          margin-bottom: 1.2rem;
        }

        .home-feature-card h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.6rem;
        }

        .home-feature-card p {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.6;
        }

        /* CTA */
        .home-cta {
          background: linear-gradient(135deg, #1e3a8a, #2563eb);
          color: #fff;
          text-align: center;
          padding: 5rem 8%;
        }

        .home-cta h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
        }

        .home-cta p {
          color: rgba(255,255,255,0.8);
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .home-cta .home-btn-primary {
          background: #fff;
          color: #1e3a8a;
        }
        .home-cta .home-btn-primary:hover { background: #f1f5f9; }

        /* FOOTER */
        .home-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 8%;
          background: #fff;
          border-top: 1px solid #e2e8f0;
        }

        .home-footer p { font-size: 0.85rem; color: #94a3b8; }

        @media (max-width: 900px) {
          .home-hero { grid-template-columns: 1fr; }
          .home-hero-left h1 { font-size: 2.4rem; }
          .home-hero-right { display: none; }
          .home-footer { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}} />
    </div>
  );
}

export default Home;
