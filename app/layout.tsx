import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Sudoku (6×6) - Free Online Mini Sudoku Game",
  description: "Play free mini sudoku (6×6) online. Quick, compact sudoku with 2×3 blocks. Easy, medium, hard mini sudoku. Unlimited puzzles, no sign-up, mobile friendly.",
  keywords: "mini sudoku, mini sudoku online, 6x6 sudoku, mini sudoku 6×6, easy mini sudoku, medium mini sudoku, hard mini sudoku, mini sudoku free, small sudoku, compact sudoku, quick sudoku, sudoku online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
        <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}