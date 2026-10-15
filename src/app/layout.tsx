import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PROFILE } from "@/lib/data";
import "./globals.css";

const inter = localFont({ src: "../fonts/InterTight-Variable.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const serif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});
const mono = localFont({ src: "../fonts/JetBrainsMono-Variable.woff2", variable: "--font-jetbrains", weight: "100 800", display: "swap", preload: false });

const description =
  "Riley (Phillip) Kyule is a full stack and DevOps engineer in Nairobi who builds, deploys and runs production platforms: push notifications for 110+ sites, an internal work management system, and the infrastructure under them.";

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.siteUrl),
  title: { default: `${PROFILE.name} — ${PROFILE.role}, Nairobi`, template: `%s — ${PROFILE.name}` },
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: PROFILE.name,
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: "I build web platforms and automations, then deploy and run them myself.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${PROFILE.name}, ${PROFILE.role}` }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#f4f2ee", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
