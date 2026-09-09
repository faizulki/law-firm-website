"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useSiteData } from "@/lib/site-data";
import { Logo } from "./Logo";

/** Minimal X (Twitter) glyph — lucide ships no current X mark. */
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** LinkedIn glyph — lucide no longer ships brand marks. */
function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  const t = useT();
  const { site } = useSiteData();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/consultation", label: t.nav.consultation },
    { href: "/priser", label: t.nav.priser },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];
  const legalItems = [
    { href: "/privacy", label: t.legal.privacyTitle },
    { href: "/terms", label: t.legal.termsTitle },
  ];

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-steel/60 bg-ink-2">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Invictus Law · LinkedIn"
                className="surface surface-hover flex h-10 w-10 items-center justify-center rounded-full text-mute hover:text-white"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={site.social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Invictus Law · X"
                className="surface surface-hover flex h-10 w-10 items-center justify-center rounded-full text-mute hover:text-white"
              >
                <XIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="eyebrow text-xs font-medium text-silver/80">
              {t.footer.explore}
            </h3>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mute transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="eyebrow text-xs font-medium text-silver/80">
              {t.footer.legalHeading}
            </h3>
            <ul className="mt-5 space-y-3">
              {legalItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mute transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-xs font-medium text-silver/80">
              {t.footer.contact}
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-mute">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-silver/70" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-silver/70" />
                <a href={site.phoneHref} className="transition-colors hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-silver/70" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-steel/60 pt-8 sm:flex-row">
          <p className="text-xs text-mute">
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <p className="text-xs text-mute/70">{t.footer.advertising}</p>
        </div>
      </div>
    </footer>
  );
}
