import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarLeft from "@/Components/SidebarLeft";
import SidebarRight from "@/Components/SidebarRight";
import ProfilCard from "@/Components/ProfilCard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kidz",
  description: "Trouver des activités pour vos enfants !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}w-full antialiased`}
      >
        <div>
          <ProfilCard/>
        </div>
        <div className="flex w-full">
        <SidebarLeft/>
        {children}
        <SidebarRight/>
        </div>
      </body>
    </html>
  );
}
