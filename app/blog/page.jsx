import { createClient } from "@supabase/supabase-js";

export const revalidate = 30; // ISR: refresh every 30 seconds

export default async function BlogPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <p className="text-red-500">Failed to load blog posts.</p>;
  }

  return (
    <div className="mt-10">
      <h1 className="text-4xl font-bold mb-6">Scholarship News & Updates</h1>

      {posts.length === 0 ? (
        <p>No blog posts added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="font-bold text-xl mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.excerpt}</p>
              <a href={`/blog/${post.id}`} className="text-blue-600 underline">
                Read More →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
