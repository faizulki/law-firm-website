"use client";

import { useT } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalBody } from "@/components/LegalBody";

export function LegalView({ which }: { which: "privacy" | "terms" }) {
  const t = useT();
  const doc = which === "privacy" ? t.legal.privacy : t.legal.terms;
  const title = which === "privacy" ? t.legal.privacyTitle : t.legal.termsTitle;

  return (
    <>
      <PageHeader eyebrow={t.footer.legalHeading} title={title} intro={t.legal.updated} />
      <Section className="!pt-14">
        <LegalBody>
          <p>{doc.intro}</p>
          {doc.sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              {s.body && <p>{s.body}</p>}
              {s.list.length > 0 && (
                <ul>
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </LegalBody>
      </Section>
    </>
  );
}
