/**
 * Swedish / English UI string dictionary for Invictus Law.
 *
 * Plain data only — no "use client" here. i18n.tsx (client-only hooks) and
 * content-store.ts (server-only, uses node:fs) both need this data, so it
 * lives in its own module rather than inside the "use client" i18n.tsx —
 * importing plain data through a "use client" boundary from server code
 * causes RSC serialization issues.
 */

export type Lang = "sv" | "en";

export const dictionary = {
  sv: {
    locale: "sv-SE",
    nav: {
      home: "Hem",
      about: "Om oss",
      services: "Våra rättsområden",
      consultation: "Konsultation",
      priser: "Priser",
      blog: "Blogg",
      contact: "Kontakt",
    },
    a11y: {
      skip: "Hoppa till innehåll",
      openMenu: "Öppna meny",
      closeMenu: "Stäng meny",
      prevMonth: "Föregående månad",
      nextMonth: "Nästa månad",
      switchToEn: "Byt till engelska",
      switchToSv: "Byt till svenska",
    },
    common: {
      bookConsultation: "Boka konsultation",
      learnMore: "Läs mer",
      readMore: "Läs mer",
    },
    hero: {
      eyebrow: "Invictus Law · Juristbyrå",
      line1: "Rättvisa utan",
      line2: "kompromisser",
      sub: "Erfaren juridisk hjälp för privatpersoner och företag — strategisk, effektiv och resultatinriktad rådgivning inom myndighetsjuridik.",
      ctaPrimary: "Boka konsultation",
      ctaSecondary: "Läs mer",
    },
    home: {
      practiceEyebrow: "Rättsområden",
      practiceTitle: "Rådgivning inom de frågor som berör dig",
      practiceIntro:
        "Oavsett ärende möter vi dig med specialistkompetens och ett orubbligt engagemang för dina mål.",
      whyEyebrow: "Varför Invictus Law",
      whyTitle: "En byrå byggd på resultat",
      whyIntro:
        "Vi mäter framgång i de utfall vi uppnår och det förtroende vi förtjänar — en klient i taget.",
      testEyebrow: "Vad klienterna säger",
      testTitle: "Förtroende i de stunder som betyder mest",
    },
    cta: {
      title: "Boka din kostnadsfria konsultation",
      subtitle:
        "Berätta om din situation. Vi går igenom ditt ärende och stakar ut en tydlig väg framåt — utan förpliktelser.",
      button: "Boka konsultation",
    },
    about: {
      eyebrow: "Om oss",
      title: "Vi sätter människan i centrum för juridiken",
      intro:
        "På Invictus Law är vi stolta över att ha en av branschens mest mångsidiga och erfarna jurister i spetsen. Vår chefsjurist förenar juridisk skärpa med djup medicinsk kompetens och mångårig erfarenhet från både offentlig sektor, privat näringsliv och advokatbyrå.",
      sections: [
        {
          heading: "En gedigen juridisk bakgrund",
          paragraphs: [
            "Chefsjuristen, Gabriella Levin, är utbildad och har en Master of Laws (LL.M.) från Lunds universitet med en unik specialisering inom medicinalrätt, individuell arbetsrätt, familjerätt och socialrätt. Hennes breda juridiska grund kombineras med en socionomexamen från Malmö universitet – en tvärvetenskaplig profil som präglar hela hennes professionella förhållningssätt.",
          ],
        },
        {
          heading: "Erfarenhet från hela rättskedjan",
          paragraphs: [
            "Hennes resa började långt innan juristexamen – som undersköterska inom Region Skåne och arbetsledare inom assistansbranschen. Den kliniska blicken och omtanken därifrån har följt med henne genom hela karriären.",
            "Efter en tid som asylhandläggare på Migrationsverket och biträdande jurist på Advokatbyrån Limhamnsjuristen AB, tog karriären fart som bolagsjurist på Care AB. Därefter följde roller som jurist på Västra Hamnens Juristbyrå, IT-ansvarig och chefsjurist på Juristbyrån Dockan AB – för att sedan leda den juridiska verksamheten som Chefsjurist på Invictus Law sedan maj 2024.",
          ],
        },
        {
          heading: "Så här hjälper hon dig",
          paragraphs: [
            "Med över ett decennium av juridisk erfarenhet – plus en bakgrund inom vård och socialt arbete – förstår vår chefsjurist människan bakom varje ärende. Oavsett om du behöver hjälp med medicinalrättsliga frågor, arbetsrättsliga tvister, familjerättsliga frågor eller socialrättsliga utmaningar, får du en rådgivare som ser hela din situation.",
          ],
        },
      ],
      quote:
        "Juridik ska vara begriplig, tillgänglig och göra skillnad – inte skapa fler problem.",
      closing:
        "Vill du veta mer om hur just din fråga kan hanteras? Kontakta oss så berättar vi mer.",
      ledordEyebrow: "Våra ledord",
      ledordQuote: "Våra ledord är kvalitet, personligt engagemang och trygghet.",
      ledord: ["Kvalitet", "Personligt engagemang", "Trygghet"],
      ctaTitle: "Vill du diskutera ditt ärende?",
      ctaSubtitle: "Boka en kostnadsfri konsultation med oss idag.",
    },
    services: {
      eyebrow: "Våra rättsområden",
      title: "Specialister på myndighetsjuridik",
      intro:
        "Tillståndsärenden, personlig assistans och assistansersättning, socialförsäkringsrätt, socialrätt samt överklagande av myndighetsbeslut.",
      ctaTitle: "Behöver du hjälp med ditt ärende?",
      ctaSubtitle:
        "Ta kontakt med oss som har specialistkompetens inom myndighetsjuridik.",
    },
    priser: {
      eyebrow: "Priser",
      title: "Vad kostar juridisk rådgivning hos Invictus Law?",
      intro: "Kostnadshjälp vid juridisk rådgivning.",
      rateEyebrow: "Rättshjälpstaxa 2026",
      rateDesc:
        "Invictus Law följer den av staten fastställda rättshjälpstaxan som ändras varje år.",
      rateValue: "2 032 kr",
      perHour: "/ timme",
      lead: "Invictus Law följer den av staten fastställda rättshjälpstaxan som ändras varje år. För år 2026 är den 2 032 kr per timme.",
      paragraphs: [
        "För företag har vi individuell prissättning beroende på omfattningen av uppdraget.",
        "När vi tar uppdrag som offentligt biträde i LVU och LVM är det kostnadsfritt för dig som behöver vår hjälp. Du som befinner dig i en LVU-process har rätt till ett offentligt biträde som ska bistå med juridisk hjälp och domstolen betalar den kostnad som uppstår för det offentliga biträdet.",
        "Även barn får ett eget offentligt biträde som domstolen betalar kostnaden för.",
        "Om du inte har någon hemförsäkring eller om försäkringen inte täcker tvisten kan det finnas möjlighet att ansöka om rättshjälp. Rättshjälp innebär att staten står för en viss del av kostnaden för din juridiska hjälp och att du endast betalar viss del själv. Den delen du själv betalar beror på vilken inkomst du har. För att kunna beviljas rättshjälp måste du först betala en rådgivningsavgift motsvarande en timmes rådgivning enligt rättshjälpstaxan som varierar från år till år enligt ovan.",
        "I vissa fall finns det möjlighet att få ersättning för en del av din kostnad för juridisk hjälp genom din hemförsäkring. Det kallas rättsskydd. Rättsskydd innebär att du betalar en självriskkostnad, vanligen mellan 20 och 30 procent av den totala kostnaden för din juridiska hjälp, och att försäkringsbolaget tar resterande del av kostnaden.",
        "Rättsskydd gäller vanligtvis vid tvister i Tingsrätten och inte vid tvister i Förvaltningsrätten, alltså inte vid tvister mellan enskild och en kommun eller myndighet. Det är därför viktigt att kolla upp vilka villkor som just din hemförsäkring ställer för att få rättsskydd.",
        "Det kan vara svårt att få kostnadshjälp i form av rättsskydd eller rättshjälp vid tvister i domstol mot myndigheter och vid ansökan om en förmån eller insats. Vi på Juridisk Assistans vill däremot underlätta för dig och hjälper dig därför att ansöka om rättsskydd eller rättshjälp om vi bedömer att du har möjlighet att beviljas sådan hjälp.",
        "För att kunna beviljas rättshjälp måste du först betala en rådgivningsavgift motsvarande en timmes rådgivning enligt rättshjälpstaxan som varierar från år till år enligt ovan. Det är mycket ovanligt att enskilda beviljas rättshjälp i domstolsprocesser mot myndighet.",
      ],
      ctaTitle: "Osäker på vad som gäller i ditt fall?",
      ctaSubtitle:
        "Vi hjälper dig att ansöka om rättsskydd eller rättshjälp om vi bedömer att du har möjlighet att beviljas sådan hjälp.",
    },
    blog: {
      eyebrow: "Blogg",
      title: "Nyheter och juridiska insikter",
      intro: "Guider, uppdateringar och analyser från Invictus Law.",
      empty: "Inga artiklar publicerade ännu. Kom snart tillbaka.",
      back: "Till bloggen",
    },
    consultation: {
      eyebrow: "Boka en konsultation",
      title: "Boka din kostnadsfria 30-minuterskonsultation",
      intro:
        "Tre snabba steg. Välj din tjänst, välj en tid som passar dig och dela några detaljer – vi tar det därifrån.",
    },
    booking: {
      steps: ["Rättsområde", "Datum & Tid", "Dina detaljer"],
      step1Title: "Vad kan vi hjälpa dig med?",
      practiceAreaLabel: "Rättsområde",
      formatLabel: "Typ av konsultation",
      types: {
        personal: {
          label: "Personligt möte",
          duration: "30 min · På plats",
          desc: "Träffa din jurist på vårt kontor.",
        },
        video: {
          label: "Videomöte",
          duration: "30 min · Videosamtal",
          desc: "Ett säkert videosamtal var du än är.",
        },
        phone: {
          label: "Telefonrådgivning",
          duration: "30 min · Telefon",
          desc: "Ett fokuserat samtal vid avtalad tid.",
        },
      },
      step2Title: "Välj datum & tid",
      availableTimes: "Lediga tider",
      selectDate: "Välj ett datum för att se lediga tider",
      step3Title: "Dina detaljer",
      fullName: "Namn",
      phone: "Telefonnummer",
      email: "E-postadress",
      matterLabel: "Beskriv ditt ärende kort",
      matterOptional: "(valfritt)",
      matterPlaceholder:
        "Dela gärna detaljer som hjälper oss att förbereda inför din konsultation.",
      agreement:
        "Genom att skicka godkänner du att vi kontaktar dig angående din konsultation. Att skicka detta formulär skapar inte något klientförhållande.",
      back: "Tillbaka",
      continue: "Fortsätt",
      booking: "Bokar…",
      confirm: "Bekräfta bokning",
      summaryTitle: "Din konsultation",
      fmtService: "Rättsområde",
      fmtFormat: "Format",
      fmtDate: "Datum",
      fmtTime: "Tid",
      freeTitle: "Kostnadsfri 30-minuterskonsultation",
      freeDesc:
        "Utan förpliktelser. Vi går igenom ditt ärende och stakar ut en tydlig väg framåt.",
      errName: "Ange ditt namn.",
      errEmail: "Ange din e-post.",
      errEmailValid: "Ange en giltig e-postadress.",
      errPhone: "Ange ett telefonnummer.",
      errSlotTaken: "Den valda tiden blev precis bokad av någon annan. Välj en annan tid.",
      errGeneric: "Kunde inte slutföra bokningen. Försök igen.",
      confTitle: "Din konsultation är bokad",
      confThanks:
        "Tack, {name}. En bekräftelse har skickats till {email}. Hör av dig om du inte ser den inom några minuter.",
      location: "Plats",
      reference: "Referens",
      returnHome: "Till startsidan",
      exploreServices: "Utforska rättsområden",
    },
    calendar: {
      months: [
        "januari", "februari", "mars", "april", "maj", "juni",
        "juli", "augusti", "september", "oktober", "november", "december",
      ],
      weekdays: ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö"],
      note: "Endast vardagar. Alla tider visas i din lokala tidszon.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Låt oss börja samtalet",
      intro:
        "Oavsett om du har en fråga eller är redo att diskutera ditt ärende finns vi här för att hjälpa.",
      getInTouch: "Hör av dig",
      getInTouchDesc:
        "Nå oss direkt eller skicka ett meddelande via formuläret. Vi svarar på alla förfrågningar inom en arbetsdag.",
      office: "Kontor",
      phone: "Telefon",
      email: "E-post",
      hours: "Öppettider",
      hoursVal: ["Måndag – Fredag", "09:00 – 18:00"],
      mapTitle: "Karta över kontorets läge",
      formName: "För- och efternamn",
      formPhone: "Telefon (valfritt)",
      formEmail: "E-postadress",
      howCanWeHelp: "Hur kan vi hjälpa dig?",
      messagePlaceholder: "Berätta kort om ditt juridiska ärende.",
      sendMessage: "Skicka meddelande",
      sending: "Skickar…",
      received: "Meddelande mottaget",
      receivedDesc:
        "Tack, {name}. En medarbetare hör av sig inom en arbetsdag.",
      sendAnother: "Skicka ett nytt meddelande",
      errName: "Ange ditt namn.",
      errEmail: "Ange din e-post.",
      errEmailValid: "Ange en giltig e-postadress.",
      errMessage: "Skriv ett meddelande.",
    },
    footer: {
      tagline:
        "Strategisk, resultatinriktad juridisk rådgivning för privatpersoner och företag.",
      explore: "Utforska",
      legalHeading: "Juridiskt",
      contact: "Kontakt",
      rights: "Alla rättigheter förbehållna.",
      advertising:
        "Marknadsföring för juristbyrå. Tidigare resultat garanterar inte ett liknande utfall.",
    },
    legal: {
      privacyTitle: "Integritetspolicy",
      termsTitle: "Användarvillkor",
      updated: "Senast uppdaterad: januari 2026",
      privacy: {
        intro:
          "Invictus Law (”vi”, ”oss”) respekterar din integritet. Denna policy förklarar vilka uppgifter vi samlar in, hur vi använder dem och vilka val du har. Sidan tillhandahålls i demonstrationssyfte och bör granskas av jurist innan publicering.",
        sections: [
          {
            h: "Uppgifter vi samlar in",
            body: "Vi samlar in uppgifter som du lämnar direkt — såsom namn, e-post, telefonnummer och uppgifter om ditt ärende — när du bokar en konsultation eller kontaktar oss. Vi kan även samla in begränsad teknisk information automatiskt, till exempel webbläsartyp och vilka sidor du besöker, för att förbättra webbplatsen.",
            list: [] as string[],
          },
          {
            h: "Hur vi använder dina uppgifter",
            body: "",
            list: [
              "För att besvara dina förfrågningar och boka konsultationer.",
              "För att tillhandahålla och förbättra våra juridiska tjänster.",
              "För att uppfylla våra rättsliga och yrkesmässiga skyldigheter.",
            ],
          },
          {
            h: "Hur vi skyddar dina uppgifter",
            body: "Vi vidtar rimliga administrativa, tekniska och fysiska åtgärder för att skydda dina uppgifter. Meddelanden som skickas via webbplatsen är konfidentiella men skapar inte i sig något klientförhållande.",
            list: [],
          },
          {
            h: "Dina val",
            body: "Du kan begära tillgång till, rättelse av eller radering av de personuppgifter du lämnat till oss genom att kontakta oss på kontakt@invictuslaw.se.",
            list: [],
          },
          {
            h: "Kontakt",
            body: "Frågor om denna policy kan ställas till kontakt@invictuslaw.se.",
            list: [],
          },
        ],
      },
      terms: {
        intro:
          "Dessa användarvillkor reglerar din användning av Invictus Laws webbplats. Genom att använda webbplatsen godkänner du villkoren. Sidan tillhandahålls i demonstrationssyfte och bör granskas av jurist innan publicering.",
        sections: [
          {
            h: "Ingen juridisk rådgivning",
            body: "Innehållet på denna webbplats tillhandahålls endast i allmänt informationssyfte och utgör inte juridisk rådgivning. Du bör inte agera eller avstå från att agera baserat på innehållet utan att söka professionell rådgivning.",
            list: [] as string[],
          },
          {
            h: "Inget klientförhållande",
            body: "Att kontakta oss via webbplatsen, inklusive att boka en konsultation eller skicka ett formulär, skapar inte något klientförhållande. Ett sådant förhållande uppstår först genom ett undertecknat uppdragsavtal.",
            list: [],
          },
          {
            h: "Användning av webbplatsen",
            body: "",
            list: [
              "Du förbinder dig att använda webbplatsen lagligt och i god tro.",
              "Du förbinder dig att inte försöka störa eller äventyra webbplatsens säkerhet.",
              "Allt innehåll, varumärke och design tillhör Invictus Law.",
            ],
          },
          {
            h: "Marknadsföring för juristbyrå",
            body: "Denna webbplats kan betraktas som marknadsföring för juristbyrå i vissa jurisdiktioner. Tidigare resultat garanterar inte ett liknande utfall.",
            list: [],
          },
          {
            h: "Kontakt",
            body: "Frågor om dessa villkor kan ställas till kontakt@invictuslaw.se.",
            list: [],
          },
        ],
      },
    },
  },

  en: {
    locale: "en-US",
    nav: {
      home: "Home",
      about: "About",
      services: "Practice Areas",
      consultation: "Consultation",
      priser: "Pricing",
      blog: "Blog",
      contact: "Contact",
    },
    a11y: {
      skip: "Skip to content",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      switchToEn: "Switch to English",
      switchToSv: "Switch to Swedish",
    },
    common: {
      bookConsultation: "Book Consultation",
      learnMore: "Learn More",
      readMore: "Read more",
    },
    hero: {
      eyebrow: "Invictus Law · Attorneys & Counselors",
      line1: "Justice Without",
      line2: "Compromise",
      sub: "Experienced legal representation for individuals and businesses seeking strategic, effective, and results-driven counsel in administrative law.",
      ctaPrimary: "Schedule Consultation",
      ctaSecondary: "Learn More",
    },
    home: {
      practiceEyebrow: "Practice Areas",
      practiceTitle: "Counsel across the matters that affect you",
      practiceIntro:
        "Whatever the matter, we bring specialist expertise and an unwavering commitment to your goals.",
      whyEyebrow: "Why Invictus Law",
      whyTitle: "A firm built on results",
      whyIntro:
        "We measure success by the outcomes we secure and the trust we earn — one client at a time.",
      testEyebrow: "Client Testimonials",
      testTitle: "Trusted in the moments that matter most",
    },
    cta: {
      title: "Schedule Your Free Consultation",
      subtitle:
        "Tell us about your situation. We will review your matter and outline a clear path forward — no obligation.",
      button: "Book Consultation",
    },
    about: {
      eyebrow: "About Us",
      title: "We put people at the centre of the law",
      intro:
        "At Invictus Law we are proud to be led by one of the industry's most versatile and experienced lawyers. Our Chief Legal Counsel combines legal sharpness with deep medical expertise and many years of experience across the public sector, private business, and law firm practice.",
      sections: [
        {
          heading: "A solid legal foundation",
          paragraphs: [
            "Our Chief Legal Counsel, Gabriella Levin, is a trained lawyer and holds a Master of Laws (LL.M.) from Lund University with a distinctive specialisation in medical law, individual employment law, family law, and social law. Her broad legal grounding is combined with a Bachelor of Social Work from Malmö University — an interdisciplinary profile that shapes her entire professional approach.",
          ],
        },
        {
          heading: "Experience across the full legal chain",
          paragraphs: [
            "Her journey began long before law school — as an assistant nurse with Region Skåne and a team leader in the personal-assistance industry. The clinical insight and care from that time have stayed with her throughout her career.",
            "After serving as an asylum case officer at the Swedish Migration Agency and as an associate lawyer at Advokatbyrån Limhamnsjuristen AB, her career took off as in-house counsel at Care AB. She then held roles as a lawyer at Västra Hamnens Juristbyrå, and as IT lead and Chief Legal Counsel at Juristbyrån Dockan AB — before leading the legal practice as Chief Legal Counsel at Invictus Law from May 2024.",
          ],
        },
        {
          heading: "How she helps you",
          paragraphs: [
            "With more than a decade of legal experience — plus a background in healthcare and social work — our Chief Legal Counsel understands the person behind every matter. Whether you need help with medical-law questions, employment disputes, family-law issues, or social-law challenges, you get an advisor who sees the whole picture.",
          ],
        },
      ],
      quote:
        "The law should be understandable, accessible, and make a difference — not create more problems.",
      closing:
        "Want to know more about how your particular matter can be handled? Get in touch and we'll tell you more.",
      ledordEyebrow: "Our values",
      ledordQuote: "Our guiding values are quality, personal commitment, and security.",
      ledord: ["Quality", "Personal commitment", "Security"],
      ctaTitle: "Would you like to discuss your matter?",
      ctaSubtitle: "Book a free consultation with us today.",
    },
    services: {
      eyebrow: "Practice Areas",
      title: "Specialists in administrative law",
      intro:
        "Licensing matters, personal assistance and assistance compensation, social insurance law, social law, and appeals of authority decisions.",
      ctaTitle: "Need help with your matter?",
      ctaSubtitle:
        "Get in touch with us — specialists in administrative law.",
    },
    priser: {
      eyebrow: "Pricing",
      title: "What does legal advice cost at Invictus Law?",
      intro: "Help with costs for legal advice.",
      rateEyebrow: "Legal aid rate 2026",
      rateDesc:
        "Invictus Law follows the state-established legal aid rate, which changes every year.",
      rateValue: "2 032 kr",
      perHour: "/ hour",
      lead: "Invictus Law follows the state-established legal aid rate, which changes every year. For 2026 it is SEK 2,032 per hour.",
      paragraphs: [
        "For companies we offer individual pricing depending on the scope of the matter.",
        "When we act as public counsel in LVU and LVM cases, it is free of charge for you who need our help. If you are in an LVU process, you are entitled to public counsel to assist with legal help, and the court pays the cost that arises for the public counsel.",
        "Children are also assigned their own public counsel, whose cost is paid by the court.",
        "If you have no home insurance, or if your insurance does not cover the dispute, it may be possible to apply for legal aid. Legal aid means the state covers part of the cost of your legal help and you pay only a portion yourself. The portion you pay depends on your income. To be granted legal aid you must first pay an advice fee corresponding to one hour of advice under the legal aid rate, which varies from year to year as above.",
        "In some cases you may receive compensation for part of your legal costs through your home insurance. This is called legal protection (rättsskydd). Legal protection means you pay a deductible, usually between 20 and 30 percent of the total cost of your legal help, and the insurer covers the remaining part.",
        "Legal protection usually applies to disputes in the District Court and not to disputes in the Administrative Court — that is, not to disputes between an individual and a municipality or authority. It is therefore important to check the conditions your particular home insurance sets for legal protection.",
        "It can be difficult to obtain cost assistance in the form of legal protection or legal aid in court disputes against authorities and when applying for a benefit or support. We at Juridisk Assistans, however, want to make it easier for you and will help you apply for legal protection or legal aid if we judge that you may be granted such help.",
        "To be granted legal aid you must first pay an advice fee corresponding to one hour of advice under the legal aid rate, which varies from year to year as above. It is very uncommon for individuals to be granted legal aid in court proceedings against an authority.",
      ],
      ctaTitle: "Unsure what applies in your case?",
      ctaSubtitle:
        "We will help you apply for legal protection or legal aid if we judge that you may be granted such help.",
    },
    blog: {
      eyebrow: "Blog",
      title: "News and legal insights",
      intro: "Guides, updates, and analysis from Invictus Law.",
      empty: "No articles published yet. Check back soon.",
      back: "Back to blog",
    },
    consultation: {
      eyebrow: "Book a consultation",
      title: "Book your free 30-minute consultation",
      intro:
        "Three quick steps. Choose your service, pick a time that suits you, and share a few details — we'll take it from there.",
    },
    booking: {
      steps: ["Practice area", "Date & Time", "Your details"],
      step1Title: "What can we help you with?",
      practiceAreaLabel: "Practice area",
      formatLabel: "Consultation format",
      types: {
        personal: {
          label: "Personal Meeting",
          duration: "30 min · In person",
          desc: "Meet your attorney at our office.",
        },
        video: {
          label: "Video Consultation",
          duration: "30 min · Video call",
          desc: "A secure video call from anywhere.",
        },
        phone: {
          label: "Telephone Consultation",
          duration: "30 min · Phone",
          desc: "A focused call at your scheduled time.",
        },
      },
      step2Title: "Choose a date & time",
      availableTimes: "Available times",
      selectDate: "Select a date to see available times",
      step3Title: "Your details",
      fullName: "Full name",
      phone: "Phone number",
      email: "Email address",
      matterLabel: "Briefly describe your matter",
      matterOptional: "(optional)",
      matterPlaceholder:
        "Share any details that will help us prepare for your consultation.",
      agreement:
        "By submitting, you agree to be contacted regarding your consultation. Submitting this form does not create an attorney–client relationship.",
      back: "Back",
      continue: "Continue",
      booking: "Booking…",
      confirm: "Confirm Booking",
      summaryTitle: "Your consultation",
      fmtService: "Practice area",
      fmtFormat: "Format",
      fmtDate: "Date",
      fmtTime: "Time",
      freeTitle: "Free 30-minute consultation",
      freeDesc:
        "No obligation. We'll review your matter and outline a clear path forward.",
      errName: "Please enter your name.",
      errEmail: "Please enter your email.",
      errEmailValid: "Please enter a valid email address.",
      errPhone: "Please enter a phone number.",
      errSlotTaken: "That time was just booked by someone else. Please choose another time.",
      errGeneric: "Could not complete the booking. Please try again.",
      confTitle: "Your consultation is booked",
      confThanks:
        "Thank you, {name}. A confirmation has been sent to {email}. Let us know if you don't see it within a few minutes.",
      location: "Location",
      reference: "Reference",
      returnHome: "Return Home",
      exploreServices: "Explore Practice Areas",
    },
    calendar: {
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ],
      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      note: "Weekdays only. All times shown in your local timezone.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's start the conversation",
      intro:
        "Whether you have a question or are ready to discuss your matter, our team is here to help.",
      getInTouch: "Get in touch",
      getInTouchDesc:
        "Reach us directly or send a message using the form. We respond to every inquiry within one business day.",
      office: "Office",
      phone: "Phone",
      email: "Email",
      hours: "Hours",
      hoursVal: ["Monday – Friday", "9:00 AM – 6:00 PM"],
      mapTitle: "Map showing the office location",
      formName: "Full name",
      formPhone: "Phone (optional)",
      formEmail: "Email address",
      howCanWeHelp: "How can we help?",
      messagePlaceholder: "Tell us a little about your legal matter.",
      sendMessage: "Send Message",
      sending: "Sending…",
      received: "Message received",
      receivedDesc:
        "Thank you, {name}. A member of our team will be in touch within one business day.",
      sendAnother: "Send another message",
      errName: "Please enter your name.",
      errEmail: "Please enter your email.",
      errEmailValid: "Please enter a valid email.",
      errMessage: "Please enter a message.",
    },
    footer: {
      tagline:
        "Strategic, results-driven legal counsel for individuals and businesses.",
      explore: "Explore",
      legalHeading: "Legal",
      contact: "Contact",
      rights: "All rights reserved.",
      advertising:
        "Attorney advertising. Prior results do not guarantee a similar outcome.",
    },
    legal: {
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of Service",
      updated: "Last updated: January 2026",
      privacy: {
        intro:
          "Invictus Law (“we”, “us”) respects your privacy. This policy explains what information we collect, how we use it, and the choices you have. This page is provided for demonstration purposes and should be reviewed by counsel before publication.",
        sections: [
          {
            h: "Information We Collect",
            body: "We collect information you provide directly — such as your name, email, phone number, and the details of your matter — when you book a consultation or contact us. We may also collect limited technical information automatically, such as your browser type and the pages you visit, to improve our website.",
            list: [] as string[],
          },
          {
            h: "How We Use Your Information",
            body: "",
            list: [
              "To respond to your inquiries and schedule consultations.",
              "To provide and improve our legal services.",
              "To comply with our legal and professional obligations.",
            ],
          },
          {
            h: "How We Protect Your Information",
            body: "We maintain reasonable administrative, technical, and physical safeguards designed to protect your information. Communications submitted through this website are confidential but do not, by themselves, create an attorney–client relationship.",
            list: [],
          },
          {
            h: "Your Choices",
            body: "You may request access to, correction of, or deletion of the personal information you have provided to us by contacting us at kontakt@invictuslaw.se.",
            list: [],
          },
          {
            h: "Contact",
            body: "Questions about this policy may be directed to kontakt@invictuslaw.se.",
            list: [],
          },
        ],
      },
      terms: {
        intro:
          "These Terms of Service govern your use of the Invictus Law website. By using this site, you agree to these terms. This page is provided for demonstration purposes and should be reviewed by counsel before publication.",
        sections: [
          {
            h: "No Legal Advice",
            body: "The content on this website is provided for general informational purposes only and does not constitute legal advice. You should not act or refrain from acting on the basis of any content here without seeking professional counsel.",
            list: [] as string[],
          },
          {
            h: "No Attorney–Client Relationship",
            body: "Contacting us through this website, including booking a consultation or submitting a form, does not create an attorney–client relationship. Such a relationship is formed only by a signed engagement agreement.",
            list: [],
          },
          {
            h: "Use of the Site",
            body: "",
            list: [
              "You agree to use this website lawfully and in good faith.",
              "You agree not to attempt to disrupt or compromise the security of the site.",
              "All content, branding, and design are the property of Invictus Law.",
            ],
          },
          {
            h: "Attorney Advertising",
            body: "This website may be considered attorney advertising in some jurisdictions. Prior results do not guarantee a similar outcome.",
            list: [],
          },
          {
            h: "Contact",
            body: "Questions about these terms may be directed to kontakt@invictuslaw.se.",
            list: [],
          },
        ],
      },
    },
  },
};

export type Dict = (typeof dictionary)["sv"];

/** Replace {name}/{email} placeholders in a template string. */
export function fmt(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
