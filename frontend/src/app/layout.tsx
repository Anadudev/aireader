import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import DashboardAction from "@/components/DashboardAction";
import ThemeProvider from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  openGraph: {
    title: "AILogue",
    description:
      "AILogue, a platform for creating, sharing and reading AI-generated text from LLM chats pr conversations.",
    url: "https://aireader-six.vercel.app/",
    type: "website",
    siteName: "AILogue",
    locale: "en_US",
  },
  keywords: [
    "AI",
    "GPT-3",
    "OpenAI",
    "LLM",
    "Chat",
    "Conversation",
    "Text",
    "Generator",
    "Dialogue",
    "Platform",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <DashboardAction />
          {children}
          <Toaster />
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
