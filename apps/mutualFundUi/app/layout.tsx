import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./styles/index.css";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { WealthLoader } from "./components/WealthLoader";
import { QueryProvider } from "./providers/QueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "WealthAI - AI-Powered Wealth Building",
  description: "AI-powered mutual fund recommendations and portfolio management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F1419] text-white overflow-x-hidden`}>
        <QueryProvider>
          <Navigation />
          <div className="flex">
            <div className="w-64 flex-shrink-0"></div>
            <main className="flex-1 min-h-screen flex flex-col">
              <div className="flex-1 p-6">
                <Suspense fallback={<WealthLoader />}>
                  {children}
                </Suspense>
              </div>
              <Footer />
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
