import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Geist,
  Geist_Mono,
  Noto_Sans_Devanagari,
} from "next/font/google";
import { HtmlLang } from "./components/HtmlLang";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lokmat Sahitya",
    template: "%s | Lokmat Sahitya",
  },
  description:
    "Lokmat Sahitya — digital library for editions, awardees, and festival moments.",
  icons: {
    icon: "/favicon.jpeg",
    apple: "/apple-icon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <HtmlLang />
        {children}
      </body>
    </html>
  );
}
