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
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded"
                />
              )}

              <h2 className="text-xl font-semibold mt-3">{post.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-3">
                {post.description}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
