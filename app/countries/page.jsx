// app/countries/page.jsx

import { createClient } from '@supabase/supabase-js';

export const revalidate = 0; // Always fetch fresh data

export default async function CountriesPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: countries, error } = await supabase
    .from("countries")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching countries:", error);
    return <div className="p-4 text-red-600">Failed to load countries.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Countries</h1>

      {countries.length === 0 && (
        <p className="text-gray-500">No countries added yet.</p>
      )}

      <ul className="space-y-3">
        {countries.map((country) => (
          <li key={country.id}>
            <a
              href={`/countries/${country.id}`}
              className="text-blue-600 underline text-lg"
            >
              {country.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
