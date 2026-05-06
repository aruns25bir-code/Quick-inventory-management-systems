import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ title, children }) {
  return (
    <div className="dash-layout">
      <Sidebar />
      <main className="dash-main">
        <Topbar />
        <div className="page-head">
          <h1>{title}</h1>
          <p>Overview of your inventory</p>
        </div>
        {children}
      </main>
    </div>
  );
}

export default Layout;
