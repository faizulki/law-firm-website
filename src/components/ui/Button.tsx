import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Button — single button primitive that renders either a Next.js Link (when
 * `href` is provided) or a native <button>. Two variants tuned for the dark
 * luxury palette, with smooth, restrained transitions.
 */

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-silver text-ink hover:bg-white hover:shadow-[0_0_30px_-8px_rgba(192,192,192,0.5)]",
  secondary:
    "border border-silver/30 text-white hover:border-silver/70 hover:bg-white/[0.04]",
  ghost: "text-mute hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonRest } = rest;
  void _href;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
