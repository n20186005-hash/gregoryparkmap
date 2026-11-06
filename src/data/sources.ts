import { attraction } from './attraction';

/** Primary sources and the scope of each, shown on the standalone /sources page. */
export const sources: Array<[string, string, string]> = [
  [
    'Central Province Tourism Department — Ceylon Tea Trail',
    'https://tourism.cp.gov.lk/en/tour-itinerary/ceylon-tea-trail',
    'Its historical account dates the lake to 1874 and describes damming the Talagala and Nanu Oya streams. This is historical context, not current operating information.',
  ],
  [
    'Nuwara Eliya Municipal Council — town history',
    'https://nuwaraeliya.mc.gov.lk/index.php/information/about/history',
    'Municipal history places the lake’s creation during William Gregory’s governorship, 1872–1877. Exact years differ between published accounts; this guide identifies the source rather than merging the dates.',
  ],
  [
    'Central Environmental Authority — Lake Gregory Environmental Protection Area',
    'https://www.cea.lk/web/?id=1154&layout=edit&option=com_content&view=article',
    'Identifies the protected wetland, Gazette 1487/10 of 5 March 2007, biodiversity and pressures from urban/agricultural runoff and invasive plants. The page is marked updated 5 February 2018; it is not a current water test or access notice.',
  ],
  [
    'Municipal Gazette — charges for 2022',
    'https://documents.gov.lk/view/gazettes/2021/12/2021-12-24%28IV-B%29E.pdf',
    'A historical municipal charge schedule. Do not use its rates as a current admission tariff.',
  ],
  [
    'Nuwara Eliya Municipal Council',
    'https://nuwaraeliya.mc.gov.lk/',
    'Local authority contact and notices. This independent guide cannot confirm gate conditions or make bookings.',
  ],
  [
    'Google Maps — Gregory Park',
    attraction.mapsShareUrl,
    'Manually checked on 29 October 2026: 4.5/5 from 16,570 reviews, Nuwara Eliya. The day’s closing display was 21:30. A dated third-party snapshot, not automatically updated or operator-verified hours.',
  ],
];
