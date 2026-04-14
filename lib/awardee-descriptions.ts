/**
 * Award category and citation text for each awardee, keyed by `year:normalizedAuthorName`.
 * Normalised key = author folder name with underscores → spaces, lower-cased.
 * Supported for 2026 and forward; older years return undefined (no description shown).
 */
export type AwardeeDetail = {
  category: { en: string; mr: string };
  description: { en: string; mr: string };
};

export const AWARDEE_DETAILS: Record<string, AwardeeDetail> = {
  // ── 2026 ──────────────────────────────────────────────────────────────────────

  "2026:shama bhate": {
    category: { en: "Autobiography", mr: "आत्मकथन" },
    description: {
      mr: "नृत्य हाच श्वास, नृत्य हाच प्राण. तोच मार्ग आणि तोच एक ध्यास... असणाऱ्या कथक नृत्यांगना शमा भाटे. त्यांच्या ध्यासातून उभा राहिलेला जीवनप्रवास आपल्या \"नृत्यमय जग... नर्तनाचा धर्म\" या आत्मकथनातून वाचकांच्या भेटीला आला आहे. नृत्यतपस्येतून देश-विदेशात आपली नाममुद्रा कोरलेल्या या श्रेष्ठ कलावतीच्या प्रगल्भ व नर्मविनोदी शैलीतून ही गाथा वाचणं म्हणजे आपली रसिकता समृद्ध करणं आहे. म्हणूनच या आत्मकथनाला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "Shama Bhate is a Kathak dancer for whom dance is breath, life, and the only devotion. Her autobiography \"Nrityamay Jag... Nartanaacha Dharm\" traces the journey shaped by that singular passion. Reading this narrative — rich with wit and wisdom from one who has etched her name across India and the world through the tapas of dance — is an enriching experience for every art lover.",
    },
  },

  "2026:dr milind kulkarni": {
    category: { en: "Creative Writing", mr: "ललित लेखन" },
    description: {
      mr: "कोकणी माणसाच्या सानिध्यात अनेक वर्षे जवळून काम करणाऱ्या डॉ. मिलिंद कुलकर्णी यांनी कोकणी माणसाचं अंतरंग अतिशय खुमासदार शब्दांत \"मी कोकणचो डॉक्टर\" या पुस्तकातून वाचकांच्या समोर मांडलं आहे. वरकरणी हसवणाऱ्या पण कोकणी माणसांच्या व्यथा-वेदना मांडणारं हे पुस्तक वाचकांना अंतर्मुख करतं. अधून मधून कोकणी बोलीभाषा वाचनाची रंगत आणखी वाढवते. म्हणूनच या ललित लेखनाला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "Dr. Milind Kulkarni, who has worked intimately among Konkani communities for many years, presents the inner world of Konkani life in his delightful book \"Mi Konkaancho Doctor.\" The book draws laughter on the surface while poignantly capturing the pains and sorrows beneath — prompting deep reflection in every reader. Sprinklings of Konkani dialect add further flavour to the prose.",
    },
  },

  "2026:dr medha purav samant": {
    category: { en: "Institutional Biography", mr: "संस्थात्मक चरित्र" },
    description: {
      mr: "डॉ. मेधा पुरव सामंत यांनी तीस वर्षांपूर्वी एका छोट्या खोलीतून अन्नपूर्णा परिवाराची स्थापना केली. आज या परिवारानं पुण्या-मुंबईतल्या सव्वा लाख कष्टकरी महिलांना कवेत घेतलं आहे. \"आम्ही स्वयंपूर्णा\" या त्यांच्या संस्थात्मक चरित्रातून त्यांची ही संघर्षयात्रा उलगडली आहे. संस्था चालू केल्यानंतर त्यांनी घेतलेले कष्ट, आलेली आव्हानं, मिळालेली मदत, पुढे जाण्याचा ध्यास हे सारं काही प्रेरणादायी आहे. म्हणूनच या संस्थात्मक चरित्राला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "Dr. Medha Purav Samant founded the Annapurna Parivar from a single small room thirty years ago. Today the organisation embraces over 1.25 lakh working women across Pune and Mumbai. \"Amhi Swayampurna\" unfolds this journey of struggle — the hardships faced, challenges met, support received, and the relentless will to forge ahead. An uplifting story of collective empowerment.",
    },
  },

  "2026:vidhyadhar anaskar": {
    category: { en: "Special Writing", mr: "विशेष लेखन" },
    description: {
      mr: "बँका, बँकांचे व्यवहार, रिझर्व्ह बँकेचं कामकाज असे विषय आले की ते कायम मराठी माणसाला गुंतागुंतीचे वाटतात. मात्र, असे विषय मराठी भाषेत आणि तेही सोप्या मराठी भाषेत समजून घ्यायचे असतील तर ज्येष्ठ बँकिंग तज्ज्ञ विद्याधर अनास्कर यांचं \"गोष्ट रिझर्व्ह बँकेची\" हे पुस्तक प्रत्येक मराठी माणसानं वाचणं अतिशय गरजेचं आहे. भारतीय रिझर्व्ह बँक म्हणजे काय, ती स्थापन कशी झाली, तिचं आपल्यापर्यंतचं महत्त्व — सारं काही विशद करणारं हे पुस्तक मोलाचा ऐवज आहे. म्हणूनच विशेष लेखन श्रेणीमध्ये या पुस्तकाला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "Banking, financial transactions, and the functioning of the Reserve Bank are topics that have always seemed complex to the average Marathi reader. Senior banking expert Vidhyadhar Anaskar's \"Gosht Reserve Bankachi\" demystifies all of this in simple, lucid Marathi — from the founding of the Reserve Bank of India to its everyday relevance in our lives. An invaluable guide for every Marathi reader.",
    },
  },

  "2026:abhishekh dhangar": {
    category: { en: "Translation (Foreign Language)", mr: "अनुवाद — परभाषा" },
    description: {
      mr: "\"द हाऊस ऑफ पेपर\" हे अभिषेक धनगर यांनी अनुवादित केलेलं पहिलंच पुस्तक आहे. बिब्लोमेनिया झालेल्या माणसाची गोष्ट त्यांनी मांडली आहे. अनुवाद करताना त्यांनी मूळ गोष्ट आत्मसात करून ती भावानुवादरूपाने सादर केली आहे. त्यामुळेच मूळ गोष्टीमधील रहस्यमयता, गूढता, उपरोधिकपणा त्यांच्या मांडणीत पुरेपूर उतरला आहे. साहित्यातील कृत्रिम जीवन आणि प्रत्यक्ष जीवन यांच्यातील भिन्नता ही कादंबरी सूक्ष्म रीतीने अधोरेखित करते. म्हणूनच या अनुवादाला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "\"The House of Paper\" is the very first translation by Abhishekh Dhangar — the story of a man consumed by bibliomania. In translating, he has deeply absorbed the original narrative and rendered it as an emotional equivalent, preserving the mystery, enigma, and irony of the source work in full measure. The novel subtly contrasts the artificial world of literature with the rawness of real life.",
    },
  },

  "2026:ganesh vispute": {
    category: { en: "Translation (Indian Language)", mr: "अनुवाद — भारतीय भाषा" },
    description: {
      mr: "वाचताना कथा आहे की कविता असा संभ्रम पाडावा अशी काहीशी या कथांची अनोखी रचना \"माणूस असण्याच्या आठवणी\" या पुस्तकाच्या रूपानं वाचकांच्या समोर गणेश विसपुते मांडतात. काही कथा तर अगदी दोन ओळींच्याही आहेत. कमी शब्दांत जास्तीत जास्त अर्थ सांगण्याचा हा एक विलक्षण प्रयोग आहे. या कथा आशयघन, गूढ व प्रतिकात्मक आहेत. काही तर्कापलीकडच्या कल्पनारम्यतेकडे झुकणाऱ्या आहेत. म्हणूनच हा अनोखा प्रयोग साकारल्याबद्दल या पुस्तकाला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "Ganesh Vispute presents \"Manus Asanyachya Aathavani\" in a form that deliberately blurs the boundary between story and poem. Some pieces span just two lines — an extraordinary experiment in conveying the maximum meaning with the minimum of words. These pieces are dense with content, mysterious, symbolic, and at times veering toward the surreal beyond reason.",
    },
  },

  "2026:amar gore": {
    category: { en: "Novel", mr: "कादंबरी" },
    description: {
      mr: "अमर गोरे यांची \"पारक\" ही कादंबरी गावखेड्यातील उनाड बागडणाऱ्या पौगंडावस्थेतील मुलांच्या भावविश्वाचे चित्रण करते. शहराचं आकर्षण, त्याचं खेड्यातल्या संस्कृतीवर झालेलं आक्रमण, खेड्यातल्या व्यक्तींची मानसिकता, स्पृश्यास्पृश्यता, जातीपातींतले व्यवहार, कुटुंबातील बिघडलेली नाती, कौटुंबिक ताणतणाव, मानसिक आजार — अशा असंख्य विषयांचं होणारं दर्शन सुन्न करणारं आहे. त्यात तरलता, निरागसता, क्रौर्य, रौद्र भाव आहेत. त्यासोबत नायकाचा एकाकीपणा, उदासी, असुरक्षितता आणि आनंद हे कंगोरेही आहेत. म्हणूनच या कादंबरीला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "Amar Gore's novel \"Parak\" portrays the emotional universe of carefree boys on the cusp of adolescence in a rural village. The allure of cities encroaching on village culture, caste discrimination, fractured family ties, mental illness — the panorama of themes spans the numbing and the unsettling. Tenderness, innocence, cruelty, the protagonist's loneliness, sadness, insecurity, and joy all coexist within its pages.",
    },
  },

  "2026:kishor rithe": {
    category: { en: "Research", mr: "संशोधन" },
    description: {
      mr: "सातपुडा पर्वत हा हिमालयापेक्षाही पुरातन आहे. 'सातपुड्याचा सातबारा' या पुस्तकात सातपुड्याचा केवळ पुरातन इतिहास नाही, तर येथील वन्यजीवन व नैसर्गिक संपन्नता या दोन्ही अंगांवर किशोर रिठे यांनी सखोल प्रकाश टाकला आहे. गेल्या अनेक शतकांमध्ये या ठिकाणी झालेली सत्तांतरे, त्यांचे दस्तावेजीकरण — हे मराठीतील पहिलंच इतके सखोल अभ्यासलेलं पर्वत-चरित्र असावं. म्हणूनच संशोधन श्रेणीमध्ये या पुस्तकाला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "The Satpuda range predates even the Himalayas in antiquity. \"Satpudyacha Satbara\" illuminates not only the ancient history of this mountain range but also its rich wildlife and natural abundance. Kishor Rithe's deep, meticulously documented study spans centuries of power transitions and ecological change — likely the most comprehensive portrait of a single mountain range ever written in Marathi.",
    },
  },

  "2026:Dinkar Manwar": {
    category: { en: "Poetry", mr: "कविता" },
    description: {
      mr: "दिनकर मनवर लिखित 'झेन्नाच्या कविता' हा मराठी कविता प्रकारातील एक वेगळा आणि विलक्षण प्रयोग आहे. स्त्रीच्या अंतरंगातल्या भावना त्यांच्या काव्यातून विलक्षण ताकदीने उतरल्या आहेत. गूढ, आदिम, अनाघ्रात भावनांचे तळात जाऊन केलेलं चित्रण प्रत्ययकारी आहे. स्त्रीच्या लैंगिक भावनांचा इतका धीट व मुक्त आविष्कार क्वचितच आढळून येतो. टॅबू ठरवल्या गेलेला, फारसा न बोलला जाणारा विषय कवीने संवेदनशीलतेनं हाताळला आहे. म्हणूनच कविता श्रेणीमध्ये या पुस्तकाला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "\"Zennachya Kavita\" by Dinkar Manwar is a unique and extraordinary experiment in Marathi poetry. The innermost emotions of a woman emerge with striking force through these verses. The evocation of primal, untouched feelings — explored to their depths — is searingly real. Such bold and free expression of feminine sexuality is rare in Marathi literature; the poet handles this seldom-spoken subject with remarkable sensitivity.",
    },
  },

  "2026:sunanda bhosekar": {
    category: { en: "Notable Writing", mr: "लक्षवेधी" },
    description: {
      mr: "जगभरातून हिंदुस्थानाला भेटी दिलेल्या प्रवाशांच्या उपलब्ध नोंदी शोधून सुनंदा भोसेकर यांनी वेगळा प्रयोग केला आहे. अशा प्रवाशांचा कालखंड, त्यांनी केलेल्या खडतर प्रवासातील यातना, भेट दिलेले प्रदेश, तेथील हवामान, लोकसंस्कृती, रीतीरिवाज, राहणी-पद्धती, कौटुंबिक व सामाजिक जीवन, जातिव्यवस्था, धार्मिक आचरण, परंपरा व समजुती — या साऱ्यांचा विशाल पट 'पेरिप्लस ऑफ हिंदूस्तान' (खंड १ व २) मध्ये आहे. मार्ग, नकाशा, रेखाचित्रे यामुळे विषय गंभीर असला तरी पुस्तक शुष्क नाही. म्हणूनच लक्षवेधी श्रेणीमध्ये या पुस्तकाला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "Sunanda Bhosekar undertook a remarkable experiment — tracing the available records of travellers who visited India from across the world. \"Periplus of Hindustan\" (Volumes 1 & 2) presents a vast canvas: the eras of these travellers, their arduous journeys, regions visited, climate, folk culture, customs, social life, caste structures, religious practices, and local character. Maps, sketches, and charts ensure the serious subject never feels dry.",
    },
  },

  "2026:atul pethe": {
    category: { en: "Personal Narrative", mr: "अनुभव कथन" },
    description: {
      mr: "नाटककाराच्या मनात घडणाऱ्या उलथापालथी, मानसिक अस्वस्थता, करावा लागणारा संघर्ष, सर्जनशील निर्मितीची प्रक्रिया, त्यावरील चिंतन — अशा अनेक विषयांना सामावून घेणारं पुस्तक म्हणजे अतुल पेठे लिखित \"नाटक नावाचा तराफा\". पुस्तकाला रूढ साचा किंवा फॉर्म नाही, कालक्रमानुसार लिखाण समाविष्ट नाही. त्यात लेखकाचा जीवनप्रवास, व्याख्याने, लेख, आठवणी, कहाण्या, चिंतन, संवाद असं खूप काही आहे. लेखकाचं व्यक्त होणे अस्सल आहे. म्हणूनच अनुभव कथन श्रेणीमध्ये या पुस्तकाला लोकमत साहित्य पुरस्कार देऊन सन्मानित करत आहोत.",
      en: "\"Natak Navacha Tarafa\" by Atul Pethe captures the upheaval within a playwright's mind — the anxiety, the struggle, the creative process, and deep contemplation. The book follows no fixed form or chronological structure. It contains life stories, lectures, essays, memories, tales, reflections, and dialogue — a rich portr ait of both personal and professional journeys, rendered with authentic, unfiltered expression.",
    },
  },
};

/**
 * Look up the stored detail for a given year and author (folder-derived name).
 * The author string is expected to be the raw `folderNameToTitle` output — e.g. "Shama Bhate".
 */
export function getAwardeeDetail(
  year: number,
  author: string,
): AwardeeDetail | undefined {
  const key = `${year}:${author.toLowerCase().replace(/\s+/g, " ").trim()}`;
  return AWARDEE_DETAILS[key];
}
