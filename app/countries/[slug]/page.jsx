export default function CountryDetails({ params }) {
  const { slug } = params;

  const countryName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">{countryName}</h1>

      <p className="text-lg text-gray-700 mb-8">
        Explore scholarships available in <strong>{countryName}</strong>.
      </p>

      <a
        href={`/scholarships?country=${slug}`}
        className="text-blue-600 underline text-lg"
      >
        View Scholarships →
      </a>
    </div>
  );
}
