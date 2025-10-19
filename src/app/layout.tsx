import { Inter, Exo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import ConditionalHeader from "@/components/ConditionalHeader";
import { ModalProvider } from "@/context/ModalContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-inter",
});
const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-exo",
});

const clashDisplay = localFont({
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
      <body
        className={`${clashDisplay.variable} ${inter.variable} ${exo.variable}  bg-neutral-50 text-neutral-800 antialiased`}
      >
        <ModalProvider>
          <LoadingSpinner />
          <div className="min-h-screen flex flex-col font-clashDisplay">
            <ConditionalHeader />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
