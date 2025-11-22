import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "GlobalScholarHub",
  description: "Find scholarships worldwide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="px-6 py-6">{children}</main>
      </body>
    </html>
  );
}
