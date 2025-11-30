export const metadata = {
  title: "Contact Us | GlobalScholarHub",
  description: "Get in touch with GlobalScholarHub support team"
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="mb-6 text-gray-600">
        Have questions about scholarships, countries, or application guidance?
        Send us a message — we respond within 24 hours.
      </p>

      <form className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 border rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 border rounded-lg"
          required
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className="p-3 border rounded-lg"
          required
        ></textarea>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
}
