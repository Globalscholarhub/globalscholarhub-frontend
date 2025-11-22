"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-blue-700">
        GlobalScholarHub
      </Link>

      {/* Menu */}
      <div className="flex gap-6 text-gray-700 font-medium">
        <Link href="/countries">Countries</Link>
        <Link href="/scholarships">Scholarships</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
