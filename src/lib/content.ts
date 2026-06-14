/**
 * Bilingual marketing content for Invictus Law (Swedish / English).
 * Each translatable field is a { sv, en } pair; components resolve it with
 * `pick(value, lang)`. Aligned to the firm's real practice (administrative law).
 */

import {
  FileText,
  Globe,
  HeartHandshake,
  ShieldCheck,
  Scale,
  Gavel,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { Lang } from "./i18n";

export type L = { sv: string; en: string };
export function pick(value: L, lang: Lang): string {
  return value[lang];
}

export type ServiceSection = {
  heading: L;
  paragraphs: L[];
  bullets?: L[];
  closing?: L;
};

export type PracticeArea = {
  slug: string;
  icon: LucideIcon;
  title: L;
  short: L;
  sections: ServiceSection[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "serveringstillstand",
    icon: FileText,
    title: { sv: "Serveringstillstånd", en: "Liquor Licensing" },
    short: {
      sv: "Vi hjälper dig med serveringstillstånd för restaurang och krog — ansökan, tillfälliga tillstånd och överklagande av avslag.",
      en: "We help you with liquor licenses for restaurants and bars — applications, temporary permits, and appeals against rejections.",
    },
    sections: [
      {
        heading: {
          sv: "Tillstånd och tillståndsärenden",
          en: "Permits and licensing matters",
        },
        paragraphs: [
          {
            sv: "Invictuslaw juristbyrå finns här som din jurist för serveringstillstånd. Serveringstillstånd omfattar all slags överlämning av alkoholhaltiga drycker i utbyte mot betalning eller annan ersättning. För att få ett tillstånd måste du anses vara lämplig för att servera alkohol, sköta din ekonomi och inte ha ett brottsligt förflutet. Du måste även genomföra och klara ett kunskapsprov gällande alkohollagen. Det kan vara svårt att veta hur du ska gå vidare med serveringstillståndet. På Advantage har vi en bred kompetens och lång erfarenhet av serveringstillståndsärenden.",
            en: "Invictuslaw is here as your lawyer for liquor licensing. A serving permit covers any handover of alcoholic beverages in exchange for payment or other compensation. To obtain a permit you must be considered suitable to serve alcohol, manage your finances, and have no criminal record. You must also take and pass a knowledge test on the Alcohol Act. It can be hard to know how to proceed with a serving permit. At our firm we have broad expertise and long experience of liquor licensing matters.",
          },
        ],
      },
      {
        heading: {
          sv: "Serveringstillstånd för restaurang och krog",
          en: "Liquor licenses for restaurants and bars",
        },
        paragraphs: [
          {
            sv: "Våra advokater och jurister vet hur restaurang- och krogbranschen fungerar och har flera års erfarenhet av frågor som rör serveringstillstånd i restaurang och krog. Flera av våra kunder är idag verksamma inom både restaurang- och krogbranschen, det ger oss en unik inblick i de olika tillstånd som ges av myndigheter för både serveringen och alkohol. Vi hjälper dig kontakta myndigheterna och hantera ditt ärende på bästa sätt!",
            en: "Our attorneys and lawyers know how the restaurant and bar industry works and have several years of experience with matters concerning serving permits for restaurants and bars. Several of our clients are active in the restaurant and bar industry today, which gives us a unique insight into the various permits issued by authorities for both service and alcohol. We help you contact the authorities and handle your matter in the best way!",
          },
          {
            sv: "Vi arbetar med tillfälliga- som permanenta tillstånd. Vi har även vanan att söka tillstånd för dig som ska arbeta med ett tillfälligt event där serverings- och danstillstånd behövs.",
            en: "We work with both temporary and permanent permits. We are also accustomed to applying for permits for you who will be running a temporary event where serving and dance permits are required.",
          },
        ],
      },
      {
        heading: {
          sv: "Avslag på tillstånd och tillståndsärenden",
          en: "Rejected permits and appeals",
        },
        paragraphs: [
          {
            sv: "Om du har fått avslag på din ansökan eller fått ett myndighetsbeslut som du inte är nöjd med kan vi hjälpa dig överklaga det. Vi hjälper dig med en analys av varför myndigheten fattat ett avslagsbeslut och därefter i samråd med dig överklagar vi beslutet.",
            en: "If your application has been rejected, or you have received an authority decision you are not satisfied with, we can help you appeal it. We help you analyse why the authority issued a rejection and then, in consultation with you, we appeal the decision.",
          },
          {
            sv: "Om du har frågor eller har fått problem med ditt serveringstillstånd kan vi hjälpa dig. Tveka inte att höra av dig för mer information.",
            en: "If you have questions or have run into problems with your serving permit, we can help. Don't hesitate to get in touch for more information.",
          },
        ],
      },
    ],
  },
  {
    slug: "personlig-assistans",
    icon: HeartHandshake,
    title: { sv: "Personlig assistans", en: "Personal Assistance" },
    short: {
      sv: "Spetskompetens inom personlig assistans och assistansersättning — ansökan, kommunicering och överklagande.",
      en: "Specialist expertise in personal assistance and assistance compensation — applications, responses, and appeals.",
    },
    sections: [
      {
        heading: {
          sv: "Assistansersättning och personlig assistans",
          en: "Assistance compensation and personal assistance",
        },
        paragraphs: [
          {
            sv: "Vi har spetskompetens inom personlig assistans och assistansersättning och hjälper till att ansöka, svara på kommuniceringar och överklaga beslut om personlig assistans eller assistansersättning. Vi ger vi även rådgivning och biträde gällande andra områden inom assistansbranschen. Juridisk Assistans biträder såväl assistansbolag som privatpersoner i frågor om personlig assistans.",
            en: "We have specialist expertise in personal assistance and assistance compensation, and we help with applications, responses to authority communications, and appeals of decisions on personal assistance or assistance compensation. We also provide advice and representation in other areas of the assistance sector. Juridisk Assistans represents both assistance companies and private individuals in matters of personal assistance.",
          },
        ],
      },
    ],
  },
  {
    slug: "socialforsakringsratt",
    icon: ShieldCheck,
    title: { sv: "Socialförsäkringsrätt", en: "Social Insurance Law" },
    short: {
      sv: "Sjukpenning, sjukersättning, omvårdnadsbidrag, livränta och återkrav — vi kan juridiken kring Försäkringskassans beslut.",
      en: "Sickness benefit, activity compensation, care allowance, annuity, and repayment claims — we know the law around the Social Insurance Agency's decisions.",
    },
    sections: [
      {
        heading: {
          sv: "Beslut från Försäkringskassan",
          en: "Decisions from the Social Insurance Agency",
        },
        paragraphs: [
          {
            sv: "Utöver assistansersättning hjälper vi dig även med juridiken inom annan socialförsäkringsrätt så som sjukpenning, sjukersättning, omvårdnadsbidrag och merkostnadsersättning, underhållsstöd, barnbidrag, bostadsbidrag, livränta och återkrav. Vi har mångårig erfarenhet från Försäkringskassan och är väl insatta i hur den arbetar samt juridiken kring myndighetens beslut.",
            en: "In addition to assistance compensation, we also help you with the law in other areas of social insurance, such as sickness benefit, activity/sickness compensation, care allowance and additional-cost compensation, maintenance support, child allowance, housing allowance, annuity, and repayment claims. We have many years of experience with Försäkringskassan and are well versed in how it works and the law surrounding its decisions.",
          },
        ],
      },
    ],
  },
  {
    slug: "socialratt-sol-lss",
    icon: Scale,
    title: { sv: "Socialrätt, SoL & LSS", en: "Social Law, SoL & LSS" },
    short: {
      sv: "Insatser enligt SoL och LSS — boende med särskild service, ledsagare, kontaktperson, hemtjänst och mer.",
      en: "Support under SoL and LSS — housing with special service, escort, contact person, home care, and more.",
    },
    sections: [
      {
        heading: { sv: "Socialrätt, SoL och LSS", en: "Social law, SoL and LSS" },
        paragraphs: [
          {
            sv: "Vi är experter på socialrätt. Vi har lång erfarenhet av ärenden gällande insatser med stöd av SoL och LSS från socialtjänsten till exempel bostad med särskild service, ledsagare, kontaktperson, korttidsvistelse, avlösarservice, hemtjänst, serviceboende och äldreboende.",
            en: "We are experts in social law. We have long experience of matters concerning support under SoL and LSS from the social services — for example housing with special service, escort service, contact person, short-term stays, relief service, home care, service housing, and elderly care.",
          },
        ],
      },
    ],
  },
  {
    slug: "migrationsratt",
    icon: Globe,
    title: { sv: "Migrationsrätt", en: "Migration Law" },
    short: {
      sv: "Trygg vägledning vid asyl, uppehållstillstånd, medborgarskap och överklaganden av Migrationsverkets beslut.",
      en: "Confident guidance with asylum, residence permits, citizenship, and appeals of Migration Agency decisions.",
    },
    sections: [
      {
        heading: {
          sv: "Migrationsrätt – trygg vägledning i en komplex process",
          en: "Migration law — confident guidance through a complex process",
        },
        paragraphs: [
          {
            sv: "Oavsett om du ska ansöka om asyl, uppehållstillstånd, medborgarskap eller överklaga ett beslut – migrationsrätt är ett område där insatserna ofta är livsavgörande. På Invictus Law hjälper vi dig att navigera genom regelverken med tydlighet, noggrannhet och mänsklig lyhördhet.",
            en: "Whether you are applying for asylum, a residence permit, or citizenship — or appealing a decision — migration law is an area where the stakes are often life-defining. At Invictus Law we help you navigate the rules with clarity, precision, and human sensitivity.",
          },
          {
            sv: "Vår chefsjurist har tidigare arbetat som asylhandläggare på Migrationsverket och besitter därför en unik insyn i myndighetens arbetssätt, utredningsmetodik och beslutsprocesser. Den erfarenheten gör att vi kan bygga starkare och mer träffsäkra ärenden – från första ansökan till ett eventuellt överklagande i migrationsdomstol.",
            en: "Our Chief Legal Counsel previously worked as an asylum case officer at the Swedish Migration Agency, giving her unique insight into the agency's working methods, investigative approach, and decision-making processes. That experience lets us build stronger, more precise cases — from the initial application to any appeal in the migration court.",
          },
          {
            sv: "Vi hjälper dig med:",
            en: "We help you with:",
          },
        ],
        bullets: [
          {
            sv: "Asylansökningar och flyktingstatus",
            en: "Asylum applications and refugee status",
          },
          {
            sv: "Uppehållstillstånd (arbete, studier, anknytning)",
            en: "Residence permits (work, study, family ties)",
          },
          {
            sv: "Medborgarskapsfrågor",
            en: "Citizenship matters",
          },
          {
            sv: "Överklaganden av Migrationsverkets beslut",
            en: "Appeals of Migration Agency decisions",
          },
          {
            sv: "Frågor om verkställighetshinder och verkställighetsförläggning",
            en: "Impediments to enforcement and reception placement",
          },
        ],
        closing: {
          sv: "Du ska inte behöva känna dig ensam i kontakten med myndigheterna. Vi ser till att din röst blir hörd och din sak ordentligt utredd.",
          en: "You shouldn't have to face the authorities alone. We make sure your voice is heard and your matter properly investigated.",
        },
      },
    ],
  },
  {
    slug: "overklaga",
    icon: Gavel,
    title: { sv: "Överklaga myndighetsbeslut", en: "Appealing Authority Decisions" },
    short: {
      sv: "Vi överklagar Försäkringskassans och andra myndigheters beslut — och hjälper dig även vid ansökningar.",
      en: "We appeal decisions by the Social Insurance Agency and other authorities — and also help with applications.",
    },
    sections: [
      {
        heading: {
          sv: "Vill du överklaga Försäkringskassans beslut eller ett annat myndighetsbeslut?",
          en: "Want to appeal a decision from the Social Insurance Agency or another authority?",
        },
        paragraphs: [
          {
            sv: "Våra uppdrag handlar huvudsakligen om att överklaga Försäkringskassans beslut eller annat myndighetsbeslut men vi arbetar även med att hjälpa till vid ansökningar. För att du ska få bästa hjälp med ditt ärende kan du ta kontakt med oss som har specialistkompetens inom myndighetsjuridik.",
            en: "Our work mainly concerns appealing decisions from Försäkringskassan or other authorities, but we also help with applications. For the best help with your matter, get in touch with us — specialists in administrative law.",
          },
        ],
      },
    ],
  },
];

export type Stat = { value: string; label: L };

export const stats: Stat[] = [
  { value: "15+", label: { sv: "Års erfarenhet", en: "Years of Experience" } },
  { value: "500+", label: { sv: "Ärenden hanterade", en: "Cases Handled" } },
  { value: "95%", label: { sv: "Nöjda klienter", en: "Client Satisfaction" } },
];

export type Differentiator = { title: L; description: L; icon: LucideIcon };

export const differentiators: Differentiator[] = [
  {
    icon: ShieldCheck,
    title: { sv: "Erfarna jurister", en: "Experienced Counsel" },
    description: {
      sv: "Vi har mångårig erfarenhet av myndighetsjuridik och en gedigen vana att överklaga Försäkringskassans och andra myndigheters beslut.",
      en: "We bring many years of experience in administrative law and a solid record of appealing decisions from the Social Insurance Agency and other authorities.",
    },
  },
  {
    icon: Target,
    title: { sv: "Strategiska lösningar", en: "Strategic Solutions" },
    description: {
      sv: "Vi reagerar inte bara — vi planerar. Varje ärende inleds med en tydlig strategi för att nå dina mål så effektivt som möjligt.",
      en: "We don't just react — we plan. Every matter begins with a clear strategy designed to reach your goals as efficiently as possible.",
    },
  },
  {
    icon: HeartHandshake,
    title: { sv: "Personligt engagemang", en: "Personal Commitment" },
    description: {
      sv: "Du arbetar direkt med din jurist. Förvänta dig lyhördhet, tydlighet och rådgivning som utgår från din situation.",
      en: "You work directly with your lawyer. Expect responsiveness, clarity, and counsel tailored to your situation.",
    },
  },
];

export type Testimonial = { quote: L; name: string; role: L };

export const testimonials: Testimonial[] = [
  {
    quote: {
      sv: "Invictus Law överklagade Försäkringskassans avslag och vände beslutet helt. De var kunniga, lugna och orubbliga när det gällde som mest.",
      en: "Invictus Law appealed the Social Insurance Agency's rejection and overturned the decision entirely. They were knowledgeable, calm, and relentless when it mattered most.",
    },
    name: "Anders Lind",
    role: { sv: "Klient", en: "Client" },
  },
  {
    quote: {
      sv: "Kampen om min sons assistansersättning var det tyngsta året i mitt liv. Teamet skyddade hans rätt till stöd med genuint engagemang.",
      en: "The fight for my son's assistance compensation was the hardest year of my life. The team protected his right to support with genuine commitment.",
    },
    name: "Maria Johansson",
    role: { sv: "Anhörig", en: "Family member" },
  },
  {
    quote: {
      sv: "När kommunen drog in en LSS-insats hjälpte de oss att överklaga — och vi fick rätt. Ovärderlig hjälp.",
      en: "When the municipality withdrew an LSS support, they helped us appeal — and we won. Invaluable help.",
    },
    name: "Sofia Berg",
    role: { sv: "Klient", en: "Client" },
  },
];
