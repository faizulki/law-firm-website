import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";

/** Closing call-to-action banner reused across pages. */
export function CTABanner({
  title = "Schedule Your Free 30-Minute Consultation",
  subtitle = "Tell us about your situation. We will review your matter and outline a clear, strategic path forward — no obligation.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="px-6 py-20 lg:px-8 lg:py-28">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-silver/15 bg-ink-2 px-8 py-16 text-center sm:px-16 lg:py-24">
        {/* Decorative silver glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_50%_0%,rgba(192,192,192,0.12),transparent_70%)]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-serif text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-mute">{subtitle}</p>
          <div className="mt-9 flex justify-center">
            <Button href="/consultation" size="lg">
              Book Consultation
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
