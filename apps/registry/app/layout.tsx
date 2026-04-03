import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "BigBlocks Registry",
  description:
    "Component registry API for BigBlocks — shadcn-compatible Bitcoin UI blocks",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_REGISTRY_URL || "https://registry.bigblocks.dev"
  ),
  openGraph: {
    type: "website",
    siteName: "BigBlocks Registry",
    title: "BigBlocks Registry",
    description:
      "Component registry API for BigBlocks — shadcn-compatible Bitcoin UI blocks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BigBlocks Registry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BigBlocks Registry",
    description:
      "Component registry API for BigBlocks — shadcn-compatible Bitcoin UI blocks",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
