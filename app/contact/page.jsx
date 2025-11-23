export default function ContactPage() {
  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold text-blue-800">Contact Us</h1>

      <p className="text-gray-700">
        Have questions about scholarships, countries, admissions, or your application?
        Reach out to us anytime — we’re here to help.
      </p>

      {/* CONTACT FORM */}
      <form
        className="space-y-4 bg-white p-6 shadow rounded-lg"
        action="https://formspree.io/f/mjkvzklk"
        method="POST"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="border p-3 w-full rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="border p-3 w-full rounded"
        />

        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          required
          className="border p-3 w-full rounded"
        ></textarea>

        <button className="bg-blue-700 text-white px-6 py-3 rounded w-full">
          Send Message
        </button>
      </form>

      {/* WhatsApp */}
      <a
        href="https://wa.me/910000000000?text=Hello%20I%20need%20help"
        target="_blank"
        className="block bg-green-600 text-white text-center px-6 py-3 rounded"
      >
        💬 Chat with us on WhatsApp
      </a>
    </div>
  );
}
