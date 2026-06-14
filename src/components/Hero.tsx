"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Button } from "./ui/Button";

/**
 * Hero — full-viewport cinematic intro. Dark courthouse imagery beneath a
 * layered gradient so headline contrast stays AA-compliant.
 */
export function Hero() {
  const t = useT();
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=80"
          alt="Classical courthouse columns at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        {/* Gradient veils for depth + legibility — kept lighter on the right so the statue stays visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent" />
        {/* Subtle radial vignette */}
        <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_0%,transparent_45%,rgba(10,10,10,0.75)_100%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 lg:px-8">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-6 text-xs font-medium text-silver/80"
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-gradient-silver sm:text-6xl lg:text-7xl"
          >
            {t.hero.line1}
            <br />
            {t.hero.line2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-mute sm:text-xl"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button href="/consultation" size="lg">
              {t.hero.ctaPrimary}
              <ArrowRight size={18} />
            </Button>
            <Button href="/services" size="lg" variant="secondary">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-silver/30 p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-silver/70"
          />
        </div>
      </motion.div>
    </section>
  );
}
