import "./globals.css";

export const metadata = {
  title: "GlobalScholarHub",
  description: "Find scholarships worldwide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-black p-10">
        {children}
      </body>
    </html>
  );
}
