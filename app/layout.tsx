import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "What if Jack had a face? A custom Anam demo for Jack & Jill",
  description:
    "You named them Jack and Jill. You gave them voices, and SVG faces. Here's what they look like with real ones.",
  openGraph: {
    title: "What if Jack had a face?",
    description:
      "A live AI avatar demo, built for Jack & Jill. Powered by Anam.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body className="font-body bg-cream text-ink min-h-screen">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">{children}</div>
      </body>
    </html>
  );
}
