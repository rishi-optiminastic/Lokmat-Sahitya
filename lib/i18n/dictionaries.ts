import type { Locale } from "./config";

export type Dictionary = {
  meta: { title: string; description: string };
  metaInk: { title: string; description: string };
  brand: { lokmat: string; sahitya: string };
  nav: { years: string; gallery: string; video: string };
  designSwitch: { toInk: string; toAurora: string };
  home: { eyebrow: string; title: string; subtitle: string };
  footer: string;
  carousel: {
    ariaCarousel: string;
    prev: string;
    next: string;
    indicators: string;
    slideAria: string;
    subtitles: string[];
    slides: { title: string; subtitle: string }[];
  };
  yearsBar: { aria: string; label: string };
  edition: {
    awardeesHeading: string;
    juryHeading: string;
    juryCaption: string;
    bookLabel: string;
    categoryLabel: string;
    portraitAlt: string;
    bookAlt: string;
    juryEmpty: string;
  };
  photoFeature: { title: string; body: string };
  video: {
    title: string;
    body: string;
    play: string;
    close: string;
    watchOnYoutube: string;
    items: { title: string; detail: string }[];
  };
  gallery: { title: string; lightboxClose: string; aria: string };
};

const en: Dictionary = {
  meta: {
    title: "Lokmat Sahitya — Literature Archive",
    description:
      "Lokmat Sahitya — award years, awardees, jury, video moments, and festival photography in one calm, reader-first archive.",
  },
  metaInk: {
    title: "Lokmat Sahitya — Magazine",
    description:
      "Magazine layout: split hero, vertical year spine, alternating award spreads, bento video grid, and horizontal gallery strip.",
  },
  brand: {
    lokmat: "Lokmat",
    sahitya: "Sahitya",
  },
  nav: {
    years: "Years",
    gallery: "Gallery",
    video: "Video",
  },
  designSwitch: {
    toInk: "Magazine →",
    toAurora: "Aurora →",
  },
  home: {
    eyebrow: "Heritage · Marathi literature",
    title: "Where every award year finds its place",
    subtitle:
      "Browse editions from 2023 to 2026 — book covers, authors, jury portraits, and ceremony light — with clarity and room to breathe.",
  },
  footer: "© Lokmat Sahitya. Crafted for readers everywhere.",
  carousel: {
    ariaCarousel: "Featured images from the Sahitya archive",
    prev: "Previous slide",
    next: "Next slide",
    indicators: "Slide indicators",
    slideAria: "Slide {n}",
    subtitles: [
      "Photo feature",
      "Literary legacy",
      "2025 awardee",
      "2023 awardee",
      "2026 spotlight",
    ],
    slides: [
      {
        title: "Vijay Darda",
        subtitle: "Chairman, Lokmat Media Group",
      },
      {
        title: "Rajendra Darda",
        subtitle: "Editor-in-Chief, Lokmat",
      },
      {
        title: "Devendra Darda",
        subtitle: "Executive Director, Lokmat Media Group",
      },
      {
        title: "Gadkari Rangayatan (2023)",
        subtitle: "A packed auditorium of literature enthusiasts at Gadkari Rangayatan.",
      },
      {
        title: "Korum Mall Event (2025)",
        subtitle: "At the literature festival, a book exhibition was inaugurated at Korum Mall on Friday by senior poet Ashok Naygaonkar.",
      },
      {
        title: "2025 Award Felicitation",
        subtitle: "Lokmat Editor-in-Chief Rajendra Darda felicitating senior actress Chinmayee Sumeet for her efforts in supporting Marathi schools.",
      },
      {
        title: "Gadkari Rangayatan, Thane (2023)",
        subtitle: "Jnanpith award-winning senior writer Bhalchandra Nemade was honored with the Lifetime Achievement Award.",
      },
      {
        title: "Gadkari Rangayatan (2024)",
        subtitle: "Senior writer, publisher, and thinker Ramdas Bhatkal was honored with the Lifetime Achievement Award.",
      },
      {
        title: "Tip Top Plaza, Thane (2025)",
        subtitle: "The Lokmat Literary Awards ceremony was held grandly in Thane. Senior writer Ranganath Pathare was honored with the Lifetime Achievement Award.",
      },
    ],
  },
  yearsBar: {
    aria: "Jump to award year",
    label: "Award years",
  },
  edition: {
    awardeesHeading: "Awardees & recognised works",
    juryHeading: "Jury",
    juryCaption:
      "Readers and practitioners who shaped the honours for this year.",
    bookLabel: "Awarded work",
    categoryLabel: "Category",
    portraitAlt: "Portrait — {name}",
    bookAlt: "Book — {title}",
    juryEmpty: "Jury portraits are not in the archive folder for this year yet.",
  },
  photoFeature: {
    title: "Moments from the festival",
    body: "Portraits, patrons, and voices — a quiet portfolio from the floor.",
  },
  video: {
    title: "Video",
    body: "Ceremony highlights, conversations, and readings — tap to play.",
    play: "Play video",
    close: "Close",
    watchOnYoutube: "Watch on YouTube",
    items: [
      { title: "Highlights", detail: "Ceremony & stage" },
      { title: "Conversations", detail: "Authors in focus" },
      { title: "Readings", detail: "Voices from the event" },
    ],
  },
  gallery: {
    title: "Photo gallery",
    lightboxClose: "Close viewer",
    aria: "Festival photography",
  },
};

const mr: Dictionary = {
  meta: {
    title: "लोकमत साहित्य — साहित्य संग्रह",
    description:
      "लोकमत साहित्य — पुरस्कार वर्षे, विजेते, ज्युरी, व्हिडिओ क्षण आणि छायाचित्र — एका सुव्यवस्थित डिजिटल अनुभवात.",
  },
  metaInk: {
    title: "लोकमत साहित्य — मासिक मांडणी",
    description:
      "विभाजित हिरो, उभी वर्ष रेल, पर्यायी स्प्रेड, व्हिडिओ ग्रिड आणि फिल्मस्ट्रिप गॅलरी — तोच संग्रह, नवा रचनात्मक अनुभव.",
  },
  brand: {
    lokmat: "लोकमत",
    sahitya: "साहित्य",
  },
  nav: {
    years: "वर्षे",
    gallery: "गॅलरी",
    video: "व्हिडिओ",
  },
  designSwitch: {
    toInk: "मासिक मांडणी →",
    toAurora: "ऑरोरा →",
  },
  home: {
    eyebrow: "वारसा · मराठी साहित्य",
    title: "प्रत्येक पुरस्कार वर्षासाठी एक विश्रांतीस्थान",
    subtitle:
      "२०२३ ते २०२६ पर्यंतचे अंक — पुस्तके, लेखक, ज्युरीच्या प्रतिमा आणि सोहळ्यातील क्षण — स्पष्टपणे व सहज वाचता येतील अशा मांडणीत.",
  },
  footer: "© लोकमत साहित्य. वाचकांसाठी.",
  carousel: {
    ariaCarousel: "साहित्य संग्रहातील वैशिष्ट्यपूर्ण प्रतिमा",
    prev: "मागील स्लाइड",
    next: "पुढील स्लाइड",
    indicators: "स्लाइड निर्देशक",
    slideAria: "स्लाइड {n}",
    subtitles: [
      "फोटो विशेष",
      "साहित्यिक वारसा",
      "२०२५ पुरस्कार विजेते",
      "२०२३ पुरस्कार विजेते",
      "२०२६ लक्षवेधी",
    ],
    slides: [
      {
        title: "विजय दर्डा",
        subtitle: "अध्यक्ष, लोकमत मीडिया ग्रुप",
      },
      {
        title: "राजेंद्र दर्डा",
        subtitle: "संपादक-प्रमुख, लोकमत",
      },
      {
        title: "देवेंद्र दर्डा",
        subtitle: "कार्यकारी संचालक, लोकमत मीडिया ग्रुप",
      },
      {
        title: "गडकरी रंगायतन (२०२३)",
        subtitle: "गडकरी रंगायतनमध्ये साहित्य रसिकांनी खच्चून भरलेले सभागृह.",
      },
      {
        title: "कोरम मॉल महोत्‍सव (२०२५)",
        subtitle: "लोकमत साहित्य पुरस्काराच्या निमित्ताने आयोजित साहित्य महोत्सवात शुक्रवारी कोरम मॉल येथे पुस्तक प्रदर्शनाचे उद्घाटन ज्येष्ठ कवी अशोक नायगांवकर यांच्या हस्ते झाले.",
      },
      {
        title: "२०२५ पुरस्कार सन्मान",
        subtitle: "मराठी शाळांसाठी लढा देणाऱ्या ज्येष्ठ अभिनेत्री चिन्मयी सुमीत यांचा सन्मान करताना लोकमतचे एडिटर इन चीफ राजेंद्र दर्डा.",
      },
      {
        title: "गडकरी रंगायतन, ठाणे (२०२३)",
        subtitle: "ज्ञानपीठ पुरस्कार विजेते ज्येष्ठ साहित्यिक भालचंद्र नेमाडे यांना जीवनगौरव पुरस्कार प्रदान केला.",
      },
      {
        title: "गडकरी रंगायतन (२०२४)",
        subtitle: "ज्येष्ठ लेखक, प्रकाशक, विचारवंत रामदास भटकळ यांचा जीवनगौरव पुरस्काराने सन्मान करण्यात आला.",
      },
      {
        title: "टिप टॉप प्लाझा, ठाणे (२०२५)",
        subtitle: "लोकमत साहित्य पुरस्कार सोहळा ठाण्यात दिमाखात संपन्न झाला. यावेळी ज्येष्ठ साहित्यिक रंगनाथ पठारे यांचा जीवनगौरव पुरस्काराने सन्मान करण्यात आला.",
      },
    ],
  },
  yearsBar: {
    aria: "पुरस्कार वर्ष निवडा",
    label: "पुरस्कार वर्षे",
  },
  edition: {
    awardeesHeading: "पुरस्कार विजेते व कृती",
    juryHeading: "ज्युरी",
    juryCaption: "या वर्षी निवड प्रक्रियेत सहभागी साहित्यिक व वाचक.",
    bookLabel: "पुरस्कृत कृति",
    categoryLabel: "श्रेणी",
    portraitAlt: "प्रतिमा — {name}",
    bookAlt: "पुस्तक — {title}",
    juryEmpty: "या वर्षासाठी ज्युरीच्या प्रतिमा अद्याप संग्रहात नाहीत.",
  },
  photoFeature: {
    title: "सोहळ्यातील क्षण",
    body: "प्रतिमा, पुरस्कर्ते आणि आवाज — रंगमंचाचा एक संयत चित्रसंच.",
  },
  video: {
    title: "व्हिडिओ",
    body: "सोहळा, मुलाखती आणि वाचने — पाहण्यासाठी टॅप करा.",
    play: "व्हिडिओ प्ले करा",
    close: "बंद करा",
    watchOnYoutube: "YouTube वर पाहा",
    items: [
      { title: "खास क्षण", detail: "सोहळा व रंगमंच" },
      { title: "संवाद", detail: "लेखक केंद्रित" },
      { title: "वाचने", detail: "कार्यक्रमातील आवाज" },
    ],
  },
  gallery: {
    title: "छायाचित्र गॅलरी",
    lightboxClose: "पाहणी बंद करा",
    aria: "सोहळ्याची छायाचित्रे",
  },
};

const map: Record<Locale, Dictionary> = { en, mr };

export function getDictionary(locale: Locale): Dictionary {
  return map[locale] ?? map.en;
}
