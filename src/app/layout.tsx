import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL('https://ganesshkumar.github.io'),
  title: {
    default: "Ganessh Kumar - Software Engineer",
    template: "%s | Ganessh Kumar"
  },
  description: "Software Engineer at Microsoft, full-stack developer passionate about AI-powered solutions and modern web applications",
  keywords: ["Ganessh Kumar", "Software Engineer", "Microsoft", "Full Stack Developer", "AI Solutions", "Web Applications"],
  authors: [{ name: "Ganessh Kumar", url: "https://ganesshkumar.github.io" }],
  creator: "Ganessh Kumar",
  publisher: "Ganessh Kumar",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ganesshkumar.github.io",
    title: "Ganessh Kumar - Software Engineer",
    description: "Software Engineer at Microsoft, full-stack developer passionate about AI-powered solutions and modern web applications",
    siteName: "Ganessh Kumar",
  },
  twitter: {
    card: "summary",
    title: "Ganessh Kumar - Software Engineer",
    description: "Software Engineer at Microsoft, full-stack developer passionate about AI-powered solutions and modern web applications",
    site: "@ganesshkumar",
    creator: "@ganesshkumar",
  },
  manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Ganessh Kumar",
    "application-name": "Ganessh Kumar",
    "msapplication-TileColor": "#1f2937",
    "theme-color": "#1f2937",
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
        {/* Plausible Analytics */}
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
        {children}
      </body>
    </html>
  );
}
