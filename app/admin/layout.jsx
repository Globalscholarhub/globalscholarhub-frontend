export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex min-h-screen">

          {/* SIDEBAR */}
          <aside className="w-72 bg-white shadow-lg">
            <div className="px-6 py-5 text-2xl font-bold border-b">
              Admin Panel
            </div>

            <nav className="p-6 space-y-4">
              <a href="/admin/dashboard" className="block text-lg hover:text-blue-600">
                📊 Dashboard
              </a>

              <a href="/admin/scholarships" className="block text-lg hover:text-blue-600">
                🎓 Manage Scholarships
              </a>

              <a href="/admin/countries" className="block text-lg hover:text-blue-600">
                🌍 Manage Countries
              </a>

              <a href="/admin/login" className="block text-lg hover:text-red-600">
                🚪 Logout
              </a>
            </nav>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
