/**
 * Central site configuration. Single source of truth for brand details,
 * navigation, and contact info so every component/page stays consistent.
 */

export const site = {
  name: "Invictus Law",
  tagline: "Justice Without Compromise",
  description:
    "Invictus Law provides strategic, results-driven legal representation for individuals and businesses in corporate, family, real estate, and litigation matters.",
  url: "https://invictuslaw.com",
  email: "contact@invictuslaw.com",
  phone: "(555) 123-4567",
  phoneHref: "tel:+15551234567",
  address: {
    line1: "Einar Hansens Esplanad 33",
    line2: "211 75 Malmö, Sweden",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/invictus-law",
    x: "https://x.com/invictuslaw",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Om oss", href: "/about" },
  { label: "Våra rättsområden", href: "/services" },
  { label: "Konsultation", href: "/consultation" },
  { label: "Priser", href: "/priser" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLegal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;
