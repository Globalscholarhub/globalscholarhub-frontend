import { supabase } from "@/lib/supabaseClient";

export default async function ScholarshipDetails({ params }) {
  const scholarshipId = params.id;

  // Fetch Scholarship
  const { data: scholarship, error } = await supabase
    .from("scholarships")
    .select(`
      id,
      title,
      description,
      url,
      country_id,
      created_at,
      updated_at,
      countries ( id, name )
    `)
    .eq("id", scholarshipId)
    .single();

  if (error || !scholarship) {
    return <div className="p-6 text-red-600">Scholarship not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* Title */}
      <h1 className="text-3xl font-bold">{scholarship.title}</h1>

      {/* Associated Country */}
      <p className="text-gray-700">
        <strong>Country:</strong>{" "}
        {scholarship.countries?.name || "Unknown Country"}
      </p>

      {/* Description */}
      <div className="text-gray-800 leading-relaxed whitespace-pre-line">
        {scholarship.description}
      </div>

      {/* Apply Link */}
      {scholarship.url && (
        <a
          href={scholarship.url}
          target="_blank"
          className="px-4 py-2 inline-block bg-blue-700 text-white rounded-md"
        >
          Visit Official Website →
        </a>
      )}

      {/* Timestamps */}
      <div className="text-sm text-gray-500">
        <p>Created: {new Date(scholarship.created_at).toLocaleDateString()}</p>
        <p>Updated: {new Date(scholarship.updated_at).toLocaleDateString()}</p>
      </div>

    </div>
  );
}
