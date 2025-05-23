import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import SessionProvider from "@/components/AuthProvider";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Readify",
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
          <UserProvider>
            <Navbar />
            {children}
          </UserProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
