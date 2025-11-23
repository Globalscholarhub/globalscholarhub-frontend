import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 10;

export default async function CountriesPage() {
  const { data: countries, error } = await supabase
    .from("countries")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return <div className="p-6 text-red-600">Error loading countries</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Countries</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {countries?.map((c) => (
          <Link
            key={c.id}
            href={`/countries/${c.id}`}
            className="block border p-4 rounded-lg shadow hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold">{c.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
