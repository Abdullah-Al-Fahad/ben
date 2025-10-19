'use client';
import { Inter, Exo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { usePathname } from 'next/navigation';
import { metadata } from '../metadata'; // Import metadata from separate file
import LandingPageHeader from "@/components/LandingPageHeader";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '700', '900'],
  variable: "--font-inter",
 });
const exo = Exo({ 
  subsets: ["latin"],
  weight: ['400', '700', '900'],
  variable: "--font-exo",
 });

const clashdisplay = localFont({
  src: "../../public/font/ClashDisplay.ttf",
  variable: "--font-clashDisplay",
  display: "swap",
});

const ConditionalHeader = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return isAdminRoute ? null : <LandingPageHeader />;
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${clashdisplay.variable} ${inter.variable} ${exo.variable}  bg-neutral-50 text-neutral-800 antialiased`}>
        <LoadingSpinner />
        <div className="min-h-screen flex flex-col font-clashDisplay">
          <ConditionalHeader />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}