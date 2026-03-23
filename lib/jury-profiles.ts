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
  en: "Brief profile will be updated by Manoj Gadnis.",
  mr: "संक्षिप्त प्रोफाइल मनोज गाडणीस लवकरच अद्ययावत करतील.",
};

const JURY_PROFILE_MAP: Record<string, BilingualText> = {
  "vijay baviskar": {
    en: "Group Editor at Lokmat and a senior voice in editorial leadership.",
    mr: "लोकमतचे ग्रुप एडिटर आणि संपादकीय नेतृत्वातील वरिष्ठ व्यक्तिमत्त्व.",
  },
  "atul kulkarni": {
    en: "Jury member contributing literary and cultural perspective to selections.",
    mr: "निवड प्रक्रियेत साहित्यिक आणि सांस्कृतिक दृष्टीकोन देणारे ज्युरी सदस्य.",
  },
  "anjali joshi": {
    en: "Jury member engaged in evaluating contemporary Marathi writing.",
    mr: "समकालीन मराठी लेखनाचे मूल्यमापन करणाऱ्या ज्युरी सदस्य.",
  },
  "sadanand more": {
    en: "Senior scholar and jury member contributing critical reading insight.",
    mr: "तर्कशुद्ध वाचनदृष्टी देणारे ज्येष्ठ अभ्यासक आणि ज्युरी सदस्य.",
  },
  "dr sadanand more": {
    en: "Senior scholar and jury member contributing critical reading insight.",
    mr: "तर्कशुद्ध वाचनदृष्टी देणारे ज्येष्ठ अभ्यासक आणि ज्युरी सदस्य.",
  },
};

export function getJuryProfile(name: string, locale: string): string {
  const normalized = normalizeName(name);
  const lang = locale === "mr" ? "mr" : "en";
  return JURY_PROFILE_MAP[normalized]?.[lang] ?? FALLBACK_PROFILE[lang];
}
