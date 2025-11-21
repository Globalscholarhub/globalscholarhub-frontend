export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5f5" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: "250px",
          background: "#1a1a1a",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
          Admin Panel
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <a href="/admin/dashboard" style={{ color: "white" }}>
            Dashboard
          </a>
          <a href="/admin/login" style={{ color: "white" }}>
            Logout
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "40px" }}>{children}</main>
    </div>
  );
}
