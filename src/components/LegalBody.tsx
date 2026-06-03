import { type ReactNode } from "react";
import { Reveal } from "./ui/Reveal";

/** Shared prose styling for legal/long-form pages. */
export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <Reveal
      className="
        mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-mute
        [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-white
        [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:text-mute
        [&_a]:text-silver [&_a]:underline [&_a]:underline-offset-4
      "
    >
      {children}
    </Reveal>
  );
}
