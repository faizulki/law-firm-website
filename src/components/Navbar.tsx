"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";

function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-full border border-steel/70 text-xs",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLang("sv")}
        aria-pressed={lang === "sv"}
        aria-label={t.a11y.switchToSv}
        className={cn(
          "px-3 py-1 font-medium transition-colors",
          lang === "sv" ? "bg-silver text-ink" : "text-mute hover:text-white"
        )}
      >
        SV
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label={t.a11y.switchToEn}
        className={cn(
          "px-3 py-1 font-medium transition-colors",
          lang === "en" ? "bg-silver text-ink" : "text-mute hover:text-white"
        )}
      >
        EN
      </button>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/consultation", label: t.nav.consultation },
    { href: "/priser", label: t.nav.priser },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-b border-steel/60 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm transition-colors duration-300",
                isActive(item.href) ? "text-white" : "text-mute hover:text-white"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-px h-px bg-silver"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageToggle />
          <Button href="/consultation" size="md">
            {t.common.bookConsultation}
          </Button>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            aria-expanded={open}
            className="text-white"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-steel/60 bg-ink/95 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base transition-colors",
                    isActive(item.href)
                      ? "bg-white/[0.05] text-white"
                      : "text-mute hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                href="/consultation"
                size="lg"
                className="mt-4 w-full"
                onClick={() => setOpen(false)}
              >
                {t.common.bookConsultation}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
