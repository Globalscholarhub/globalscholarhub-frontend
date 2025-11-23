import { createClient } from "@supabase/supabase-js";

export default async function BlogPost({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) return <p>Error loading post.</p>;

  return (
    <div className="px-6 py-10">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-600 mb-6">{data.created_at}</p>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}
