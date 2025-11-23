import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function CountryDetails({ params }) {
  const countryId = params.id;

  // Fetch country
  const { data: country, error: countryError } = await supabase
    .from("countries")
    .select("*")
    .eq("id", countryId)
    .single();

  if (countryError || !country) {
    return <div className="p-6 text-red-600">Country not found.</div>;
  }

  // Fetch scholarships in this country
  const { data: scholarships } = await supabase
    .from("scholarships")
    .select("*")
    .eq("country_id", countryId);

  return (
    <div className="p-6 space-y-6">

      {/* Country Name */}
      <h1 className="text-3xl font-bold mb-4">
        Scholarships in {country.name}
      </h1>

      {/* If no scholarships */}
      {(!scholarships || scholarships.length === 0) && (
        <p className="text-gray-600">
          No scholarships found for this country.
        </p>
      )}

      {/* Scholarships List */}
      <div className="space-y-4">
        {scholarships?.map((s) => (
          <Link
            key={s.id}
            href={`/scholarships/${s.id}`}
            className="block p-4 border rounded-lg shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="text-gray-600">
              {s.description?.substring(0, 120)}...
            </p>
          </Link>
        ))}
      </div>

    </div>
  );
}
