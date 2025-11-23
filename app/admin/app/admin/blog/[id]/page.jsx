"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import "react-quill/dist/quill.snow.css";

// Load Editor Dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditBlogPost({ params }) {
  const postId = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [existingImage, setExistingImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Load blog post
  const loadPost = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (!error && data) {
      setTitle(data.title);
      setContent(data.content);
      setExistingImage(data.image_url);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPost();
  }, []);

  // Upload new image if provided
  const uploadImage = async () => {
    if (!newImage) return existingImage;

    const fileExt = newImage.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `blog/${fileName}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, newImage);

    if (error) {
      alert("Image upload failed");
      return existingImage;
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const updatePost = async () => {
    setUpdating(true);

    const image_url = await uploadImage();

    const { error } = await supabase
      .from("blog_posts")
      .update({
        title,
        content,
        image_url,
        updated_at: new Date(),
      })
      .eq("id", postId);

    setUpdating(false);

    if (error) {
      alert("Failed to update post");
    } else {
      alert("Post updated successfully!");
      window.location.href = "/admin/blog";
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Edit Blog Post</h1>

      {/* Title */}
      <input
        type="text"
        className="border p-3 w-full rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Content */}
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        style={{ height: 300 }}
      />

      {/* Existing Image */}
      {existingImage && (
        <div className="mt-4">
          <p className="font-medium mb-2">Current Cover Image:</p>
          <img
            src={existingImage}
            alt="Cover"
            className="w-48 rounded shadow"
          />
        </div>
      )}

      {/* Upload New Image */}
      <div>
        <label className="block mt-6 mb-2 font-medium">Replace Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImage(e.target.files[0])}
        />
      </div>

      {/* Save */}
      <button
        onClick={updatePost}
        disabled={updating}
        className="bg-blue-700 text-white px-6 py-3 rounded mt-4"
      >
        {updating ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
}
