import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/** Brand lockup — logo mark + wordmark, links home. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center gap-3 ${className ?? ""}`}
    >
      <Image
        src="/logo.png"
        alt=""
        width={48}
        height={48}
        priority
        className="h-11 w-11 rounded-md object-contain transition-opacity duration-500 group-hover:opacity-90"
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-[0.18em] text-white">
          INVICTUS
        </span>
        <span className="text-[0.6rem] font-medium tracking-[0.42em] text-silver/70">
          LAW
        </span>
      </span>
    </Link>
  );
}
