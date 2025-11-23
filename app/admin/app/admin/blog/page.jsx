"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import "react-quill/dist/quill.snow.css";

// Load Editor Dynamically (fix SSR issues)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CreateBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // HTML content
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Upload Cover Image
  const uploadImage = async () => {
    if (!image) return null;

    const fileExt = image.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `blog/${fileName}`;

    // Upload to Supabase
    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, image);

    if (error) {
      console.error("Image upload error:", error);
      return null;
    }

    // Get Public URL
    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const submitPost = async () => {
    if (!title || !content) {
      alert("Please enter a title and content");
      return;
    }

    setLoading(true);

    // upload image if uploaded
    const image_url = await uploadImage();

    // create post
    const { error } = await supabase.from("blog_posts").insert([
      {
        id: uuidv4(),
        title,
        content,
        image_url,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error creating post: " + error.message);
    } else {
      alert("Blog post created successfully");
      window.location.href = "/admin/blog";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create Blog Post</h1>

      {/* Title input */}
      <input
        type="text"
        className="border p-3 w-full rounded"
        placeholder="Enter blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Rich Text Editor */}
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="bg-white"
        style={{ height: 300 }}
      />

      {/* Image Upload */}
      <div>
        <label className="block mt-6 mb-2 font-medium">
          Cover Image (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      {/* Publish Button */}
      <button
        onClick={submitPost}
        disabled={loading}
        className="bg-blue-700 text-white px-6 py-3 rounded mt-4"
      >
        {loading ? "Publishing..." : "Publish Blog Post"}
      </button>
    </div>
  );
}
