import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { SiteDataProvider } from "@/lib/site-data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { site } from "@/lib/site";
import { getEffectiveDictionary, getEffectiveSite, getEffectivePracticeAreaText } from "@/lib/content-store";

// Site content can be edited from /admin between deploys, so every page
// must read fresh data on every request rather than being statically
// cached at build time.
export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const effectiveSite = getEffectiveSite();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${effectiveSite.name} — ${effectiveSite.tagline}`,
      template: `%s — ${effectiveSite.name}`,
    },
    description: effectiveSite.description,
    keywords: [
      "law firm",
      "attorney",
      "corporate law",
      "family law",
      "real estate law",
      "litigation",
      "legal counsel",
      "Malmö lawyer",
    ],
    authors: [{ name: effectiveSite.name }],
    openGraph: {
      type: "website",
      title: `${effectiveSite.name} — ${effectiveSite.tagline}`,
      description: effectiveSite.description,
      url: site.url,
      siteName: effectiveSite.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${effectiveSite.name} — ${effectiveSite.tagline}`,
      description: effectiveSite.description,
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const effectiveSite = getEffectiveSite();
  const effectiveDictionary = getEffectiveDictionary();
  const practiceAreaOverrides = getEffectivePracticeAreaText();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: effectiveSite.name,
    description: effectiveSite.description,
    url: site.url,
    telephone: effectiveSite.phone,
    email: effectiveSite.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: effectiveSite.address.line1,
      addressLocality: "Malmö",
      addressRegion: "Skåne",
      postalCode: "211 75",
      addressCountry: "SE",
    },
    areaServed: "Sweden",
    priceRange: "$$$",
  };

  return (
    <html lang="sv" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="flex min-h-screen flex-col bg-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteDataProvider site={effectiveSite} practiceAreaOverrides={practiceAreaOverrides}>
          <LanguageProvider dictionary={effectiveDictionary}>
            <SkipLink />
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </SiteDataProvider>
      </body>
    </html>
  );
}
