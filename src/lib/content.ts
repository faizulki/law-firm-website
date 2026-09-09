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
  Building2,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Lang } from "./i18n";

export type L = { sv: string; en: string };
export function pick(value: L, lang: Lang): string {
  return value[lang];
}

export type ServiceSection = {
  heading?: L;
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
    slug: "familjeratt",
    icon: Users,
    title: { sv: "Familjerätt", en: "Family Law" },
    short: {
      sv: "Strategisk och mänsklig rådgivning vid skilsmässa, vårdnadstvister och upprättande av familjerättsliga avtal.",
      en: "Strategic and human advice on divorce, custody disputes, and drafting family-law agreements.",
    },
    sections: [
      {
        paragraphs: [
          {
            sv: "Familjerätten rör livets mest personliga och betydelsefulla relationer. Med dokumenterad spetskompetens och ett stort personligt engagemang guidar vi dig genom både förebyggande juridik och akuta tvister. Vi erbjuder strategisk och mänsklig rådgivning vid skilsmässor, vårdnadstvister, boende- och umgängesfrågor, samt upprättande av juridiska dokument såsom äktenskapsförord, samboavtal, testamenten och bodelningsavtal. Hos Invictus Law kan du vara trygg i att dina och dina barns intressen tas tillvara på bästa möjliga sätt.",
            en: "Family law concerns life's most personal and significant relationships. With documented specialist expertise and strong personal commitment, we guide you through both preventive legal work and urgent disputes. We offer strategic and human advice on divorces, custody disputes, residence and contact matters, as well as drafting legal documents such as prenuptial agreements, cohabitation agreements, wills, and property division agreements. At Invictus Law, you can be confident that your and your children's interests are safeguarded in the best possible way.",
          },
          {
            sv: "Vår chefsjurist har dessutom under många år haft ett nära samarbete med kvinnojouren i Malmö och besitter en djupgående erfarenhet av att företräda kvinnor i mycket svåra och utsatta livssituationer. Denna mångåriga erfarenhet ger oss en unik förmåga att kombinera absolut juridisk skärpa med den empati, trygghet och det skyddsperspektiv som krävs när situationen är som mest komplex och känslomässigt krävande.",
            en: "Our Chief Legal Counsel has also worked closely with the women's shelter in Malmö for many years and has deep experience representing women in very difficult and vulnerable life situations. This long-standing experience gives us a unique ability to combine absolute legal precision with the empathy, security, and protective perspective required when a situation is at its most complex and emotionally demanding.",
          },
        ],
      },
    ],
  },
  {
    slug: "socialratt",
    icon: Scale,
    title: { sv: "Socialrätt", en: "Social Law" },
    short: {
      sv: "Engagerat stöd i socialrättsliga tvångsvårdsmål som LVU, LVM och LPT — som offentligt biträde eller privat ombud.",
      en: "Dedicated support in social-law compulsory care cases such as LVU, LVM, and LPT — as public counsel or private representative.",
    },
    sections: [
      {
        paragraphs: [
          {
            sv: "Socialrätten rymmer komplexa frågor som rör individens skydd och rättigheter i samhället, inklusive tvångsvårdsmål såsom LVU, LVM och LPT. Invictus Law har spetskompetens inom socialrätt och erbjuder ett engagerat och juridiskt skarpt stöd i situationer som ofta är både akuta och känslomässigt påfrestande. Vi agerar som offentligt biträde eller privat ombud och kämpar för att säkerställa att myndigheternas handläggning sker rättssäkert och att individens röst blir hörd i domstol.",
            en: "Social law encompasses complex issues concerning an individual's protection and rights in society, including compulsory care cases such as LVU, LVM, and LPT. Invictus Law has specialist expertise in social law and offers dedicated, legally sharp support in situations that are often both urgent and emotionally demanding. We act as public counsel or private representative and fight to ensure that authorities' handling is legally sound and that the individual's voice is heard in court.",
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
      sv: "Trygg vägledning genom det nya, strängare regelverket kring uppehållstillstånd, medborgarskap och asyl.",
      en: "Confident guidance through the new, stricter rules on residence permits, citizenship, and asylum.",
    },
    sections: [
      {
        paragraphs: [
          {
            sv: "Det migrationsrättsliga landskapet är i ständig förändring, vilket har blivit särskilt tydligt under 2026 i och med de omfattande och strikta lagändringar som skett avseende kraven för både permanent uppehållstillstånd och svenskt medborgarskap. Dessa nya regelverk har skapat en stor osäkerhet och innebär skärpta villkor kring bland annat försörjning, vandel och språkkunskaper.",
            en: "The migration law landscape is constantly changing, which has become especially clear during 2026 with the extensive and strict legislative changes affecting the requirements for both permanent residence permits and Swedish citizenship. These new rules have created considerable uncertainty and mean stricter conditions regarding, among other things, income, conduct, and language proficiency.",
          },
          {
            sv: "På Invictus Law hjälper vi dig att navigera i detta nya juridiska landskap, tolka hur de senaste lagändringarna påverkar just din situation och strategiskt planera samt anpassa din ansökan för att maximera chanserna till bifall under de nya, strängare förutsättningarna. Det migrationsrättsliga landskapet är strikt och kräver absolut precision i varje moment.",
            en: "At Invictus Law, we help you navigate this new legal landscape, interpret how the latest legislative changes affect your specific situation, and strategically plan and tailor your application to maximise your chances of approval under the new, stricter conditions. The migration law landscape is strict and demands absolute precision at every step.",
          },
          {
            sv: "På Invictus Law biträder vi klienter i ärenden som rör asyl, arbetstillstånd, uppehållstillstånd för egna företagare, familjeåterförening och svenskt medborgarskap och företräder dig i dessa processer.",
            en: "At Invictus Law, we assist clients in matters concerning asylum, work permits, residence permits for self-employed individuals, family reunification, and Swedish citizenship, and represent you throughout these processes.",
          },
          {
            sv: "Då vår chefsjurist har värdefull erfarenhet av att ha arbetat på Migrationsverket, besitter vi en djupgående förståelse för myndighetens interna beslutsprocesser och bedömningsgrunder. Vi hjälper er att strukturera er ansökan rätt från början eller att driva ert ärende vidare vid ett eventuellt avslag.",
            en: "As our Chief Legal Counsel has valuable experience working at the Swedish Migration Agency, we have an in-depth understanding of the agency's internal decision-making processes and grounds for assessment. We help you structure your application correctly from the outset, or pursue your case further in the event of a rejection.",
          },
        ],
      },
    ],
  },
  {
    slug: "personlig-assistans-socialforsakringsratt",
    icon: ShieldCheck,
    title: {
      sv: "Personlig assistans (LSS) och Socialförsäkringsrätt",
      en: "Personal Assistance (LSS) and Social Insurance Law",
    },
    short: {
      sv: "Kvalificerad rådgivning kring LSS-insatser och socialförsäkringsförmåner för både privatpersoner och assistansanordnare.",
      en: "Qualified advice on LSS support and social insurance benefits for both private individuals and assistance providers.",
    },
    sections: [
      {
        paragraphs: [
          {
            sv: "Rätten till personlig assistans och andra socialförsäkringsförmåner är avgörande för individens livskvalitet, men regelverket kring LSS och Försäkringskassan är snårigt och i ständig förändring. Vi erbjuder kvalificerad juridisk rådgivning och praktiskt stöd för både enskilda individer och assistansanordnare.",
            en: "The right to personal assistance and other social insurance benefits is decisive for an individual's quality of life, but the regulatory framework surrounding LSS and Försäkringskassan is intricate and constantly changing. We offer qualified legal advice and practical support for both private individuals and assistance providers.",
          },
          {
            sv: "Vår chefsjurist har en bakgrund som bolagsjurist på ett större LSS-bolag, vilket ger oss en unik insyn i branschens utmaningar. Vi hjälper er med allt från nyansökningar och omprövningar till att driva processer mot myndigheter när rättmätiga insatser har nekats.",
            en: "Our Chief Legal Counsel has a background as in-house counsel at a major LSS company, giving us unique insight into the industry's challenges. We help you with everything from new applications and reassessments to pursuing proceedings against authorities when rightful support has been denied.",
          },
        ],
      },
    ],
  },
  {
    slug: "tillstandsarenden-lss-hvb",
    icon: Building2,
    title: {
      sv: "Tillståndsärenden: Starta LSS-bolag, LSS-hem och HVB-hem (SoL)",
      en: "Licensing Matters: Starting LSS Companies, LSS Homes, and HVB Homes (SoL)",
    },
    short: {
      sv: "Vi lotsar er genom IVO:s tillståndsprövning vid start av LSS-bolag, LSS-hem och HVB-hem.",
      en: "We guide you through IVO's permit review when establishing LSS companies, LSS homes, and HVB homes.",
    },
    sections: [
      {
        paragraphs: [
          {
            sv: "Att etablera och driva verksamhet inom vård och omsorg kräver tillstånd från Inspektionen för vård och omsorg (IVO). Kraven på ägar- och ledningsprövning, ekonomisk stabilitet samt kvalitetssäkring är extremt högt ställda. Tack vare vår chefsjurists gedigna erfarenhet från omsorgsbranschen har Invictus Law den spetskompetens som krävs för att lotsa er genom hela processen. Vi hjälper er att strukturera ansökan, utforma ledningssystem och bemöta IVO:s frågor vid tillståndsprövning för LSS-bolag, LSS-hem, HVB-hem samt andra tillståndspliktiga verksamheter inom ramen för SoL.",
            en: "Establishing and operating a business within care and social services requires a permit from the Health and Social Care Inspectorate (IVO). The requirements for ownership and management review, financial stability, and quality assurance are set extremely high. Thanks to our Chief Legal Counsel's solid experience from the care industry, Invictus Law has the specialist expertise required to guide you through the entire process. We help you structure the application, design management systems, and respond to IVO's questions during the permit review for LSS companies, LSS homes, HVB homes, and other activities requiring a permit under SoL.",
          },
        ],
      },
    ],
  },
  {
    slug: "serveringstillstand",
    icon: FileText,
    title: { sv: "Serveringstillstånd", en: "Liquor Licensing" },
    short: {
      sv: "Ansökan, tillsynsärenden och överklaganden av serveringstillstånd för restauranger, hotell och krogar.",
      en: "Applications, supervisory matters, and appeals for liquor licenses for restaurants, hotels, and bars.",
    },
    sections: [
      {
        paragraphs: [
          {
            sv: "Att ansöka om eller behålla ett serveringstillstånd kräver djupgående kunskap om alkohollagen och lokala riktlinjer. Processen är ofta rigorös med höga krav på personlig och ekonomisk lämplighet samt strikta vandelsprövningar. Invictus Law biträder restauranger, hotell och andra aktörer genom hela processen – från den initiala ansökan och dialogen med kommunen till strategisk rådgivning vid tillsynsärenden, varningar eller hot om återkallelse. Med vår expertis minimerar vi riskerna och maximerar era chanser till ett positivt beslut.",
            en: "Applying for or retaining a liquor license requires in-depth knowledge of the Alcohol Act and local guidelines. The process is often rigorous, with high demands on personal and financial suitability and strict conduct assessments. Invictus Law assists restaurants, hotels, and other operators through the entire process — from the initial application and dialogue with the municipality to strategic advice during supervisory matters, warnings, or threats of revocation. With our expertise, we minimise the risks and maximise your chances of a favourable decision.",
          },
          {
            sv: "Flera av våra kunder är idag verksamma inom både restaurang- och krogbranschen, det ger oss en unik inblick i de olika tillstånd som ges av myndigheter för både serveringen och alkohol.",
            en: "Several of our clients are today active in both the restaurant and bar industry, which gives us a unique insight into the various permits issued by authorities for both service and alcohol.",
          },
        ],
      },
    ],
  },
  {
    slug: "forvaltningsratt-overklaga",
    icon: Gavel,
    title: {
      sv: "Förvaltningsrätt – Överklaga myndighetsbeslut",
      en: "Administrative Law — Appealing Authority Decisions",
    },
    short: {
      sv: "Vi granskar och överklagar felaktiga myndighetsbeslut till förvaltningsrätten och kammarrätten.",
      en: "We review and appeal incorrect authority decisions to the Administrative Court and the Administrative Court of Appeal.",
    },
    sections: [
      {
        paragraphs: [
          {
            sv: "När en myndighet fattar ett beslut som går dig eller ditt företag emot, är det avgörande att agera snabbt och juridiskt korrekt. Förvaltningsrätten styr relationen mellan den enskilde och det allmänna. Invictus Law har omfattande erfarenhet av att granska, analysera och överklaga felaktiga myndighetsbeslut till förvaltningsrätten och kammarrätten. Vi formulerar juridiskt slagkraftiga överklaganden och processar för dina rättigheter, oavsett om det handlar om indragna tillstånd, nekat stöd eller andra betungande myndighetsbeslut.",
            en: "When an authority makes a decision against you or your company, it is crucial to act quickly and in a legally sound manner. Administrative law governs the relationship between the individual and the state. Invictus Law has extensive experience reviewing, analysing, and appealing incorrect authority decisions to the Administrative Court and the Administrative Court of Appeal. We draft legally forceful appeals and litigate for your rights, whether the matter concerns revoked permits, denied support, or other burdensome authority decisions.",
          },
        ],
      },
    ],
  },
  {
    slug: "medicinalratt-ivo",
    icon: Stethoscope,
    title: { sv: "Medicinalrätt och IVO-anmälningar", en: "Medical Law and IVO Reports" },
    short: {
      sv: "Spetskompetens inom medicinalrätt — tillsynsärenden, IVO-anmälningar och processer i HSAN.",
      en: "Specialist expertise in medical law — supervisory matters, IVO reports, and proceedings before HSAN.",
    },
    sections: [
      {
        paragraphs: [
          {
            sv: "Medicinalrätten är ett högspecialiserat område där hälso- och sjukvårdens regelverk möter juridiken. Vår chefsjurist har förvärvat spetskompetens inom detta fält genom tidigare arbete på en större, välrenommerad advokatbyrå med just denna inriktning. Vi biträder vårdgivare, legitimerad hälso- och sjukvårdspersonal samt enskilda patienter.",
            en: "Medical law is a highly specialised field where healthcare regulations meet the law. Our Chief Legal Counsel has acquired specialist expertise in this field through previous work at a large, well-reputed law firm with exactly this focus. We assist healthcare providers, licensed healthcare professionals, and individual patients.",
          },
          {
            sv: "Vi erbjuder expertis vid tillsynsärenden, anmärkningar och anmälningar till Inspektionen för vård och omsorg (IVO), samt vid processer i Hälso- och sjukvårdens ansvarsnämnd (HSAN) gällande legitimationsfrågor.",
            en: "We offer expertise in supervisory matters, remarks, and reports to the Health and Social Care Inspectorate (IVO), as well as in proceedings before the Medical Responsibility Board (HSAN) concerning matters of professional licensing.",
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
