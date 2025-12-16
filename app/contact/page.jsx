"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const { error } = await supabase.from("contact_messages").insert([
      { name, email, message }
    ]);

    setLoading(false);

    if (error) {
      alert("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
      form.reset();
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      {success && (
        <p className="mb-4 text-green-600">
          ✅ Thank you! Your message has been sent.
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          className="p-3 border rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="p-3 border rounded"
        />

        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="p-3 border rounded"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
