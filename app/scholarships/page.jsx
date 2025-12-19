"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: scholarshipsData } = await supabase
      .from("scholarships")
      .select("id, title, description, country");

    const { data: countriesData } = await supabase
      .from("countries")
      .select("name");

    setScholarships(scholarshipsData || []);
    setCountries(countriesData || []);
  };

  const filtered = scholarships.filter((s) => {
    const matchTitle = s.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCountry = country
      ? s.country === country
      : true;

    return matchTitle && matchCountry;
  });

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Scholarships</h1>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search scholarships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded-lg"
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="">All Countries</option>
          {countries.map((c, i) => (
            <option key={i} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

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
            <p className="text-sm text-gray-500 mt-1">
              Country: {s.country}
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
