export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Scholarships</h2>
          <p className="text-3xl font-bold text-blue-600">128</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Countries</h2>
          <p className="text-3xl font-bold text-blue-600">42</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Pending Reviews</h2>
          <p className="text-3xl font-bold text-blue-600">9</p>
        </div>
      </div>
    </div>
  );
}
