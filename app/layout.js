import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/ui/Footer";
import Banner from "@/components/ui/Banner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Banner />
          <Navbar />
          <main className="mx-auto max-w-[80rem] grid">{children}</main>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
