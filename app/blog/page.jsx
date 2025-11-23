import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 10;

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-6 text-red-600">Error loading blog posts.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Scholarship News & Updates</h1>

      {posts?.length === 0 && (
        <p className="text-gray-600">No blog posts available yet.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="border p-4 rounded-lg shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>

            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-48 object-cover rounded mt-2"
              />
            )}

            <p className="text-gray-600 mt-3">
              {post.content?.substring(0, 120)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
