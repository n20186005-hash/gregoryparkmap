/**
 * Single source of truth for the Gregory Park entity binding.
 *
 * Swap the values in `attraction` to reuse this page for another single-attraction site:
 * domain, official full name, short name / domain keyword, city, province, country,
 * postal code, coordinates, Google Maps share URL + embed src, nearby landmarks and the
 * official tourism URL.
 */

export const siteName = 'Gregory Park Map';
export const siteUrl = 'https://gregoryparkmap.com';
export const domainName = 'gregoryparkmap.com';

export const attraction = {
  /** {{ATTRACTION_FULL_NAME}} — official listing name (Google Maps: "Gregory Park"). */
  fullName: 'Gregory Park',
  /** {{ATTRACTION_SHORT_NAME}} — the name the domain gregoryparkmap.com maps to. */
  shortName: 'Gregory Park',
  /** Other spellings visitors search for; used for alternateName / on-page binding. */
  aliases: ['Gregory Park Nuwara Eliya', 'Nuwara Eliya Gregory Park', 'Gregory Lake Park'],
  /** {{CITY_NAME}} */
  city: 'Nuwara Eliya',
  /** {{STATE_PROVINCE}} */
  region: 'Central Province',
  /** {{COUNTRY_NAME}} */
  country: 'Sri Lanka',
  /** {{COUNTRY_CODE_2LETTER}} */
  countryCode: 'LK',
  /** {{POSTAL_CODE}} */
  postalCode: '22200',
  /** Street line as published on the Google Maps listing. */
  streetAddress: 'XQ4G+PX6, Peradeniya-Badulla-Chenkaladi Hwy',
  highway: 'Peradeniya-Badulla-Chenkaladi Highway',
  /** Plus Code for the park; the coordinates below are derived from it. */
  plusCode: 'XQ4G+PX6',
  /** {{LATITUDE}} / {{LONGITUDE}} — derived from Plus Code XQ4G+PX6 (≈40 m resolution). */
  latitude: 6.9567875,
  longitude: 80.777390625,
  /** {{MAPS_SHARE_URL}} */
  mapsShareUrl: 'https://maps.app.goo.gl/GeS1xbW7J6xB2xKUA',
  /** {{MAPS_EMBED_SRC}} */
  mapsEmbedSrc: 'https://www.google.com/maps?q=Gregory+Park%2C+Nuwara+Eliya%2C+Sri+Lanka&output=embed&hl=si-LK&gl=lk',
  /** {{GOVT_TOURISM_URL}} — Sri Lanka Tourism Development Authority (.gov.lk). */
  govtTourismUrl: 'https://www.sltda.gov.lk/',
  govtTourismLabel: 'Sri Lanka Tourism Development Authority — Official Tourism Portal',
  /** Visible credit for the photos used on the page (Wikimedia Commons). */
  imageCreditUrl: 'https://commons.wikimedia.org/wiki/Category:Lake_Gregory_(Sri_Lanka)',
  /** {{NEARBY_LANDMARK_1}} / {{NEARBY_LANDMARK_2}} */
  nearbyLandmark1: 'Lake Gregory',
  nearbyLandmark2: 'Victoria Park',
  heroImage: '/images/gregory-lake-park.webp',
  /** Absolute-URL image list for the JSON-LD `image` node. */
  schemaImages: [
    '/images/gregory-lake-park.webp',
    '/images/gregory-lake-garden.webp',
    '/images/gregory-lake-mist.webp',
  ],
  openingHours: '06:00 – 18:00',
  elevationMetres: 1868,
};

export const rating = {
  /** Latest values published on the Google Maps listing (September 2026 snapshot). */
  value: 4.5,
  best: 5,
  reviewCount: 16447,
  reviewCountLabel: '16,447',
  starsLabel: '★★★★★ (4.5 / 5)',
  syncedAtZh: '2026 年 9 月',
  /** Small print shown directly under the rating (Chinese, as specified by the publisher). */
  ratingSourceZh: '评分与评价数同步自谷歌地图（Google Maps）用户评价 · 2026 年 9 月 · ',
  ratingSourceLinkZh: '点击查看谷歌地图全部评价↗',
  /** Required attribution for the reviews block and the sources block. */
  reviewAttributionZh: '同步自 Google 地图用户评价，同步时间 2026 年 9 月；版权归原作者与 Google 地图所有',
  reviewButtonZh: '在谷歌地图查看全部评价',
  reviewCountLabelZh: '评价 · 同步时间 2026 年 9 月',
  /** Reviews are shown on the page only — never emitted as Review / aggregateRating markup. */
  reviewsUrl: attraction.mapsShareUrl,
};

export const meta = {
  title: `${attraction.fullName} (${attraction.city}) - Visitor Guide, Map & Location`,
  description: `Discover ${attraction.fullName} in ${attraction.city}, ${attraction.region}, ${attraction.country}: location map, opening details, nearby ${attraction.nearbyLandmark1}, ${attraction.nearbyLandmark2}, and travel tips.`,
  ogTitle: `${attraction.fullName} - ${attraction.city} Travel Guide`,
  ogDescription: `Independent visitor guide to ${attraction.fullName} in ${attraction.city}, ${attraction.region}, ${attraction.country}.`,
  ogImageAlt: `${attraction.fullName} in ${attraction.city}, ${attraction.country}`,
  schemaDescription: `Comprehensive visitor guide to ${attraction.fullName} in ${attraction.city}, ${attraction.region}, ${attraction.country}.`,
};

/** Visible FAQ (Sinhala) — mirrored 1:1 in the FAQPage structured data. */
export const faqs = [
  {
    q: 'Gregory Park විවෘත වන්නේ කීයටද?',
    a: 'පොදු සංචාරක තොරතුරු අනුව දිනපතා 06:00 සිට 18:00 දක්වා විවෘත වේ. නිවාඩු දින හෝ ක්‍රියාකාරකම් වේලාවන් වෙනස් විය හැකි නිසා පැමිණි විට තහවුරු කරන්න.',
  },
  {
    q: 'නගර මධ්‍යයෙන් පැමිණෙන්නේ කෙසේද?',
    a: 'Nuwara Eliya නගර මධ්‍යයෙන් tuk-tuk හෝ කුලී රථයකින් Gregory Lake දෙසට පැමිණෙන්න. මාර්ගයෙන් පැමිණෙන්නේ නම් Peradeniya-Badulla-Chenkaladi Highway සහ XQ4G+PX6 Plus Code එක භාවිතා කරන්න.',
  },
  {
    q: 'ඇතුල්වීම සහ බෝට්ටුව සඳහා ගෙවීම කෙසේද?',
    a: 'උද්‍යානයේ ඇතුල්වීම සහ වැව මත ක්‍රියාකාරකම් වෙන වෙනම ගාස්තු විය හැක. සෘතු අනුව වෙනස් වන නිසා, පැරණි අන්තර්ජාල මිලක් වෙනුවට ස්ථානයේදී අදාල ගාස්තුව අසන්න.',
  },
  {
    q: 'වැව අසලට යාමට හොඳම වේලාව කුමක්ද?',
    a: 'උදෑසන වලාකුළු සහ මෘදු ආලෝකය ඇවිදීමට සුදුසුය. සවස අහස පැහැදිලි නම්, වැව අසල වාඩි වී තේ පානය කරන්න; වැසි ඇඳුමක් රැගෙන එන්න.',
  },
  {
    q: 'අසලම බලන්න තියෙන තැන් මොනවාද?',
    a: 'වැව අද්දරම Lake Gregory සහ නගරයට ආසන්නයේ Victoria Park ඇත. තව ටිකක් දුරට ගියොත් Hakgala Botanical Garden, Pedro තේ කර්මාන්තශාලාව, Lover’s Leap දිය ඇල්ල සහ Horton Plains ජාතික උද්‍යානය ද ගමනට එකතු කරගත හැක.',
  },
  {
    q: 'දරුවන් සමඟ යාමට සුදුසුද?',
    a: 'ඔව්. තණබිම්, විවෘත අවකාශ, playground සහ වැව මත බෝට්ටු වැනි මෘදු ක්‍රියාකාරකම් නිසා පවුලේ අයට සුදුසුය. කඳුකරයේ සීතල සහ හදිසි වැසි ඇති විය හැකි නිසා උණුසුම් ඇඳුම් රැගෙන එන්න.',
  },
  {
    q: 'මෙම පිටුවේ පෙන්වන ඇගයීම සහ සමාලෝචන ගණන පැමිණෙන්නේ කොහෙන්ද?',
    a: 'මෙම පිටුවේ පෙන්වන 4.5 / 5 ඇගයීම සහ 16,447 සමාලෝචන ගණන Google සිතියම් (Google Maps) හි පොදු සමාලෝචන දත්ත මත පදනම් වේ; ඒවා 2026 සැප්තැම්බර් මාසයේ තත්ත්වයට යාවත්කාලීන කර ඇත. සමාලෝචනවල අයිතිය එම කතෘන්ට සහ Google සිතියම් හට හිමිය.',
  },
  {
    q: 'කාලගුණය සහ හොඳම සමය කවදාද?',
    a: 'අපගේ #weather කොටසේ සජීවී දේශගුණ දත්ත ඇත. වසරේ හොඳම කාලය පෙබරවාරි–මාර්තු (වියළිම, දීප්තිමත්); ඔක්තෝබර්–නොවැම්බර් වර්ෂාව වැඩිම. මැයි මැද චක්‍රවාත අවදානමක් තිබිය හැක. කඳුකර කාලගුණය වේගයෙන් වෙනස් වේ, එනිසා වැසි ඇඳුමක් රැගෙන යන්න.',
  },
  {
    q: 'ගුවන්තොටුපොළෙන් Gregory Park දක්වා කෙසේ යයි?',
    a: 'Bandaranaike (CMB) ගුවන්තොටුපොළේ දුම්රිය ස්ථානයක් හෝ කෙලින් බස් එකක් නැත. කොළඹ දක්වා පළමුව යන්න (ටැක්සි හෝ 187 බස්), ඉන්පසු Colombo Fort වෙතින් Nanu Oya දක්වා දුම්රිය (6–7 පැය) හෝ කොළඹින් නෙරම් බස් (5–6 පැය). Nanu Oya වෙතින් නගරයට සහ වැවට tuk-tuk එකක් (20–30 මිනිත්තු). හෝ කාඩ්/SUV එකකින් 4–5 පැය.',
  },
  {
    q: 'WC, ආහාර සහ පාකින් තිබේද?',
    a: 'වැව අසල ප්‍රවේශ ද්වාරය අසල මාර්ගයේ සාමාන්‍යයෙන් public toilets සහ parking සිටී. ආහාර සහ කුඩා snack විකුණන වෙන්දරු සහ කුඩා කෑමගේ පහසුකම් තිබේ; විශේෂ ආහාර විකල්ප සඳහා නගරය බලන්න. ජලය පානය කිරීමට නොනුවන් නිසා බෝතල්/පෙරහන ජලය තෝරන්න. වැඩි විස්තර #facilities කොටසේ.',
  },
  {
    q: 'වැවේ දිය නාන්න හෝ බොන්න පුළුවන්ද?',
    a: 'නැත. 2026 දී වාර්තා වූ පරිදි විලේ ජලය ගුණාත්මක භාවය අනුමති මට්ටම්වලින් ඉහළින් ඇත (පොස්පේට්, නයිට්‍රජන්, BOD). එනිසා වැවේ දිය නොබීමට සහ නොනාමට, වැව අසල සැලකිල්ලෙන් සිටින්න. වැඩි විස්තර #responsibility කොටසේ.',
  },
];

/** Visible FAQ (English) — also mirrored in the same FAQPage structured data. */
export const faqsEn = [
  {
    q: 'Where is Gregory Park located?',
    a: 'Gregory Park is located beside Lake Gregory in Nuwara Eliya, Central Province, Sri Lanka — Plus Code XQ4G+PX6, on the Peradeniya–Badulla–Chenkaladi Highway, postal code 22200.',
  },
  {
    q: 'Is Gregory Park free to visit?',
    a: 'Gregory Park is a public park, but park entry and lake activities can be ticketed separately and fees change with the season. Treat any online price as a guide and confirm the current fee at the gate.',
  },
  {
    q: 'What is the best time to visit Gregory Park?',
    a: 'Early morning (06:00–09:00) and late afternoon (after 16:00) usually give the softest light and the calmest water. Highland weather changes quickly, so carry a light rain layer.',
  },
  {
    q: 'How do I get to Gregory Park from Nuwara Eliya town?',
    a: 'The easiest option is a tuk-tuk or taxi from Nuwara Eliya town centre. By car, follow the Peradeniya–Badulla–Chenkaladi Highway toward Gregory Lake; buses stop in Nuwara Eliya town, where a tuk-tuk completes the final short leg.',
  },
  {
    q: 'What is the weather like and when is the best season?',
    a: 'The live weather panel shows current conditions and a 7-day outlook. The best window is February–March (driest, sunniest); October–November is wettest and mid-May carries a cyclone-risk window. Highland weather shifts fast, so carry a rain layer year-round — see the seasonal strategy table.',
  },
  {
    q: 'How do I get to Gregory Park from Colombo Airport (CMB)?',
    a: 'There is no station or direct bus at Bandaranaike (CMB). First reach Colombo (taxi or the 187 airport bus), then take the Colombo Fort → Nanu Oya train (6–7 h express) or an intercity bus to Nuwara Eliya (5–6 h), and finish with a 20–30 min tuk-tuk to the lake. A private car or SUV from the airport takes about 4–5 hours.',
  },
  {
    q: 'Are there toilets, parking and food near Gregory Park?',
    a: 'Public toilets and marked parking are usually near the main entrance and lake road; vendors and small eateries sell tea, corn, roti and short eats. For specific dietary needs the town has more choice, and tap water is not for drinking — choose bottled or filtered. Full type-neutral list in the visitor services section.',
  },
  {
    q: 'Can I swim or drink the lake water?',
    a: 'No. Reported 2026 findings put the lake well above local water-quality guidelines (phosphate, nitrogen, biochemical oxygen demand), so do not drink or swim in it and keep children and pets away from the unguarded edge. See the science & responsibility section.',
  },
];
