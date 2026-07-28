import type { Metadata } from "next";
import { Fraunces, Poppins, Fira_Code } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/navigation";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Ganessh Kumar",
    template: "%s | Ganessh Kumar",
  },
  description:
    "A developer knowledge platform: articles, projects, and notes on software engineering.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${poppins.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background text-body antialiased">
        {/* Plausible Analytics — privacy-first, self-hosted at count.ganesshkumar.com */}
        <Script
          defer
          data-domain="ganesshkumar.com"
          src="https://count.ganesshkumar.com/js/script.file-downloads.outbound-links.pageview-props.tagged-events.js"
        />
        <Script id="plausible-init" strategy="beforeInteractive">
          {`
            window.plausible = window.plausible || function() {
              (window.plausible.q = window.plausible.q || []).push(arguments)
            }
          `}
        </Script>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
