/**
 * Marketing content for Invictus Law. Realistic placeholder copy kept in one
 * place so pages render from data and stay easy to edit or localize later.
 */

import {
  Briefcase,
  Users,
  Building2,
  Scale,
  ShieldCheck,
  Target,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export type PracticeArea = {
  slug: string;
  title: string;
  icon: LucideIcon;
  short: string;
  description: string;
  benefits: string[];
  situations: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "corporate-law",
    title: "Corporate Law",
    icon: Briefcase,
    short: "Business formation, contracts, and compliance for companies at every stage.",
    description:
      "From incorporation to complex commercial transactions, our corporate practice helps founders, executives, and established enterprises structure their businesses for growth while managing risk. We act as outside general counsel — pragmatic, responsive, and aligned with your commercial objectives.",
    benefits: [
      "Entity structuring that protects founders and minimizes tax exposure",
      "Airtight contracts negotiated to defend your interests",
      "Proactive compliance that prevents costly disputes",
      "A single trusted advisor across the lifecycle of your business",
    ],
    situations: [
      "Forming an LLC, corporation, or partnership",
      "Negotiating vendor, client, or employment agreements",
      "Raising capital or onboarding investors",
      "Preparing for a merger, acquisition, or sale",
    ],
  },
  {
    slug: "family-law",
    title: "Family Law",
    icon: Users,
    short: "Compassionate, discreet counsel for divorce, custody, and mediation.",
    description:
      "Family matters demand both legal precision and genuine empathy. We guide clients through divorce, custody, and support disputes with discretion and resolve — protecting what matters most while pursuing outcomes that let you move forward with dignity.",
    benefits: [
      "Clear guidance during emotionally difficult decisions",
      "Strong advocacy for your parental rights and financial security",
      "Mediation-first approach that reduces cost and conflict",
      "Confidential, judgment-free representation",
    ],
    situations: [
      "Filing for or responding to a divorce",
      "Establishing custody, visitation, or support arrangements",
      "Negotiating prenuptial or postnuptial agreements",
      "Modifying or enforcing an existing order",
    ],
  },
  {
    slug: "real-estate-law",
    title: "Real Estate Law",
    icon: Building2,
    short: "Transactions, disputes, and commercial property representation.",
    description:
      "Whether you are closing on a first home or structuring a multi-million dollar commercial deal, our real estate team safeguards every transaction. We handle diligence, drafting, negotiation, and litigation so your investment is protected from contract to closing — and beyond.",
    benefits: [
      "Meticulous due diligence that surfaces hidden risk",
      "Skilled negotiation of purchase and lease terms",
      "Swift resolution of title, boundary, and tenancy disputes",
      "End-to-end support for commercial developments",
    ],
    situations: [
      "Buying, selling, or leasing residential or commercial property",
      "Resolving title defects or boundary disputes",
      "Drafting or contesting commercial leases",
      "Navigating zoning, land use, or development approvals",
    ],
  },
  {
    slug: "litigation",
    title: "Litigation & Dispute Resolution",
    icon: Scale,
    short: "Civil litigation and dispute resolution, in and out of the courtroom.",
    description:
      "When negotiation fails, you need an advocate who is prepared to win. Our litigators bring decades of courtroom experience and a strategic, evidence-driven approach to every dispute — pursuing resolution through settlement where wise, and through trial where necessary.",
    benefits: [
      "A trial-tested team that opponents take seriously",
      "Strategic case assessment focused on your best outcome",
      "Transparent communication at every stage",
      "Cost-conscious paths to resolution, including arbitration and mediation",
    ],
    situations: [
      "Breach of contract or business disputes",
      "Partnership, shareholder, or commercial conflicts",
      "Property and real estate litigation",
      "Pursuing or defending a civil claim",
    ],
  },
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Cases Handled" },
  { value: "95%", label: "Client Satisfaction" },
];

export type Differentiator = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const differentiators: Differentiator[] = [
  {
    title: "Experienced Attorneys",
    description:
      "Our partners bring over fifteen years of practice across the courtroom and the boardroom, with a record of results in high-stakes matters.",
    icon: ShieldCheck,
  },
  {
    title: "Strategic Legal Solutions",
    description:
      "We don't just react — we anticipate. Every engagement begins with a clear strategy designed to achieve your objectives efficiently.",
    icon: Target,
  },
  {
    title: "Personalized Client Service",
    description:
      "You work directly with your attorney, not a call center. Expect responsiveness, transparency, and counsel tailored to your situation.",
    icon: Handshake,
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Invictus Law restructured our company and negotiated an acquisition that exceeded every expectation. They were sharp, calm, and relentless when it mattered.",
    name: "David Reyes",
    role: "CEO, Meridian Logistics",
  },
  {
    quote:
      "Going through a divorce was the hardest year of my life. Sarah and her team protected my children and my future with genuine compassion and steel-spined advocacy.",
    name: "Catherine Lowe",
    role: "Private Client",
  },
  {
    quote:
      "When a commercial dispute threatened to derail our development, their litigation team resolved it on our terms — and saved us from a costly trial. Exceptional counsel.",
    name: "Jonathan Pryce",
    role: "Managing Director, Halcyon Properties",
  },
];

export type Attorney = {
  name: string;
  role: string;
  focus: string;
  bio: string;
  image: string;
  bar: string;
};

export const attorneys: Attorney[] = [
  {
    name: "Sarah Anderson",
    role: "Managing Partner",
    focus: "Corporate & Commercial Law",
    bio: "Sarah founded Invictus Law on a single conviction: that elite legal counsel should be strategic, accessible, and unwavering. With more than fifteen years advising founders and corporations through their most consequential decisions, she leads the firm's corporate practice and its culture of client-first advocacy.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bar: "Admitted: New York, Connecticut",
  },
  {
    name: "Michael Carter",
    role: "Senior Litigation Attorney",
    focus: "Civil Litigation & Disputes",
    bio: "A formidable presence in the courtroom, Michael has tried complex commercial and civil disputes to verdict for over a decade. Clients value his composed strategy under pressure and his ability to translate intricate legal exposure into clear, actionable counsel.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
    bar: "Admitted: New York, New Jersey",
  },
  {
    name: "Jennifer Brooks",
    role: "Corporate Counsel",
    focus: "Transactions & Compliance",
    bio: "Jennifer guides companies through formation, financing, and growth with meticulous attention to detail. Her background in regulatory compliance gives clients confidence that their business is built on a foundation that will withstand scrutiny.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    bar: "Admitted: New York",
  },
];

export type CoreValue = { title: string; description: string };

export const coreValues: CoreValue[] = [
  {
    title: "Integrity",
    description:
      "We give honest counsel, even when it is not what a client hopes to hear. Trust is the foundation of every engagement.",
  },
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest standard of legal craft, preparation, and judgment in every matter we take on.",
  },
  {
    title: "Advocacy",
    description:
      "We represent our clients with conviction and resolve, treating their objectives as our own.",
  },
  {
    title: "Discretion",
    description:
      "We safeguard our clients' privacy and handle every matter with the confidentiality it deserves.",
  },
];
