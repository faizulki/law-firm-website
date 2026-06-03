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
    line1: "123 Liberty Avenue",
    line2: "New York, NY 10001",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/invictus-law",
    x: "https://x.com/invictuslaw",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Consultation", href: "/consultation" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLegal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;
