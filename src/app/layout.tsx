import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { usePathname } from 'next/navigation';
import { metadata } from '../metadata'; // Import metadata from separate file

const inter = Inter({ subsets: ["latin"] });

const clashdisplay = localFont({
  src: "../../public/font/ClashDisplay.ttf",
  variable: "--font-clashDisplay",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} ${clashdisplay.variable} font-sans bg-neutral-50 text-neutral-800 antialiased`}>
        <LoadingSpinner />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}