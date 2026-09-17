/**
 * Editorial content for the new visitor-guide sections (transport, seasonal
 * strategy, tailored routes, visitor services, science/responsibility, history).
 *
 * Language policy for this file: section copy is English so it is crawlable for
 * the high-intent search queries (how to get there, best season, facilities);
 * Sinhala is added by the components for the on-site/local reader. Nothing here
 * recommends a specific business — only types of services, kept neutral.
 */

import { attraction } from './attraction';

/** Authoritative / official outbound links used across the new sections. */
export const officialLinks = {
  meteo: { label: 'Department of Meteorology, Sri Lanka', href: 'https://www.meteo.gov.lk/' },
  railway: { label: 'Sri Lanka Railways — official seat reservation', href: 'https://eservices.railway.gov.lk/' },
  transportCommission: { label: 'National Transport Commission (bus services)', href: 'https://www.ntc.gov.lk/' },
  environment: { label: 'Ministry of Environment, Sri Lanka', href: 'https://www.env.gov.lk/' },
  municipal: { label: 'Nuwara Eliya Municipal Council — local history', href: 'https://nuwaraeliya.mc.gov.lk/' },
  tourism: { label: attraction.govtTourismLabel, href: attraction.govtTourismUrl },
};

/**
 * 1991–2020 climate normals for Nuwara Eliya (°C / mm), used both for the
 * seasonal strategy table and as an honest fallback when the live feed is down.
 */
export const monthlyNormals = [
  { m: 'Jan', minC: 10, maxC: 20, meanC: 15.2, rainMm: 116, rainDays: 10, sunH: 5.5 },
  { m: 'Feb', minC: 10, maxC: 21, meanC: 15.6, rainMm: 73, rainDays: 7, sunH: 6.0 },
  { m: 'Mar', minC: 11, maxC: 22, meanC: 16.6, rainMm: 72, rainDays: 7, sunH: 6.5 },
  { m: 'Apr', minC: 12, maxC: 23, meanC: 17.2, rainMm: 134, rainDays: 13, sunH: 5.0 },
  { m: 'May', minC: 13, maxC: 22, meanC: 17.4, rainMm: 172, rainDays: 13, sunH: 3.5 },
  { m: 'Jun', minC: 14, maxC: 19, meanC: 16.5, rainMm: 168, rainDays: 15, sunH: 3.0 },
  { m: 'Jul', minC: 14, maxC: 19, meanC: 16.0, rainMm: 155, rainDays: 16, sunH: 2.0 },
  { m: 'Aug', minC: 13, maxC: 19, meanC: 16.2, rainMm: 132, rainDays: 14, sunH: 2.5 },
  { m: 'Sep', minC: 13, maxC: 20, meanC: 16.2, rainMm: 161, rainDays: 14, sunH: 3.0 },
  { m: 'Oct', minC: 13, maxC: 20, meanC: 16.2, rainMm: 247, rainDays: 19, sunH: 4.0 },
  { m: 'Nov', minC: 12, maxC: 20, meanC: 16.0, rainMm: 226, rainDays: 18, sunH: 4.0 },
  { m: 'Dec', minC: 12, maxC: 19, meanC: 15.4, rainMm: 183, rainDays: 15, sunH: 4.5 },
];

export interface TransportMode {
  id: string;
  mode: string;
  summary: string;
  steps: string[];
  time: string;
  cost: string;
  note?: string;
}

export const transportModes: TransportMode[] = [
  {
    id: 'airport-train',
    mode: 'Airport → Colombo Fort by taxi/bus, then train to Nanu Oya + tuk-tuk',
    summary:
      'The classic scenic route. There is no railway station or direct bus at Bandaranaike (CMB), so you first reach Colombo Fort, then take the hill-country line to Nanu Oya — the rail gateway to Nuwara Eliya — and finish with a short tuk-tuk up to town and the lake.',
    steps: [
      'CMB → Colombo Fort: official airport taxi (≈ 45–90 min) or the 187 airport bus to Pettah/Bastian Mawatha, then a short tuk-tuk to Fort.',
      'Colombo Fort → Nanu Oya: the Udarata Menike / Podi Menike expresses take 6–7 h; local/night mail trains 7–9 h.',
      'Nanu Oya → park: a 20–30 min tuk-tuk climb (agree the fare first; roughly LKR 800–1,500).',
    ],
    time: 'About 7–9 hours door to door.',
    cost: 'Train second-class reserved is inexpensive (a few US dollars); the airport leg and tuk-tuk add to it. Book seats on the official railway site up to 30 days ahead — observation cars sell out in peak season.',
    note: 'Keep a warm layer on the train: the hill section after Kandy is the scenic highlight and gets cold after dark.',
  },
  {
    id: 'airport-bus',
    mode: 'Intercity bus via Colombo (cheapest)',
    summary:
      'Best for tight budgets. Two legs: the airport bus into Colombo, then a long-distance bus up to the Nuwara Eliya town bus stand.',
    steps: [
      'CMB → Colombo: the 187 airport bus runs around the clock to Pettah / Bastian Mawatha.',
      'Colombo → Nuwara Eliya: intercity/express buses take 5–6 h; ordinary buses 6–7 h+ and stop often.',
      'Nuwara Eliya bus stand → park: a 2–3 km tuk-tuk hop.',
    ],
    time: 'About 7–9 hours.',
    cost: 'Well under USD 10 per person in total; luggage space is very limited and roof racks are used for big bags.',
    note: 'The road from Hatton into the hills is winding — travellers prone to motion sickness should plan ahead. Buses thin out in the evening.',
  },
  {
    id: 'private-car',
    mode: 'Private car / hotel transfer (door to door)',
    summary:
      'Fastest and most flexible, especially for families, older travellers and anyone with luggage. Common for guests staying outside town.',
    steps: [
      'Book a car or SUV in advance through a hotel or a ride app; some operators also meet flights at CMB.',
      'Route follows the A1 to Kandy, then the A5 via Ginigathena and Hatton up to Nuwara Eliya.',
      'Ask the driver for a tea/food and photo stop on the climb — the viewpoints are part of the trip.',
    ],
    time: 'About 4–5 hours from the airport (≈ 180 km).',
    cost: 'Published route guides quote roughly USD 80–150 per vehicle; confirm the fare with the operator before you book.',
    note: 'The Hatton–Nuwara Eliya climb is a long series of hairpin bends — allow extra time in rain or fog.',
  },
  {
    id: 'no-fly',
    mode: 'Air travel — not practical',
    summary:
      'Nuwara Eliya has no commercial airport. The nearest international gateway is Bandaranaike (CMB); Mattala (HRI) is far with limited connections. Land transport is the realistic option.',
    steps: [
      'Reach CMB (or HRI) by air first, then continue by road or rail as above.',
      'Allow for the full 4–9 h surface leg — flying within Sri Lanka does not save meaningful time to the hill country.',
    ],
    time: 'Door-to-door by air + road is usually longer than the direct road/rail options.',
    cost: 'Several times the cost of rail or bus for no time saving.',
  },
];

export const localTransit = [
  {
    label: 'Town → park',
    text: 'A tuk-tuk or taxi from Nuwara Eliya town centre reaches the lake in about 5–10 minutes. Walking takes 20–35 minutes downhill out and uphill back.',
  },
  {
    label: 'Nanu Oya → town',
    text: 'The railway station sits about 20–30 minutes below the town; tuk-tuks meet every train. Agree the fare before you get in.',
  },
  {
    label: 'From Kandy or Ella',
    text: 'Both lie on the same line as Nanu Oya (Colombo–Kandy–Nanu Oya–Ella–Badulla), so train travellers from either direction change only at Nanu Oya.',
  },
];

export interface SeasonalRow {
  period: string;
  weather: string;
  water: string;
  wildlife: string;
  strategy: string;
}

export const seasonalRows: SeasonalRow[] = [
  {
    period: 'Jan – Mar · Dry, bright highland winter',
    weather:
      'Daytime averages 15–16°C; nights can fall to about 6°C and ground frost has been recorded in cold snaps — Nuwara Eliya routinely logs the island’s lowest temperatures. Rain is low (Mar ≈ 72 mm, the driest month) and March is the sunniest (≈ 6.5 h/day).',
    water:
      'The lake sits at its lowest, calmest level of the year; clear, still mornings are common and the margins are firm underfoot.',
    wildlife:
      'Cool, clear conditions suit waterbirds; the earliest risers see the most activity before day-trippers arrive.',
    strategy:
      'The best all-round window. Mornings are cold — bring layers — while midday light is bright and rain rarely disrupts plans.',
  },
  {
    period: 'Apr – Jun · Warming, then the southwest monsoon',
    weather:
      'Days warm to about 23°C (May is the warmest month on average); rainfall climbs through the quarter (Apr 134 → May 172 → Jun 168 mm) as the southwest monsoon brings afternoon showers and more cloud. A cyclone-risk window around 10–20 May can bring heavy rain and landslides.',
    water:
      'Inflow rises and the lake fills; expect higher, occasionally turbid water after downpours.',
    wildlife:
      'Birds are active at dawn before the clouds build; the hills turn lush and green.',
    strategy:
      'Travel at first light, carry a rain layer, and watch the mid-May storm window. Boat rides may pause in wind or thunder.',
  },
  {
    period: 'Jul – Sep · Southwest monsoon — cool, cloudy, windy',
    weather:
      'The coolest days of the year (about 19°C max) with the least sun (July ≈ 2 h/day) and 132–168 mm of rain; expect persistent cloud, drizzle and wind across the open lake.',
    water:
      'The lake is high and often turbid; wind chops the surface and floating weed/vegetation is more visible.',
    wildlife:
      'Overcast light is excellent for foliage and greenery, though clear reflections are rare.',
    strategy:
      'Keep walks short, pair the visit with an indoor tea-factory stop, and bring a windproof layer. Boats are limited in strong wind.',
  },
  {
    period: 'Oct – Dec · Wettest — storms and the second monsoon',
    weather:
      'The wettest quarter (Oct 247, Nov 226, Dec 183 mm; October has ~19 rain days) with afternoon thunderstorms and the Nov–Dec cyclone season; nights turn cool again by December.',
    water:
      'The lake is fullest; storm runoff can carry sediment and nutrients, so algal or weed patches become more likely.',
    wildlife:
      'Migratory waterbirds arrive from November and birding improves through to March.',
    strategy:
      'Keep mornings flexible, pack rain gear, and allow extra time for road/rail delays after storms — clear-sky odds are lowest now.',
  },
];

export interface RouteCard {
  audience: string;
  tagline: string;
  duration: string;
  window: string;
  steps: string[];
  cautions: string[];
}

export const audienceRoutes: RouteCard[] = [
  {
    audience: 'Families with children',
    tagline: 'සසුනු පවුලක් · Gentle, playful, close to facilities',
    duration: '2 – 3 hours',
    window: 'Mid-morning (08:00 – 11:00)',
    steps: [
      'Start at the main lawn and playground so kids can run before it gets busy.',
      'If the water is calm, take a short pedal-boat or paddle session together.',
      'Break for tea, roasted corn or a snack at a vendor near the shore.',
      'Finish with a flat lakeside stroll back to the entrance.',
    ],
    cautions: [
      'Keep children away from unguarded water edges — there is no lifeguard on all sections.',
      'Life jackets are provided for boat rides; ask the operator to fit them.',
      'Paved parts are stroller-friendly, but gravel and grass patches are uneven.',
    ],
  },
  {
    audience: 'Nature & photography',
    tagline: 'ජලය හා කුඩා සතුන් · Mist, light and birds',
    duration: '2 – 4 hours',
    window: 'Dawn 05:30 – 07:30, and again 17:00 – 18:15',
    steps: [
      'Arrive before first light for still water, mist and clean reflections.',
      'Work the shoreline for herons, kingfishers and ducks; overcast days still give soft, even light.',
      'Return for sunset when the hills catch warm light and the lake goes gold.',
      'Carry a long lens and, for moving water, a neutral-density filter.',
    ],
    cautions: [
      'Drones may need permission — check with the local authorities before flying, and never over crowds.',
      'Keep noise low at dawn so birds (and other visitors) are not disturbed.',
    ],
  },
  {
    audience: 'Low-mobility / seniors',
    tagline: 'සෙමින්, සන්සුන් · Flat, restful, frequent seats',
    duration: '1 – 2 hours',
    window: 'Weekday morning, after the rush',
    steps: [
      'Take a tuk-tuk to the closest lake gate rather than walking the full loop.',
      'Use the flatter lakeside stretches and the benches along the way.',
      'Keep the visit short and rest often; the town is a few minutes away for a café.',
    ],
    cautions: [
      'Some slopes near the road and gravel/root sections are uneven — confirm current path conditions with staff on site.',
      'Wheelchair access is not guaranteed everywhere; ask locally before you rely on it.',
    ],
  },
];

export const recommendedRoutes = [
  {
    title: 'Half-day · morning',
    duration: '3 – 4 hours',
    steps: [
      '06:00 — Arrive and walk the lakeside while the water is still and misty.',
      '07:00 — Boat or bike if the lake is calm; let children use the playground.',
      '08:30 — Tea and a snack at a shore vendor.',
      '09:30 — Leave before clouds and afternoon showers build.',
    ],
  },
  {
    title: 'Half-day · evening',
    duration: '2.5 – 3 hours',
    steps: [
      '15:30 — Arrive after the midday heat and crowds ease.',
      '16:00 — Lakeside walk and lawns; watch the light soften.',
      '17:30 — Settle on the shore for sunset.',
      '18:00 — Depart around closing time.',
    ],
  },
  {
    title: 'Full day · Gregory Park + hill country',
    duration: '7 – 8 hours',
    steps: [
      '06:00 — Dawn at the park for mist and calm water.',
      '09:00 — Breakfast in town (type-neutral: cafés and short-eat spots).',
      '10:30 — Victoria Park for flowers and birdwatching.',
      '12:30 — Lunch in town.',
      '14:00 — A tea estate / factory visit (book ahead) or Hakgala Botanical Garden.',
      '16:30 — Back to the lake for sunset.',
      '18:00 — Close the day at the shore.',
    ],
  },
];

export interface Facility {
  icon: string;
  label: string;
  detail: string;
  tip?: string;
}

export const facilities: Facility[] = [
  {
    icon: '🚻',
    label: 'Toilets (WC)',
    detail:
      'Public toilet blocks near the main entrance and parking are common at hill-country parks. They can be basic and are sometimes charged, so bring tissues and hand sanitiser; an accessible toilet is not guaranteed.',
    tip: 'Use the facilities on arrival — options thin out once you are out on the loop.',
  },
  {
    icon: '🅿️',
    label: 'Parking',
    detail:
      'Marked public parking and drop-off bays sit near the lake road. They fill early on weekends and holidays; do not stop on the live traffic lane. A tuk-tuk drop-off is the simplest option.',
    tip: 'Arrive before 09:00 or after 16:00 in peak season to find a space.',
  },
  {
    icon: '🍵',
    label: 'Food & drink',
    detail:
      'Vendors and small eateries beside the park sell tea, roasted corn, roti, rice & curry and short eats. For specific needs (vegetarian, vegan, halal, allergies) the town has more choice. Tap water is not recommended for drinking — choose bottled or filtered water.',
    tip: 'Keep all food waste out of the park; monkeys and stray dogs are quick to scavenge.',
  },
  {
    icon: '🛏️',
    label: 'Accommodation',
    detail:
      'Within about 1–3 km you will find guesthouses and small hotels, colonial-style bungalows, lakeside hotels and hillside tea-bungalow stays. Book ahead for December–April and July–August; nights are cold, so ask about heating or extra blankets.',
    tip: 'If you want a lake-view room, book well in advance — supply is limited.',
  },
  {
    icon: '🛒',
    label: 'Shops & supermarkets',
    detail:
      'The town centre has supermarkets, grocery stores, a fresh-produce market, bakeries and pharmacies. Buy water, snacks, a rain poncho and warm layers locally; many shops close early.',
    tip: 'Stock up before a full day out — the park itself has only small vendors.',
  },
  {
    icon: '⛽',
    label: 'Fuel & EV charging',
    detail:
      'Fuel stations (petrol/diesel) are in town and on the Kandy and Badulla roads; fill up before the climb. EV charging in the hill country is limited — confirm with your rental operator and plan ahead. There is no charging at the park.',
    tip: 'Top up the tank in town; the last reliable stretch of stations is before Hatton.',
  },
  {
    icon: '💳',
    label: 'Cash, cards & ATMs',
    detail:
      'ATMs are in town and cards are accepted at hotels and many restaurants, but keep cash for park fees, tuk-tuks and the small vendors who may be card-only-at-a-minimum.',
    tip: 'Carry small notes — tuk-tuk fares and snack stalls rarely give change for large bills.',
  },
  {
    icon: '🚑',
    label: 'Medical & safety',
    detail:
      'A hospital and pharmacies are in town. For emergencies dial 1990 (ambulance / Suwa Seriya) or 119 (police). The lake edge has unguarded sections — there is no lifeguard; boat operators provide life jackets and paths are slippery after rain.',
    tip: 'Do not feed monkeys or stray dogs; bites and snatches are avoidable by keeping food packed.',
  },
];

export const lakeScience = [
  'Lake Gregory is a shallow, man-made reservoir created in 1873, fed by a catchment of small streams and a few upstream reservoirs. Its level simply follows the monsoon rainfall: low and clear in the dry quarter, high and turbid after storms.',
  'The water supports a year-round community of waterbirds — cormorants, egrets, kingfishers, herons and ducks — plus migratory species that arrive from November to March. Lake fish and patches of floating vegetation (including water hyacinth) are part of the same system, alongside urban and catchment runoff.',
];

export const waterQuality = {
  note:
    'In 2026, findings quoted by the Central Environmental Authority (CEA) put the lake well above local guidelines — phosphate about 1.04 mg/L against a 0.20 mg/L guideline, nitrogen about 3.70 against 0.50, and a biochemical oxygen demand of 9.72 mg/L. The quoted causes were silted-up upstream reservoirs that lost their buffering, agrochemical and fertiliser runoff from surrounding farmland, and waste entering the water. A joint committee of the Environment Ministry, the Urban Development Authority and the Irrigation Department was reported to be working on remediation.',
  implication:
    'Practical takeaway for visitors: do not drink or swim in the lake water, and do not wash or dispose of anything in it. Treat the shoreline as a place to look, not to bathe.',
};

export const responsibilityPoints = [
  {
    title: 'Carry out what you carry in',
    text: 'Take all litter home or to a bin. Plastic, fishing line and food wrappers harm birds and fish long after you leave.',
  },
  {
    title: 'Do not feed the wildlife',
    text: 'Bread and scraps change water quality and make birds, monkeys and stray dogs dependent and bold. Let them keep their wild routines.',
  },
  {
    title: 'Stay on the paths',
    text: 'Lawns and banks recover slowly; keeping to marked routes protects the margin plants that hold the soil during monsoon rain.',
  },
  {
    title: 'Keep dawn quiet',
    text: 'Early hours are for birding and photography. Low voices and no drones-over-crowds keep the shore peaceful for everyone.',
  },
  {
    title: 'Drones & photography',
    text: 'Recreational drones may need permission from the local authorities — check before flying and never over people. Ask before photographing other visitors.',
  },
  {
    title: 'Respect the place',
    text: 'No open fires or barbecues, no collecting plants or stones, and keep pets under control. The lake is also a water-management structure, not only a park.',
  },
];

export interface HistoryEntry {
  year: string;
  title: string;
  detail: string;
}

export const historyTimeline: HistoryEntry[] = [
  {
    year: '1818',
    title: 'A colonial hill retreat is opened',
    detail:
      'The modern history of Nuwara Eliya begins in 1818, when British surgeon Dr John Davy recorded the cool plain. Planters and officers developed it as a highland escape from the colonial lowlands — the start of the "Little England" reputation.',
  },
  {
    year: '1840s–50s',
    title: 'Roads, gardens and the hill-station character',
    detail:
      'As Government Agent of the district, Samuel Baker pushed through roads, drainage and the town’s early gardens. The club, racecourse and golf that followed gave Nuwara Eliya its leisure-resort feel.',
  },
  {
    year: '1873',
    title: 'The bog becomes Lake Gregory',
    detail:
      'The marshy ground at the edge of town was dammed into a reservoir and named after Governor Sir William Gregory (in office 1872–1877). The water body — and the name — still define the park today.',
  },
  {
    year: 'Late 1800s',
    title: 'Victoria Park and the social season',
    detail:
      'The town’s flower garden was laid out and named for Queen Victoria, and Nuwara Eliya settled into its role as a social and sporting retreat for the highlands.',
  },
  {
    year: 'Today',
    title: 'A public park and a working lake',
    detail:
      'Gregory Park is now a public garden and lake shore for walking, boating and family outings — while the reservoir behind it still manages highland water. In 2026 its water quality drew official attention (see Science & responsibility).',
  },
];

export const legendNotes = [
  {
    title: 'The Ramayana tradition',
    detail:
      'Local tradition links the Hakgala hill a few kilometres south to the Ramayana: the place where Hanuman is said to have dropped a herb from the Himalayas. The Seetha Amman Kovil at Seetha Eliya is a nearby pilgrimage site tied to the same story. These are legends and living devotion, not established history — offered here as the cultural memory that surrounds the lake.',
  },
  {
    title: 'A lake with two names',
    detail:
      'Visitors meet both "Gregory Park" (the garden and shore) and "Lake Gregory" / "Gregory Reservoir" (the water). They are the same place seen as park and as lake — useful to know when asking for directions or reading old guidebooks.',
  },
];

/** Extra source rows appended to the page Sources section for E-E-A-T. */
export const newSourceRows = [
  {
    title: 'Live weather & 7-day forecast',
    text: 'The live conditions and the 7-day outlook on this page are produced from open numerical-weather-prediction data, refreshed on the server about every 15 minutes and cached. The 30-year climate normals above are the baseline reference.',
    linkLabel: 'Open-Meteo (CC BY 4.0)',
    href: 'https://open-meteo.com/',
  },
  {
    title: 'Climate normals · 1991–2020',
    text: 'Monthly averages for Nuwara Eliya (temperature, rainfall, sunshine) follow the Sri Lanka Department of Meteorology’s 30-year climate normals; the seasonal table on this page is built from those published normals.',
    linkLabel: 'Department of Meteorology, Sri Lanka',
    href: officialLinks.meteo.href,
  },
  {
    title: 'Lake water quality · 2026',
    text: 'Reported Central Environmental Authority findings on phosphate, nitrogen and biochemical oxygen demand, and the joint remediation committee, as carried by Sri Lankan news reporting in August 2026. Quoted here as secondary reporting, not primary data.',
    linkLabel: null,
    href: null,
  },
  {
    title: 'Getting here · rail & bus',
    text: 'Official seat reservation and timetable information for the Colombo Fort → Nanu Oya hill line, and the National Transport Commission for intercity bus services.',
    linkLabel: 'Sri Lanka Railways · National Transport Commission',
    href: officialLinks.railway.href,
  },
];
