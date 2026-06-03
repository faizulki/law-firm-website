import { type ReactNode } from "react";
import { Reveal } from "./ui/Reveal";

/**
 * PageHeader — consistent hero band for inner pages. Sits below the fixed
 * navbar with generous top padding and a soft silver glow.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-steel/40 pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_100%_at_50%_-10%,rgba(192,192,192,0.1),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4 text-xs font-medium text-silver/80">
            {eyebrow}
          </p>
          <h1 className="font-serif text-4xl font-medium leading-[1.08] text-gradient-silver sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </header>
  );
}
