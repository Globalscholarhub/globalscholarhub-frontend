"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    const { data } = await supabase
      .from("scholarships")
      .select("id, title, description");

    setScholarships(data || []);
  };

  const filtered = scholarships.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Scholarships</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search scholarships..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />

      {/* RESULTS */}
      <div className="grid gap-4">
        {filtered.map((s) => (
          <Link
            key={s.id}
            href={`/scholarships/${s.id}`}
            className="border p-4 rounded-lg hover:shadow"
          >
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="text-gray-600">
              {s.description?.slice(0, 120)}...
            </p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 mt-6">No scholarships found.</p>
      )}
    </div>
  );
}
