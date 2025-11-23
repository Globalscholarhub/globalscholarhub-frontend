import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 10;

export default async function ScholarshipsPage() {
  // Fetch all scholarships
  const { data: scholarships, error } = await supabase
    .from("scholarships")
    .select(`
      id,
      title,
      description,
      country_id,
      countries ( name )
    `)
    .order("title", { ascending: true });

  if (error) {
    return <div className="p-6 text-red-600">Error loading scholarships.</div>;
  }

  return (
    <div className="p-6 space-y-8">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-6">All Scholarships</h1>

      {/* LIST ALL SCHOLARSHIPS */}
      <div className="space-y-4">
        {scholarships?.map((s) => (
          <Link
            key={s.id}
            href={`/scholarships/${s.id}`}
            className="block border p-4 rounded-lg shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{s.title}</h2>

            <p className="text-sm text-gray-500">
              Country: {s.countries?.name || "N/A"}
            </p>

            <p className="text-gray-600 mt-2">
              {s.description?.substring(0, 150)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
