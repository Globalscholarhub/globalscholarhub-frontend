"use client";
import { useState } from "react";
import { supabase } from "@/lib/api";

export default function BlogAdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("");

  async function uploadImage() {
    if (!imageFile) return null;

    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, imageFile);

    if (error) {
      console.error(error);
      return null;
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function publishPost() {
    const imageUrl = await uploadImage();

    const { error } = await supabase.from("blog_posts").insert({
      title,
      content,
      image_url: imageUrl || null,
    });

    if (error) {
      setStatus("❌ Failed to publish post");
      return;
    }

    setStatus("✅ Post published successfully!");
    setTitle("");
    setContent("");
    setImageFile(null);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 className="text-3xl font-bold mb-4">Create Blog Post</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Enter blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Write blog content..."
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="mb-3"
      />

      <button
        onClick={publishPost}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Publish Post
      </button>

      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}
