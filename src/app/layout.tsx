import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import Navbar component
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cowarrior Gym",
  description: "Modern, professional, and user-friendly digital presence for Cowarrior Gym.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-neutral-50 text-neutral-800 antialiased">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}