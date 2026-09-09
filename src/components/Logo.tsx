import Image from "next/image";
import Link from "next/link";
import { useSiteData } from "@/lib/site-data";

/** Brand lockup — logo mark + wordmark, links home. */
export function Logo({ className }: { className?: string }) {
  const { site } = useSiteData();

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center gap-3 ${className ?? ""}`}
    >
      <Image
        src="/logo-bronze.png"
        alt=""
        width={64}
        height={64}
        priority
        className="h-16 w-16 object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.3)] transition-transform duration-500 group-hover:scale-105"
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
