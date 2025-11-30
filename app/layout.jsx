import "./globals.css";
import Navbar from "../components/Navbar";
import WhatsAppButton from "../components/WhatsappButton";

export const metadata = {
  title: "GlobalScholarHub",
  description: "Find the best scholarships worldwide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <WhatsAppButton />
        <main className="px-6 py-6">{children}</main>
      </body>
    </html>
  );
}
