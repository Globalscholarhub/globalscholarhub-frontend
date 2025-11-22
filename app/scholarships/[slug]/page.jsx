// app/scholarships/[slug]/page.jsx

import { createClient } from '@supabase/supabase-js';

export default async function ScholarshipDetails({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const scholarshipId = params.slug;

  // Fetch scholarship
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

  if (error) {
    console.error("Scholarship fetch error:", error);
    return <div className="p-4 text-red-600">Unable to load scholarship.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{scholarship.title}</h1>

      <p className="text-gray-700 mb-6 whitespace-pre-line">
        {scholarship.description}
      </p>

      {scholarship.url && (
        <a
          href={scholarship.url}
          target="_blank"
          className="text-blue-600 underline text-lg"
        >
          Visit Official Website →
        </a>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Country</h2>
        <p className="text-gray-800 mt-1">
          {scholarship.countries?.name || "Unknown country"}
        </p>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Created: {new Date(scholarship.created_at).toLocaleDateString()}</p>
        <p>Updated: {new Date(scholarship.updated_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
