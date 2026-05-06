import {
  Target,
  Star,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Info
} from "lucide-react";
import Layout from "../components/Layout";

const ClipboardIllustration = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="30" width="100" height="130" rx="8" fill="white" stroke="#1e3a8a" strokeWidth="2" />
    <rect x="55" y="55" width="70" height="4" rx="2" fill="#e2e8f0" />
    <rect x="55" y="70" width="50" height="4" rx="2" fill="#e2e8f0" />
    <rect x="55" y="85" width="70" height="4" rx="2" fill="#e2e8f0" />
    <rect x="55" y="100" width="40" height="4" rx="2" fill="#e2e8f0" />

    <circle cx="48" cy="57" r="3" fill="#22c55e" />
    <circle cx="48" cy="72" r="3" fill="#22c55e" />
    <circle cx="48" cy="87" r="3" fill="#22c55e" />
    <circle cx="48" cy="102" r="3" fill="#22c55e" />

    <rect x="75" y="20" width="30" height="15" rx="4" fill="#1e293b" />
    <rect x="82" y="15" width="16" height="8" rx="2" fill="#475569" />

    <g transform="translate(120, 100)">
      <rect x="0" y="30" width="70" height="50" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="1" />
      <path d="M0 45 H70" stroke="#78350f" strokeWidth="1" />
      <rect x="30" y="35" width="10" height="5" fill="#d97706" />

      <rect x="20" y="0" width="55" height="40" rx="4" fill="#d97706" stroke="#92400e" strokeWidth="1" />
      <path d="M20 15 H75" stroke="#92400e" strokeWidth="1" />
      <rect x="45" y="5" width="10" height="5" fill="#f59e0b" />
    </g>
  </svg>
);

const WarehouseIllustration = () => (
  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 90 V40 L60 20 L110 40 V90 H10Z" fill="#1e3a8a" stroke="#172554" strokeWidth="2" />
    <rect x="40" y="55" width="40" height="35" fill="#334155" />
    <path d="M40 55 H80" stroke="#172554" strokeWidth="2" />
    <rect x="45" y="65" width="30" height="2" fill="#475569" />
    <rect x="45" y="75" width="30" height="2" fill="#475569" />

    <rect x="45" y="80" width="10" height="8" fill="#d97706" rx="1" />
    <rect x="57" y="80" width="10" height="8" fill="#d97706" rx="1" />
    <rect x="51" y="70" width="10" height="8" fill="#b45309" rx="1" />

    <circle cx="15" cy="90" r="8" fill="#22c55e" />
    <circle cx="105" cy="90" r="8" fill="#22c55e" />
  </svg>
);

function About() {
  const features = [
    "Manage Products, Categories and Suppliers",
    "Add, Update and Delete Records Easily",
    "Track Stock and Identify Low Stock Items",
    "User-friendly Interface and Easy to Use",
    "Generate Reports and View Stock Summary",
    "Secure Login and Data Management"
  ];

  const benefits = [
    "Reduces manual work and time",
    "Provides accurate and real-time information",
    "Minimizes errors in stock management",
    "Helps in making better business decisions"
  ];

  return (
    <Layout title="About">
      <div className="about-mock-container">
        <div className="about-title-section">
          <h1>About</h1>
          <div className="blue-underline"></div>
        </div>

        <div className="about-hero-card">
          <div className="hero-left">
            <ClipboardIllustration />
          </div>
          <div className="hero-right">
            <h2>About Quick Inventory Management System</h2>
            <p>
              The Quick Inventory Management System is a simple and efficient web
              application designed to help small businesses, shops, warehouses, and
              organizations manage their inventory in a better way.
            </p>
            <p>
              This system helps you keep track of your products, stock, categories,
              suppliers and reports in one place. It reduces manual work, saves time
              and provides accurate information for better business decisions.
            </p>
          </div>
        </div>

        <div className="sections-container">
          <div className="about-row">
            <div className="row-icon-box">
              <div className="icon-circle blue-bg">
                <Target className="icon-blue" size={24} />
              </div>
            </div>
            <div className="row-content">
              <h3>Our Objective</h3>
              <p>
                Our main objective is to provide an easy and reliable solution for managing inventory digitally.
                It helps users maintain accurate stock records, avoid stock shortages, and improve overall
                efficiency.
              </p>
            </div>
          </div>

          <div className="about-row border-top">
            <div className="row-icon-box">
              <div className="icon-circle green-bg">
                <Star className="icon-green" size={24} />
              </div>
            </div>
            <div className="row-content">
              <h3>Key Features</h3>
              <div className="features-grid">
                {features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <CheckCircle2 size={16} className="icon-green" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-row border-top">
            <div className="row-icon-box">
              <div className="icon-circle purple-bg">
                <TrendingUp className="icon-purple" size={24} />
              </div>
            </div>
            <div className="row-content">
              <h3>Benefits</h3>
              <div className="benefits-grid">
                {benefits.map((b, i) => (
                  <div key={i} className="benefit-item">
                    <span className="blue-dot"></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="about-banner-green">
          <div className="banner-left">
            <div className="banner-icon-container">
              <ShieldCheck className="icon-white" size={28} />
            </div>
            <p>
              The Quick Inventory Management System is built to support your business by simplifying
              inventory operations and helping you grow with confidence.
            </p>
          </div>
          <div className="banner-right">
            <WarehouseIllustration />
          </div>
        </div>

        <footer className="mock-footer">
          <p>© 2026 Quick Inventory Management System. All rights reserved.</p>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .about-mock-container {
          max-width: 1100px;
          margin: 0 auto;
          background: #fff;
          padding: 40px;
          color: #1e293b;
          font-family: 'Inter', sans-serif;
        }

        .about-title-section {
          margin-bottom: 30px;
        }

        .about-title-section h1 {
          font-size: 32px;
          font-weight: 800;
          margin: 0;
          color: #0f172a;
        }

        .blue-underline {
          width: 45px;
          height: 4px;
          background: #3b82f6;
          margin-top: 8px;
          border-radius: 2px;
        }

        .about-hero-card {
          background: #f1f5f9;
          border-radius: 16px;
          display: flex;
          padding: 40px;
          gap: 40px;
          margin-bottom: 40px;
          align-items: center;
          border: 1px solid #e2e8f0;
        }

        .hero-left {
          flex: 0 0 240px;
          display: flex;
          justify-content: center;
        }

        .hero-right h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1e3a8a;
        }

        .hero-right p {
          color: #475569;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .sections-container {
          display: flex;
          flex-direction: column;
        }

        .about-row {
          display: flex;
          padding: 30px 0;
          gap: 24px;
        }

        .border-top {
          border-top: 1px solid #f1f5f9;
        }

        .row-icon-box {
          flex: 0 0 60px;
          display: flex;
          justify-content: center;
        }

        .icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blue-bg { background: #eff6ff; }
        .green-bg { background: #f0fdf4; }
        .purple-bg { background: #f5f3ff; }

        .row-content h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #0f172a;
        }

        .row-content p {
          color: #64748b;
          font-size: 15px;
          line-height: 1.6;
          max-width: 800px;
        }

        .features-grid, .benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 40px;
          margin-top: 15px;
        }

        .feature-item, .benefit-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: #334155;
          font-weight: 500;
        }

        .blue-dot {
          width: 7px;
          height: 7px;
          background: #3b82f6;
          border-radius: 50%;
        }

        .icon-blue { color: #2563eb; }
        .icon-green { color: #16a34a; }
        .icon-purple { color: #7c3aed; }
        .icon-white { color: #fff; }

        .about-banner-green {
          background: #f0fdf4;
          border-radius: 16px;
          display: flex;
          padding: 24px 32px;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
          border: 1px solid #dcfce7;
        }

        .banner-left {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .banner-icon-container {
          width: 50px;
          height: 50px;
          background: #22c55e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .banner-left p {
          color: #166534;
          font-weight: 600;
          font-size: 16px;
          line-height: 1.5;
          max-width: 650px;
        }

        .mock-footer {
          text-align: center;
          margin-top: 60px;
          color: #94a3b8;
          font-size: 14px;
          border-top: 1px solid #f1f5f9;
          padding-top: 30px;
        }

        @media (max-width: 900px) {
          .about-hero-card {
            flex-direction: column;
            text-align: center;
            padding: 30px;
          }
          .features-grid, .benefits-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .about-banner-green {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }
          .banner-left {
            flex-direction: column;
          }
        }
      `}} />
    </Layout>
  );
}

export default About;
