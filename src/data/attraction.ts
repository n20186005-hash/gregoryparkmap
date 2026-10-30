/**
 * Single source of truth for the Gregory Park entity binding.
 *
 * Swap the values in `attraction` to reuse this page for another single-attraction site:
 * domain, official full name, short name / domain keyword, city, province, country,
 * postal code, coordinates, Google Maps share URL + embed src, nearby landmarks and the
 * official tourism URL.
 */

export const siteName = "Gregory Park Map";
export const siteUrl = "https://gregoryparkmap.com";
export const domainName = "gregoryparkmap.com";

export const attraction = {
  /** {{ATTRACTION_FULL_NAME}} — official listing name (Google Maps: "Gregory Park"). */
  fullName: "Gregory Park",
  /** {{ATTRACTION_SHORT_NAME}} — the name the domain gregoryparkmap.com maps to. */
  shortName: "Gregory Park",
  /** Other spellings visitors search for; used for alternateName / on-page binding. */
  aliases: [
    "Gregory Park Nuwara Eliya",
    "Nuwara Eliya Gregory Park",
    "Gregory Lake Park",
    "Gegari Park",
    "Gegari Park Nuwara Eliya",
  ],
  /** {{CITY_NAME}} */
  city: "Nuwara Eliya",
  /** {{STATE_PROVINCE}} */
  region: "Central Province",
  /** {{COUNTRY_NAME}} */
  country: "Sri Lanka",
  /** {{COUNTRY_CODE_2LETTER}} */
  countryCode: "LK",
  /** {{POSTAL_CODE}} */
  postalCode: "22200",
  /** Street line as published on the Google Maps listing. */
  streetAddress: "Nuwara Eliya",
  highway: "Peradeniya-Badulla-Chenkaladi Highway",
  /** Plus Code for the park; the coordinates below are derived from it. */
  plusCode: "XQ4G+PX6",
  /** {{LATITUDE}} / {{LONGITUDE}} — derived from Plus Code XQ4G+PX6 (≈40 m resolution). */
  latitude: 6.9567875,
  longitude: 80.777390625,
  /** {{MAPS_SHARE_URL}} */
  mapsShareUrl: "https://maps.app.goo.gl/GeS1xbW7J6xB2xKUA",
  /** {{MAPS_EMBED_SRC}} */
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Gregory+Park%2C+Nuwara+Eliya%2C+Sri+Lanka&output=embed&hl=si-LK&gl=lk",
  /** {{GOVT_TOURISM_URL}} — Sri Lanka Tourism Development Authority (.gov.lk). */
  govtTourismUrl:
    "https://tourism.cp.gov.lk/en/tour-itinerary/ceylon-tea-trail",
  govtTourismLabel: "Central Province Tourism Department — Ceylon Tea Trail",
  /** Visible credit for the photos used on the page (Wikimedia Commons). */
  imageCreditUrl: "/#image-credits",
  /** {{NEARBY_LANDMARK_1}} / {{NEARBY_LANDMARK_2}} */
  nearbyLandmark1: "Lake Gregory",
  nearbyLandmark2: "Victoria Park",
  heroImage: "/images/lake-illustration.svg",
  /** Absolute-URL image list for the JSON-LD `image` node. */
  schemaImages: [
    "/images/lake-illustration.svg",
    "/images/lake-illustration.svg",
    "/images/lake-illustration.svg",
  ],
  openingHours: "Confirm with the entrance staff",
  elevationMetres: 1868,
};

export const rating = {
  value: 4.5,
  best: 5,
  reviewCount: 16570,
  reviewCountLabel: "16,570",
  reviewsUrl: attraction.mapsShareUrl,
};

export const meta = {
  title: "Gregory Park Nuwara Eliya | Map, Hours & Ticket Checks",
  description:
    "Gregory Park / Gegari Park beside Lake Gregory, Nuwara Eliya: map, how to confirm entry fees and opening hours, weather forecast and responsible visitor planning.",
  ogTitle: "Gregory Park Nuwara Eliya — Visitor Planning Guide",
  ogDescription:
    "Independent guide: find the lake, check current hours and tickets before travel, and read the regional weather forecast. Not an official tariff or timetable.",
  ogImageAlt:
    "Original symbolic illustration of a lake and hills; not a photograph or a map of Gregory Park",
  schemaDescription:
    "Independent visitor planning guide to Gregory Park beside Lake Gregory in Nuwara Eliya, Sri Lanka.",
};

export const faqs = [
  {
    q: "Gregory Park විවෘත වේලාව සහ ගාස්තුව කුමක්ද?",
    a: "වත්මන් නිල දෛනික වේලාව සහ ටිකට් මිල තහවුරු කර නැත. 2026-10-29 Google Maps සටහන එදින 21:30 වසා දමන බව පෙන්වීය; එය කළමනාකරුගේ කාලසටහනක් නොවේ. පිවිසුම, ප්‍රවේශ ගාස්තුව සහ ක්‍රියාකාරකම් සඳහා වෙනම ගෙවීම් කලින් අසන්න.",
  },
  {
    q: "Gregory Park සහ Gregory Lake එකම දෙයක්ද?",
    a: "Gregory Lake යනු වැවයි; Gregory Park යන නම වැව අසල උද්‍යාන ප්‍රදේශය සඳහා භාවිතා වේ. වැව වටා සියලු පිවිසුම් එකම ටිකට් හෝ වේලාව යටතේ ඇතැයි උපකල්පනය නොකරන්න.",
  },
  {
    q: "මෙහි ඇගයීම පැමිණෙන්නේ කොහෙන්ද?",
    a: "4.5 / 5 සහ සමාලෝචන 16,570 යනු 2026-10-29 දින පරීක්ෂා කළ Google Maps සටහනකි. එය ස්වයංක්‍රීයව යාවත්කාලීන නොවේ; මෙම වෙබ් අඩවිය සමාලෝචන රැස් කරන්නේ නැත.",
  },
  {
    q: "බෝට්ටු හෝ ගුවන් චාරිකාවක මිල කීයද?",
    a: "වත්මන් මිල, ක්‍රියාකාරී තත්ත්වය හෝ ගුවන් චාරිකා ක්‍රියාකරුවෙකු තහවුරු කර නැත. අන්තර්ජාල දැන්වීමක් උද්‍යානයේ නිල ප්‍රවේශ මිල ලෙස නොසලකන්න; අදාළ ක්‍රියාකරුගෙන් ගාස්තුව, අවලංගු කිරීම සහ ආරක්ෂක උපකරණ අසන්න.",
  },
  {
    q: "වැව අසලට පැමිණෙන්නේ කෙසේද?",
    a: "Google Maps හි Gregory Park, Nuwara Eliya සටහන විවෘත කර ඔබේ පිටත්වන ස්ථානයෙන් මාර්ගය බලන්න. සිතියම් ලකුණක් තහවුරු කළ පිවිසුමක් නොවේ. ගමන් කිරීමට පෙර පිවිසුම සහ ආපසු ප්‍රවාහනය තහවුරු කරන්න.",
  },
  {
    q: "කාලගුණ දත්ත විශ්වාස කළ හැකිද?",
    a: "පෙන්වන්නේ Open-Meteo ආකෘති අනාවැකියකි; උද්‍යානයේ මිනුම් ස්ථානයක සජීවී වාර්තාවක් නොවේ. යාවත්කාලීන දත්ත නැති විට අංක පෙන්වන්නේ නැත. නිල අවවාද සඳහා ශ්‍රී ලංකා කාලගුණ විද්‍යා දෙපාර්තමේන්තුව බලන්න.",
  },
];
export const faqsEn = [
  {
    q: "What are Gregory Park opening hours and entry fees?",
    a: "A current operator timetable and admission tariff have not been verified. Google Maps showed closing at 21:30 in the 29 October 2026 snapshot; that is not confirmation of a recurring schedule. Check the intended entrance, admission category and separate activity charges before travel. The municipal Gazette rates for 2022 are historical, not a 2026 price list.",
  },
  {
    q: "Is Gregory Park the same as Lake Gregory?",
    a: "Lake Gregory is the water body; Gregory Park refers to the lakeside park area. Do not assume every shoreline access has the same operator, ticket or opening hours. Gegari Park is another search spelling used for this destination.",
  },
  {
    q: "What is the boat or helicopter ride price?",
    a: "No current activity tariff or operating air-ride provider has been verified for this guide. A reseller package may include services beyond admission. Ask the relevant operator about availability, the total price, safety equipment, weather cancellation and refunds; an advertisement does not confirm operation.",
  },
  {
    q: "How do I contact Gregory Park?",
    a: "This guide is independent and cannot accept park bookings or confirm gate conditions. Use the Nuwara Eliya Municipal Council link in Sources for local enquiries, and ask the intended entrance or activity operator directly. We have not verified a dedicated park contact number.",
  },
  {
    q: "Are facilities and step-free access guaranteed?",
    a: "No current facilities audit has been completed. Before relying on toilets, parking, seating or an accessible route, ask about the intended entrance, surfaces, steps, toilets and assistance for your visit date.",
  },
  {
    q: "Does the weather forecast confirm whether the park is open?",
    a: "No. The regional model forecast is planning information, not an observation at the gate, a safety clearance or an operating notice. Check official weather warnings and local instructions separately.",
  },
];
