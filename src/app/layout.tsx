import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Curanova AI | AI-Powered Clinical Intelligence & Genomics",
  description: "Transforming healthcare through AI-driven clinical intelligence and precision genomics. Empowering healthcare providers with predictive analytics and actionable insights.",
  keywords: "AI healthcare, clinical intelligence, genomics, precision medicine, predictive analytics, healthcare AI, medical AI",
  openGraph: {
    title: "Curanova AI | AI-Powered Clinical Intelligence & Genomics",
    description: "Transforming healthcare through AI-driven clinical intelligence and precision genomics.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AdminProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AdminProvider>
      </body>
    </html>
  );
}
