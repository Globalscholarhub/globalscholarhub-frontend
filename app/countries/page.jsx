import { supabase } from "@/lib/supabaseClient";

export default async function CountriesPage() {
  const { data: countries, error } = await supabase
    .from("countries")
    .select("*");

  if (error) {
    return <div>Error loading countries: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Countries</h1>
      <ul className="space-y-2">
        {countries.map((c) => (
          <li key={c.id} className="p-3 border rounded">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
