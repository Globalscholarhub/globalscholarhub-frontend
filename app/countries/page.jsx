export default function CountriesPage() {
  const countries = [
    "Canada",
    "United States",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "South Korea",
    "United Arab Emirates",
    "Singapore",
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Select a Country</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {countries.map((country) => (
          <a
            key={country}
            href={`/countries/${country.toLowerCase()}`}
            className="p-6 rounded-xl bg-white shadow hover:shadow-lg border hover:border-blue-600 transition"
          >
            <p className="text-xl font-semibold">{country}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
