import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function HomePage() {
  // Fetch countries
  const { data: countries } = await supabase
    .from("countries")
    .select("*")
    .limit(6);

  // Fetch latest blog posts
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="space-y-20">

      {/* HERO SECTION */}
      <section className="text-center py-20 bg-blue-50 rounded-xl shadow-sm">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">
          Find Scholarships Around the World
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Search scholarships by country, course, or your academic goal.
        </p>

        <div className="flex justify-center">
          <Link
            href="/scholarships"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-800"
          >
            Explore Scholarships
          </Link>
        </div>
      </section>

      {/* FEATURED COUNTRIES */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Countries</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {countries?.map((country) => (
            <Link
              key={country.id}
              href={`/countries/${country.id}`}
              className="border p-4 rounded-lg shadow hover:bg-gray-50"
            >
              {country.name}
            </Link>
          ))}
        </div>

        <div className="mt-4">
          <Link
            href="/countries"
            className="text-blue-700 underline"
          >
            View all countries →
          </Link>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Scholarship News</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {posts?.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block border rounded-lg p-4 shadow hover:bg-gray-50"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600">
                {post.content.substring(0, 100)}...
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-4">
          <Link href="/blog" className="text-blue-700 underline">
            View all posts →
          </Link>
        </div>
      </section>

    </div>
  );
}
