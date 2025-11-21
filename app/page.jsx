export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* HEADER */}
      <nav className="w-full bg-white shadow-sm py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-blue-600">
            GlobalScholarHub
          </h1>

          <div className="space-x-6 text-lg font-medium">
            <a href="/scholarships" className="hover:text-blue-600">Scholarships</a>
            <a href="/countries" className="hover:text-blue-600">Countries</a>
            <a href="/admin/login" className="hover:text-blue-600">Admin</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center py-20 px-6">
        
        <div className="flex-1">
          <h2 className="text-5xl font-extrabold leading-tight">
            Find the Best <span className="text-blue-600">Scholarships</span> Worldwide
          </h2>

          <p className="text-xl mt-4 text-gray-700">
            Search scholarships by country, eligibility, program, funding type and more.
          </p>

          <a
            href="/scholarships"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            Explore Scholarships →
          </a>
        </div>

        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
            alt="Scholarship"
            className="rounded-2xl shadow-lg w-96"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center">Why GlobalScholarHub?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">

            <div className="p-6 bg-gray-100 rounded-xl shadow">
              <h4 className="text-xl font-bold">Global Coverage</h4>
              <p className="mt-2 text-gray-700">
                Scholarships from 100+ countries updated regularly.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl shadow">
              <h4 className="text-xl font-bold">Accurate Information</h4>
              <p className="mt-2 text-gray-700">
                Verified data from official scholarship portals.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl shadow">
              <h4 className="text-xl font-bold">Easy to Use</h4>
              <p className="mt-2 text-gray-700">
                Search, filter, and apply — all in one platform.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} GlobalScholarHub. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}
