// app/countries/[slug]/page.jsx

import { createClient } from '@supabase/supabase-js';

export default async function CountryDetails({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const countryId = params.slug;

  // Fetch the country
  const { data: country, error: countryError } = await supabase
    .from("countries")
    .select("*")
    .eq("id", countryId)
    .single();

  if (countryError) {
    console.error("Country fetch error:", countryError);
    return <div className="p-4 text-red-600">Unable to load this country.</div>;
  }

  // Fetch scholarships for this country
  const { data: scholarships, error: scholarshipsError } = await supabase
    .from("scholarships")
    .select("*")
    .eq("country_id", countryId)
    .order("title", { ascending: true });

  if (scholarshipsError) {
    console.error("Scholarships fetch error:", scholarshipsError);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{country.name}</h1>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Scholarships</h2>

      {(!scholarships || scholarships.length === 0) && (
        <p className="text-gray-600">No scholarships found for this country.</p>
      )}

      <ul className="space-y-3">
        {scholarships?.map((scholarship) => (
          <li key={scholarship.id}>
            <a
              href={`/scholarships/${scholarship.id}`}
              className="text-blue-600 underline text-lg"
            >
              {scholarship.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
