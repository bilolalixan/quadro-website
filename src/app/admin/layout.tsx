import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "Quadro Admin",
  robots: { index: false, follow: false },
};

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-cream text-foreground">{children}</body>
    </html>
  );
}
