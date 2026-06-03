import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalBody } from "@/components/LegalBody";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the Invictus Law website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" intro="Last updated: January 2026" />
      <Section className="!pt-14">
        <LegalBody>
          <p>
            These Terms of Service govern your use of the Invictus Law website.
            By using this site, you agree to these terms. This page is provided
            for demonstration purposes and should be reviewed by counsel before
            publication.
          </p>

          <h2>No Legal Advice</h2>
          <p>
            The content on this website is provided for general informational
            purposes only and does not constitute legal advice. You should not act
            or refrain from acting on the basis of any content here without seeking
            professional counsel.
          </p>

          <h2>No Attorney–Client Relationship</h2>
          <p>
            Contacting us through this website, including booking a consultation or
            submitting a form, does not create an attorney–client relationship.
            Such a relationship is formed only by a signed engagement agreement.
          </p>

          <h2>Use of the Site</h2>
          <ul>
            <li>You agree to use this website lawfully and in good faith.</li>
            <li>
              You agree not to attempt to disrupt or compromise the security of
              the site.
            </li>
            <li>
              All content, branding, and design are the property of Invictus Law.
            </li>
          </ul>

          <h2>Attorney Advertising</h2>
          <p>
            This website may be considered attorney advertising in some
            jurisdictions. Prior results do not guarantee a similar outcome.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms may be directed to
            contact@invictuslaw.com.
          </p>
        </LegalBody>
      </Section>
    </>
  );
}
