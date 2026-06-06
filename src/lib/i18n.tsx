"use client";

/**
 * Swedish / English internationalization for Invictus Law.
 *
 * One dictionary holds every translatable UI string. LanguageProvider keeps the
 * active language in React state (persisted to localStorage, default Swedish)
 * and sets <html lang>. Components read strings with useT(); list content with
 * its own { sv, en } fields lives in content.ts.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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
        "Vi är specialiserade på juridiken kring personlig assistans, assistansersättning och övrig socialförsäkringsrätt, socialrätt och offentlig rätt.",
      p1: "Vi är specialiserade på juridiken kring personlig assistans, assistansersättning samt övrig socialförsäkringsrätt, socialrätt och offentlig rätt. Indragningar, minskningar och återkrav av tidigare beviljade myndighetsbeslut är ärenden vi arbetar mycket med. Vi arbetar även med socialrätt i form av beslut om stöd enligt Socialtjänstlagen, SoL.",
      p2: "Vi har stor vana av att överklaga Försäkringskassans beslut och andra myndighetsbeslut.",
      p3: "Vi sätter människan i centrum för juridiken och vi finner stor tillfredsställelse i att arbeta med juridiska frågor som berör.",
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
      title: "Vad kostar juridisk rådgivning hos Juridisk Assistans?",
      intro: "Kostnadshjälp vid juridisk rådgivning.",
      rateEyebrow: "Rättshjälpstaxan 2023",
      rateDesc:
        "Juridisk Assistans följer den av staten fastställda rättshjälpstaxan som ändras varje år.",
      rateValue: "1 845 kr",
      perHour: "/ timme",
      lead: "Juridisk Assistans följer den av staten fastställda rättshjälpstaxan som ändras varje år. För år 2023 är den 1 845 kr per timme.",
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
      confTitle: "Din konsultation är bokad",
      confThanks:
        "Tack, {name}. En bekräftelse har registrerats och vårt team kontaktar dig på {email} för att bekräfta detaljerna.",
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
            body: "Du kan begära tillgång till, rättelse av eller radering av de personuppgifter du lämnat till oss genom att kontakta oss på contact@invictuslaw.com.",
            list: [],
          },
          {
            h: "Kontakt",
            body: "Frågor om denna policy kan ställas till contact@invictuslaw.com.",
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
            body: "Frågor om dessa villkor kan ställas till contact@invictuslaw.com.",
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
        "We specialize in the law surrounding personal assistance, assistance compensation, and other social insurance law, social law, and public law.",
      p1: "We specialize in the law surrounding personal assistance, assistance compensation, and other social insurance law, social law, and public law. Withdrawals, reductions, and repayment claims relating to previously granted authority decisions are matters we work with extensively. We also handle social law in the form of support decisions under the Social Services Act (SoL).",
      p2: "We have extensive experience appealing decisions from Försäkringskassan (the Swedish Social Insurance Agency) and other authorities.",
      p3: "We put people at the centre of the law, and we find great satisfaction in working with legal matters that truly matter.",
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
      title: "What does legal advice cost at Juridisk Assistans?",
      intro: "Help with costs for legal advice.",
      rateEyebrow: "Legal aid rate 2023",
      rateDesc:
        "Juridisk Assistans follows the state-established legal aid rate, which changes every year.",
      rateValue: "1 845 kr",
      perHour: "/ hour",
      lead: "Juridisk Assistans follows the state-established legal aid rate, which changes every year. For 2023 it is SEK 1,845 per hour.",
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
      confTitle: "Your consultation is booked",
      confThanks:
        "Thank you, {name}. A confirmation has been recorded and our team will reach out to {email} to confirm the details.",
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
            body: "You may request access to, correction of, or deletion of the personal information you have provided to us by contacting us at contact@invictuslaw.com.",
            list: [],
          },
          {
            h: "Contact",
            body: "Questions about this policy may be directed to contact@invictuslaw.com.",
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
            body: "Questions about these terms may be directed to contact@invictuslaw.com.",
            list: [],
          },
        ],
      },
    },
  },
} as const;

export type Dict = (typeof dictionary)["sv"];

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sv");

  // One-time hydration of the saved language after mount.
  useEffect(() => {
    const saved = window.localStorage.getItem("invictus_lang") as Lang | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "sv" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("invictus_lang", l);
  }, []);

  const value: Ctx = { lang, setLang, t: dictionary[lang] as Dict };
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export function useT(): Dict {
  return useLang().t;
}

/** Replace {name}/{email} placeholders in a template string. */
export function fmt(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
