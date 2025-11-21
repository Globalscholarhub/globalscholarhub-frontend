"use client";

export default function ScholarshipDetails({ params }) {
  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-3">
        Scholarship: {params.slug}
      </h1>

      <div className="p-6 bg-white rounded-xl shadow-sm">
        <p>Detailed scholarship information will be displayed here.</p>
      </div>
    </div>
  );
}
