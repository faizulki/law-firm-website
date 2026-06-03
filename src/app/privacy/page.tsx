import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalBody } from "@/components/LegalBody";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Invictus Law collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" intro="Last updated: January 2026" />
      <Section className="!pt-14">
        <LegalBody>
          <p>
            Invictus Law (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
            privacy. This policy explains what information we collect, how we use
            it, and the choices you have. This page is provided for demonstration
            purposes and should be reviewed by counsel before publication.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly — such as your name,
            email, phone number, and the details of your matter — when you book a
            consultation or contact us. We may also collect limited technical
            information automatically, such as your browser type and the pages
            you visit, to improve our website.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and schedule consultations.</li>
            <li>To provide and improve our legal services.</li>
            <li>To comply with our legal and professional obligations.</li>
          </ul>

          <h2>How We Protect Your Information</h2>
          <p>
            We maintain reasonable administrative, technical, and physical
            safeguards designed to protect your information. Communications
            submitted through this website are confidential but do not, by
            themselves, create an attorney–client relationship.
          </p>

          <h2>Your Choices</h2>
          <p>
            You may request access to, correction of, or deletion of the personal
            information you have provided to us by contacting us at
            contact@invictuslaw.com.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy may be directed to contact@invictuslaw.com
            or 123 Liberty Avenue, New York, NY 10001.
          </p>
        </LegalBody>
      </Section>
    </>
  );
}
