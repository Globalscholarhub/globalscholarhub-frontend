export default function ScholarshipDetails({ params }) {
  const { slug } = params;

  const formatted = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">{formatted}</h1>

      <p className="text-gray-700 text-lg mb-6">
        Detailed information about <strong>{formatted}</strong> will appear here.
      </p>

      <a
        href="/scholarships"
        className="text-blue-600 underline text-lg"
      >
        ← Back to Scholarships
      </a>
    </div>
  );
}
