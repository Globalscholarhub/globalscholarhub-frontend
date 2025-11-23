import { supabase } from "@/lib/supabaseClient";

export default async function BlogDetails({ params }) {
  const postId = params.id;

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error || !post) {
    return <div className="p-6 text-red-600">Blog post not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full rounded-lg shadow"
        />
      )}

      <div
        className="text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <a
        href="/blog"
        className="inline-block mt-8 px-4 py-2 bg-blue-600 text-white rounded"
      >
        ← Back to Blog
      </a>
    </div>
  );
}
