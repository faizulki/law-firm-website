import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Våra rättsområden",
  description:
    "Tillståndsärenden, personlig assistans och assistansersättning, socialförsäkringsrätt, socialrätt, SoL och LSS — samt överklagande av myndighetsbeslut.",
};

type Area = {
  slug: string;
  navLabel: string;
  title: string;
  paragraphs: string[];
};

const areas: Area[] = [
  {
    slug: "tillstand",
    navLabel: "Tillstånd",
    title: "Tillstånd och tillståndsärenden",
    paragraphs: [
      "Invictuslaw juristbyrå finns här som din jurist för serveringstillstånd. Serveringstillstånd omfattar all slags överlämning av alkoholhaltiga drycker i utbyte mot betalning eller annan ersättning. För att få ett tillstånd måste du anses vara lämplig för att servera alkohol, sköta din ekonomi och inte ha ett brottsligt förflutet. Du måste även genomföra och klara ett kunskapsprov gällande alkohollagen. Det kan vara svårt att veta hur du ska gå vidare med serveringstillståndet. På Advantage har vi en bred kompetens och lång erfarenhet av serveringstillståndsärenden.",
    ],
  },
  {
    slug: "restaurang-krog",
    navLabel: "Restaurang & krog",
    title: "Serveringstillstånd för restaurang och krog",
    paragraphs: [
      "Våra advokater och jurister vet hur restaurang- och krogbranschen fungerar och har flera års erfarenhet av frågor som rör serveringstillstånd i restaurang och krog. Flera av våra kunder är idag verksamma inom både restaurang- och krogbranschen, det ger oss en unik inblick i de olika tillstånd som ges av myndigheter för både serveringen och alkohol. Vi hjälper dig kontakta myndigheterna och hantera ditt ärende på bästa sätt!",
      "Vi arbetar med tillfälliga- som permanenta tillstånd. Vi har även vanan att söka tillstånd för dig som ska arbeta med ett tillfälligt event där serverings- och danstillstånd behövs.",
    ],
  },
  {
    slug: "avslag",
    navLabel: "Avslag",
    title: "Avslag på tillstånd och tillståndsärenden",
    paragraphs: [
      "Om du har fått avslag på din ansökan eller fått ett myndighetsbeslut som du inte är nöjd med kan vi hjälpa dig överklaga det. Vi hjälper dig med en analys av varför myndigheten fattat ett avslagsbeslut och därefter i samråd med dig överklagar vi beslutet.",
      "Om du har frågor eller har fått problem med ditt serveringstillstånd kan vi hjälpa dig. Tveka inte att höra av dig för mer information.",
    ],
  },
  {
    slug: "personlig-assistans",
    navLabel: "Personlig assistans",
    title: "Assistansersättning och personlig assistans",
    paragraphs: [
      "Vi har spetskompetens inom personlig assistans och assistansersättning och hjälper till att ansöka, svara på kommuniceringar och överklaga beslut om personlig assistans eller assistansersättning. Vi ger vi även rådgivning och biträde gällande andra områden inom assistansbranschen. Juridisk Assistans biträder såväl assistansbolag som privatpersoner i frågor om personlig assistans.",
    ],
  },
  {
    slug: "socialforsakringsratt",
    navLabel: "Socialförsäkringsrätt",
    title: "Beslut från Försäkringskassan – socialförsäkringsrätt",
    paragraphs: [
      "Utöver assistansersättning hjälper vi dig även med juridiken inom annan socialförsäkringsrätt så som sjukpenning, sjukersättning, omvårdnadsbidrag och merkostnadsersättning, underhållsstöd, barnbidrag, bostadsbidrag, livränta och återkrav. Vi har mångårig erfarenhet från Försäkringskassan och är väl insatta i hur den arbetar samt juridiken kring myndighetens beslut.",
    ],
  },
  {
    slug: "socialratt-sol-lss",
    navLabel: "Socialrätt, SoL & LSS",
    title: "Socialrätt, SoL och LSS",
    paragraphs: [
      "Vi är experter på socialrätt. Vi har lång erfarenhet av ärenden gällande insatser med stöd av SoL och LSS från socialtjänsten till exempel bostad med särskild service, ledsagare, kontaktperson, korttidsvistelse, avlösarservice, hemtjänst, serviceboende och äldreboende.",
    ],
  },
  {
    slug: "overklaga",
    navLabel: "Överklaga",
    title: "Vill du överklaga Försäkringskassans beslut eller ett annat myndighetsbeslut?",
    paragraphs: [
      "Våra uppdrag handlar huvudsakligen om att överklaga Försäkringskassans beslut eller annat myndighetsbeslut men vi arbetar även med att hjälpa till vid ansökningar. För att du ska få bästa hjälp med ditt ärende kan du ta kontakt med oss som har specialistkompetens inom myndighetsjuridik.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Våra rättsområden"
        title="Specialister på myndighetsjuridik"
        intro="Tillståndsärenden, personlig assistans och assistansersättning, socialförsäkringsrätt, socialrätt samt överklagande av myndighetsbeslut."
      />

      {/* Quick nav */}
      <div className="sticky top-20 z-30 border-b border-steel/40 bg-ink/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6 py-4 lg:px-8">
          {areas.map((area) => (
            <a
              key={area.slug}
              href={`#${area.slug}`}
              className="rounded-full border border-steel/60 px-4 py-1.5 text-sm text-mute transition-colors hover:border-silver/40 hover:text-white"
            >
              {area.navLabel}
            </a>
          ))}
        </div>
      </div>

      {areas.map((area, index) => (
        <Section
          key={area.slug}
          id={area.slug}
          className={`scroll-mt-36 ${index % 2 === 1 ? "bg-ink-2 border-y border-steel/40" : ""}`}
        >
          <Reveal className="mx-auto max-w-3xl">
            <span className="eyebrow text-xs font-medium text-silver/80">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-white sm:text-4xl">
              {area.title}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-mute">
              {area.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </Section>
      ))}

      <CTABanner
        title="Behöver du hjälp med ditt ärende?"
        subtitle="Ta kontakt med oss som har specialistkompetens inom myndighetsjuridik."
        buttonLabel="Boka konsultation"
      />
    </>
  );
}
