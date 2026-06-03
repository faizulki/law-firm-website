import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/** Consistent page section wrapper with luxe vertical rhythm + max width. */
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28 lg:py-32", className)}>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** Eyebrow + headline + optional intro, consistently styled and animated. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="eyebrow mb-4 text-xs font-medium text-silver/80">{eyebrow}</p>
      )}
      <h2 className="font-serif text-4xl font-medium leading-[1.1] text-white sm:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 text-lg leading-relaxed text-mute">{intro}</p>
      )}
    </Reveal>
  );
}
