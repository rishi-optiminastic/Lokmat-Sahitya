type BilingualText = { en: string; mr: string };

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const FALLBACK_PROFILE: BilingualText = {
  en: "Jury member for the Lokmat Sahitya Award.",
  mr: "लोकमत साहित्य पुरस्काराचे ज्युरी सदस्य.",
};

const JURY_PROFILE_MAP: Record<string, BilingualText> = {
  // ── 2026 Jury ──────────────────────────────────────────────────────────────
  "vijay baviskar": {
    en: "Group Editor, Lokmat Media Group. A senior journalist with decades of leadership in Marathi print journalism and editorial vision.",
    mr: "लोकमत मीडिया ग्रुपचे ग्रुप एडिटर. मराठी पत्रकारितेतील अनेक दशकांचा संपादकीय अनुभव असलेले वरिष्ठ पत्रकार.",
  },
  "atul kulkarni": {
    en: "Editor, Mumbai Lokmat. Brings deep editorial insight and a keen literary sensibility to the jury proceedings.",
    mr: "संपादक, मुंबई लोकमत. संपादकीय अनुभव आणि साहित्यिक संवेदनशीलतेने ज्युरी कार्यात सहभाग.",
  },
  "anjali joshi": {
    en: "Noted Marathi author recognized for her contributions to biographical and creative non-fiction writing.",
    mr: "विख्यात मराठी लेखिका; चरित्रात्मक आणि ललित गद्यलेखनातील महत्त्वपूर्ण योगदानासाठी परिचित.",
  },
  "datta balsaraf": {
    en: "Senior Marathi poet and literary critic, celebrated for his nuanced reading of poetry, fiction, and contemporary Marathi prose.",
    mr: "ज्येष्ठ मराठी कवी आणि साहित्यसमीक्षक; कविता, कथा आणि समकालीन मराठी गद्याच्या सूक्ष्म आकलनासाठी प्रसिद्ध.",
  },
  "sadanand more": {
    en: "Eminent Marathi scholar, philosopher, and poet known for incisive literary criticism and deep engagement with Marathi cultural heritage.",
    mr: "ज्येष्ठ मराठी विचारवंत, कवी आणि साहित्यसमीक्षक; मराठी सांस्कृतिक वारशाशी खोल नाते असलेले अभ्यासक.",
  },
  "dr sadanand more": {
    en: "Eminent Marathi scholar, philosopher, and poet known for incisive literary criticism and deep engagement with Marathi cultural heritage.",
    mr: "ज्येष्ठ मराठी विचारवंत, कवी आणि साहित्यसमीक्षक; मराठी सांस्कृतिक वारशाशी खोल नाते असलेले अभ्यासक.",
  },
  "sangram gaikwad": {
    en: "Journalist and writer known for sharp social and political commentary and sustained engagement with contemporary Marathi writing.",
    mr: "पत्रकार आणि लेखक; सामाजिक-राजकीय भाष्य आणि समकालीन मराठी साहित्यातील सक्रिय सहभागासाठी ओळखले जातात.",
  },
  "santosh shenaie": {
    en: "Composer, music director, and a distinguished voice in Marathi performing arts and cultural life.",
    mr: "संगीत दिग्दर्शक आणि मराठी सांस्कृतिक विश्वातील प्रतिष्ठित व्यक्तिमत्त्व.",
  },

  // ── Earlier editions ────────────────────────────────────────────────────────
  "aasaram lomte": {
    en: "Senior Marathi poet and literary figure, known for his contribution to Dalit and progressive literature.",
    mr: "ज्येष्ठ मराठी कवी; दलित आणि प्रगतिशील साहित्यातील योगदानासाठी प्रसिद्ध.",
  },
  "aruna dhere": {
    en: "Poet and literary scholar, recognized for her sensitive poetry and research on folk and classical Marathi literature.",
    mr: "कवयित्री आणि साहित्यसंशोधक; संवेदनशील काव्य आणि लोकसाहित्य संशोधनासाठी ओळखल्या जातात.",
  },
  "vaibhav mangle": {
    en: "Versatile actor and cultural personality, widely respected for his contribution to Marathi stage and performing arts.",
    mr: "अभिनेते आणि सांस्कृतिक व्यक्तिमत्त्व; मराठी रंगभूमी आणि कला क्षेत्रातील योगदानासाठी सन्मानित.",
  },
  "vandana atre": {
    en: "Journalist and literary personality contributing critical perspective to Marathi fiction and creative writing evaluation.",
    mr: "पत्रकार आणि साहित्यिक व्यक्तिमत्त्व; मराठी साहित्याच्या समीक्षात्मक मूल्यमापनात सक्रिय.",
  },
  "suhas kirloskar": {
    en: "Writer and cultural figure known for his engagement with Marathi literary and theatrical traditions.",
    mr: "लेखक आणि सांस्कृतिक व्यक्तिमत्त्व; मराठी साहित्य आणि नाट्यपरंपरेशी सक्रिय संबंध.",
  },
  "aparna padgaonkar": {
    en: "Poet and literary figure, carrying forward the legacy of Marathi poetry and engaged in critical dialogue on contemporary writing.",
    mr: "कवयित्री आणि साहित्यिक व्यक्तिमत्त्व; मराठी काव्यपरंपरेची वारस आणि समकालीन लेखनावर सक्रिय चर्चाकार.",
  },
};

export function getJuryProfile(name: string, locale: string): string {
  const normalized = normalizeName(name);
  const lang = locale === "mr" ? "mr" : "en";
  return JURY_PROFILE_MAP[normalized]?.[lang] ?? FALLBACK_PROFILE[lang];
}
