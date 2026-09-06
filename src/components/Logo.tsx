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
        src="/logo-bronze.png"
        alt=""
        width={56}
        height={56}
        priority
        className="h-14 w-14 object-contain drop-shadow-[0_0_14px_rgba(111,130,138,0.35)] transition-transform duration-500 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-[0.18em] text-bronze">
          INVICTUS
        </span>
        <span className="text-[0.6rem] font-medium tracking-[0.42em] text-bronze/70">
          LAW
        </span>
      </span>
    </Link>
  );
}
