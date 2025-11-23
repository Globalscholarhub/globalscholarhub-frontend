"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function BlogAdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all posts
  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setPosts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (!error) {
      alert("Post deleted");
      loadPosts();
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Management</h1>

        <Link
          href="/admin/blog/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ New Post
        </Link>
      </div>

      {loading && <p>Loading blog posts...</p>}

      {!loading && posts.length === 0 && (
        <p>No blog posts found.</p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-500 text-sm">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/admin/blog/edit/${post.id}`}
                className="text-blue-600 underline"
              >
                Edit
              </Link>

              <button
                className="text-red-600 underline"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
