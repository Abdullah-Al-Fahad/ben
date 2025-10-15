'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { usePathname } from 'next/navigation';
import { metadata } from '../metadata'; // Import metadata from separate file

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className="font-sans bg-neutral-50 text-neutral-800 antialiased">
        <LoadingSpinner />
        <div className="min-h-screen flex flex-col">
          {!isAdminPage && <Navbar />}
          <div className="flex-1">{children}</div>
          {!isAdminPage && <Footer />}
        </div>
      </body>
    </html>
  );
}