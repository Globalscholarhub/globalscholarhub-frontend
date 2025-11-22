import Link from "next/link";

export default function BlogAdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blog Manager</h1>

      <div className="space-y-4">
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          ➕ Create New Post
        </Link>
      </div>
    </div>
  );
}
