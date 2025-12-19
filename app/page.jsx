"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/scholarships?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Find Scholarships Worldwide
      </h1>

      <p className="text-gray-600 mb-8">
        Search scholarships by country, degree, or program.
      </p>

      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 justify-center"
      >
        <input
          type="text"
          placeholder="Search scholarships..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-4 border rounded-lg w-full md:w-96"
        />

        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700">
          Search
        </button>
      </form>
    </div>
  );
}
