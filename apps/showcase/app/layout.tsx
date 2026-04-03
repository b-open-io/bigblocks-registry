import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BigBlocks",
  description: "Production-ready Bitcoin UI blocks for React applications",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://showcase.bigblocks.dev"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BigBlocks",
    title: "BigBlocks — Bitcoin UI Blocks for React",
    description:
      "Production-ready, shadcn-compatible Bitcoin UI blocks. Wallet, social, marketplace, and identity components you install with one CLI command.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BigBlocks — Bitcoin UI Blocks for React",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BigBlocks — Bitcoin UI Blocks for React",
    description:
      "Production-ready, shadcn-compatible Bitcoin UI blocks. Wallet, social, marketplace, and identity components you install with one CLI command.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
