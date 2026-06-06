import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

/** Reusable practice-area card with icon, blurb, and hover affordance. */
export function PracticeAreaCard({
  slug,
  icon: Icon,
  title,
  short,
  learnMore,
}: {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  learnMore: string;
}) {
  return (
    <Link
      href={`/services#${slug}`}
      className="surface surface-hover group relative flex h-full flex-col rounded-2xl p-7 hover:-translate-y-1"
    >
      <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-silver/15 bg-white/[0.03] text-silver transition-colors duration-500 group-hover:border-silver/40 group-hover:text-white">
        <Icon size={22} strokeWidth={1.5} />
      </span>

      <h3 className="font-serif text-2xl font-medium text-white">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">{short}</p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-silver transition-colors group-hover:text-white">
        {learnMore}
        <ArrowUpRight
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
