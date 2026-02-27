import type { Metadata } from "next";
import { Inter, Outfit, Lora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/* ─── Font System: Forest Vault Preset ─── */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap", style: ["normal", "italic"] });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-ibm-plex-mono", display: "swap", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.enviropay.uk"),
  title: "EnviroPay — Recycling that pays.",
  description: "The UK's digital deposit-return platform. Scan, return, earn, and use — all from one wallet. Launching ahead of the 2027 Deposit Return Scheme.",
  keywords: ["EnviroPay", "deposit return scheme", "UK DRS", "recycling", "digital wallet", "refund", "sustainability"],
  openGraph: {
    title: "EnviroPay — Recycling that pays.",
    description: "The UK's digital deposit-return platform. Scan, return, earn, and use — all from one wallet.",
    type: "website",
    locale: "en_GB",
    url: "https://www.enviropay.uk",
    siteName: "EnviroPay",
  },
  twitter: {
    card: "summary_large_image",
    title: "EnviroPay — Recycling that pays.",
    description: "The UK's digital deposit-return platform. Scan, return, earn, and use — all from one wallet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} ${lora.variable} ${ibmPlexMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
