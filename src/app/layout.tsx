import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book Collection",
  description: "Display of book collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
