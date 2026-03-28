import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foliyo — Turn your college years into a career",
  description: "AI-powered portfolio builder for students & freshers. Turn your resume into a stunning portfolio in 5 minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
