import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Priser",
  description:
    "Vad kostar juridisk rådgivning? Information om rättshjälpstaxan, rättshjälp och rättsskydd samt kostnadsfritt offentligt biträde i LVU- och LVM-ärenden.",
};

const intro =
  "Juridisk Assistans följer den av staten fastställda rättshjälpstaxan som ändras varje år. För år 2023 är den 1 845 kr per timme.";

const paragraphs = [
  "För företag har vi individuell prissättning beroende på omfattningen av uppdraget.",
  "När vi tar uppdrag som offentligt biträde i LVU och LVM är det kostnadsfritt för dig som behöver vår hjälp. Du som befinner dig i en LVU-process har rätt till ett offentligt biträde som ska bistå med juridisk hjälp och domstolen betalar den kostnad som uppstår för det offentliga biträdet.",
  "Även barn får ett eget offentligt biträde som domstolen betalar kostnaden för.",
  "Om du inte har någon hemförsäkring eller om försäkringen inte täcker tvisten kan det finnas möjlighet att ansöka om rättshjälp. Rättshjälp innebär att staten står för en viss del av kostnaden för din juridiska hjälp och att du endast betalar viss del själv. Den delen du själv betalar beror på vilken inkomst du har. För att kunna beviljas rättshjälp måste du först betala en rådgivningsavgift motsvarande en timmes rådgivning enligt rättshjälpstaxan som varierar från år till år enligt ovan.",
  "I vissa fall finns det möjlighet att få ersättning för en del av din kostnad för juridisk hjälp genom din hemförsäkring. Det kallas rättsskydd. Rättsskydd innebär att du betalar en självriskkostnad, vanligen mellan 20 och 30 procent av den totala kostnaden för din juridiska hjälp, och att försäkringsbolaget tar resterande del av kostnaden.",
  "Rättsskydd gäller vanligtvis vid tvister i Tingsrätten och inte vid tvister i Förvaltningsrätten, alltså inte vid tvister mellan enskild och en kommun eller myndighet. Det är därför viktigt att kolla upp vilka villkor som just din hemförsäkring ställer för att få rättsskydd.",
  "Om du inte har någon hemförsäkring eller om försäkringen inte täcker tvisten kan det finnas möjlighet att ansöka om rättshjälp. Rättshjälp innebär att staten står för en viss del av kostnaden för din juridiska hjälp och att du endast betalar viss del själv. Om du beviljas rättshjälp eller inte beror på vad tvisten gäller och vilken inkomst du har. Den delen du själv betalar beror också på vilken inkomst du har. För att kunna beviljas rättshjälp måste du först betala en rådgivningsavgift motsvarande en timmes rådgivning enligt rättshjälpstaxan som varierar från år till år enligt ovan.",
  "Det kan vara svårt att få kostnadshjälp i form av rättsskydd eller rättshjälp vid tvister i domstol mot myndigheter och vid ansökan om en förmån eller insats. Vi på Juridisk Assistans vill däremot underlätta för dig och hjälper dig därför att ansöka om rättsskydd eller rättshjälp om vi bedömer att du har möjlighet att beviljas sådan hjälp.",
  "För att kunna beviljas rättshjälp måste du först betala en rådgivningsavgift motsvarande en timmes rådgivning enligt rättshjälpstaxan som varierar från år till år enligt ovan. Det är mycket ovanligt att enskilda beviljas rättshjälp i domstolsprocesser mot myndighet.",
];

export default function PriserPage() {
  return (
    <>
      <PageHeader
        eyebrow="Priser"
        title="Vad kostar juridisk rådgivning hos Juridisk Assistans?"
        intro="Kostnadshjälp vid juridisk rådgivning."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          {/* Rate highlight */}
          <Reveal>
            <div className="surface flex flex-col items-start gap-2 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow text-xs font-medium text-silver/80">
                  Rättshjälpstaxan 2023
                </p>
                <p className="mt-2 text-base text-mute">
                  Juridisk Assistans följer den av staten fastställda
                  rättshjälpstaxan som ändras varje år.
                </p>
              </div>
              <p className="shrink-0 font-serif text-3xl font-semibold text-gradient-silver">
                1 845 kr<span className="text-lg text-mute"> / timme</span>
              </p>
            </div>
            <p className="mt-6 text-base leading-relaxed text-mute">{intro}</p>
          </Reveal>

          {/* Body */}
          <Reveal delay={0.1} className="mt-8 space-y-5 text-base leading-relaxed text-mute">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <CTABanner
        title="Osäker på vad som gäller i ditt fall?"
        subtitle="Vi hjälper dig att ansöka om rättsskydd eller rättshjälp om vi bedömer att du har möjlighet att beviljas sådan hjälp."
        buttonLabel="Boka konsultation"
      />
    </>
  );
}
