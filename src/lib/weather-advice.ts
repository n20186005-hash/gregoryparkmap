/**
 * Visitor-facing advice engine for the live weather module.
 *
 * Core idea: never make the visitor translate numbers into actions. Each rule
 * below reads the forecast fields (condition, temps, wind, gusts, UV, rain
 * probability) and emits a short, plain-language action — or nothing at all.
 * Unmet rules stay hidden; nothing is rendered "just in case".
 *
 * Context tuning: Gregory Park is a highland lake garden at ~1,868 m — cool
 * nights, big day–night swings, strong sun even in cool air, lake boats and
 * pony rides that pause in rain/wind, slippery lawns and mountain roads.
 * Thresholds (rain 30/60/70 %, wind 29/50 km/h, UV 5, swing 8 °C) are adapted
 * from standard visitor-guidance patterns to this mountain-lake setting.
 */

import type { WeatherReport } from './weather';

export interface AdviceItem {
  si: string;
  en: string;
  icon: string;
}

export interface AdviceBundle {
  /** Severe flags — rendered topmost, red, and de-emphasise the rest. */
  risks: AdviceItem[];
  wear: AdviceItem[];
  activity: AdviceItem[];
  carry: AdviceItem[];
}

const RAINY = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82]);
const THUNDER = new Set([95, 96, 99]);
const HEAVY_RAIN = new Set([65, 67, 82]);
const FOG = new Set([45, 48]);
const CLEAR = new Set([0, 1]);
const OVERCAST = new Set([2, 3]);

/** Beaufort-style thresholds in km/h: 5 = ~29, 6 = ~39, 7 = ~50. */
const WIND_BREEZY = 29;
const WIND_STRONG = 50;
const GUST_STRONG = 60;

export function buildAdvice(r: WeatherReport): AdviceBundle {
  const risks: AdviceItem[] = [];
  const wear: AdviceItem[] = [];
  const activity: AdviceItem[] = [];
  const carry: AdviceItem[] = [];

  const now = r.now;
  if (!now) return { risks, wear, activity, carry };

  const today = r.days[0];
  const maxC = today ? today.maxC : now.tempC;
  const minC = today ? today.minC : now.tempC;
  const swing = Math.max(0, Math.round(maxC - minC));

  // Best available rain signal: today's max probability vs. next-12-hour peak.
  const prob = Math.max(
    today && today.precipProb >= 0 ? today.precipProb : -1,
    r.rainNext12h,
  );

  const uv =
    now.isDay && typeof now.uv === 'number'
      ? now.uv
      : today?.uvMax != null
        ? today.uvMax
        : null;

  const raining = RAINY.has(now.code);
  const thunder = THUNDER.has(now.code);
  const heavy = HEAVY_RAIN.has(now.code) || (prob >= 70 && (today?.precipMm ?? 0) >= 10);
  const fog = FOG.has(now.code);
  const windy = now.windKmh >= WIND_BREEZY || now.gustKmh >= 38;
  const veryWindy = now.windKmh >= WIND_STRONG || now.gustKmh >= GUST_STRONG;
  const rainLikely = prob >= 60 || raining;
  const rainPossible = prob >= 30;
  const sunny = CLEAR.has(now.code);
  const cloudy = OVERCAST.has(now.code);

  // ---- Risks (only when triggered; highest priority) ----------------------
  if (thunder) {
    risks.push({
      icon: '⛈️',
      si: 'ගිගිරුම් සහිත වැසි — ජල ක්‍රීඩා නවතියි; විවෘත වැව ඉවුරේ සහ තනි ගස් යට සිටීමෙන් වළකින්න',
      en: 'Thunderstorms — water activities stop; keep off the open lakeshore and isolated trees',
    });
  } else if (heavy) {
    risks.push({
      icon: '🌧️',
      si: 'දැඩි වැසි — කඳුකර මාර්ග මඩ වේ; අඩු බිම්, ඇළ මාර්ග සහ බෑවුම් සිටීමෙන් වළකින්න',
      en: 'Heavy rain — hill roads turn muddy; avoid low ground, streams and steep slopes',
    });
  }
  if (veryWindy) {
    risks.push({
      icon: '💨',
      si: `තද සුළං (සුළං පහර ~${now.gustKmh} km/h) — බෝට්ටි ධාවනය නැවතිය හැක; විවෘත වැව ඉවුරේ ප්‍රවේශමෙන්`,
      en: `Strong winds (gusts ~${now.gustKmh} km/h) — boats may be suspended; take care on the open shore`,
    });
  }
  if (fog) {
    risks.push({
      icon: '🌫️',
      si: 'මීදුම — දෘශ්‍යතාව අඩුයි; වාහන පැදවීමේදී අමතර ප්‍රවේශම් වන්න',
      en: 'Fog — visibility is poor; drive with extra care on the hill roads',
    });
  }
  if (minC <= 6 || now.feelsC <= 5) {
    risks.push({
      icon: '🥶',
      si: `සීතල රාත්‍රියක් (අවම ${minC}°C දක්වා) — උණුසුම් ලේයර් සහ සායක් අනිවාර්යයි`,
      en: `Cold night (down to ${minC}°C) — warm layers and a scarf are essential`,
    });
  }

  // ---- Wear ---------------------------------------------------------------
  if (swing >= 8) {
    wear.push({
      icon: '🧥',
      si: `දවස–රාත්‍රි ${swing}°C උෂ්ණතා වෙනස — එකතු/ඉවත් කළ හැකි ලේයර් ඇඳින්න`,
      en: `${swing}°C day–night swing — wear layers you can add or shed`,
    });
  }
  if (maxC <= 15) {
    wear.push({
      icon: '🧣',
      si: 'සවසට සීතල වැටේ — උණුසුම් ජැකට් එකක් රැගෙන යන්න',
      en: 'Evenings turn cold — bring a warm jacket',
    });
  }
  if (rainLikely) {
    wear.push({
      icon: '🧥',
      si: 'වැසි අවකාශය ඉහළයි — කුඩයකට වඩා වැසි ජැකට් එකක් හොඳයි',
      en: 'Rain is likely — a rain jacket beats an umbrella here',
    });
  } else if (sunny && maxC < 24) {
    wear.push({
      icon: '👕',
      si: 'ඉර උණුසුම්, වාතය සිසිල් — සැහැල්ලු ඇඳුම් + ලා ජැකට් එකක්',
      en: 'Sun warm, air cool — light clothes plus a light jacket',
    });
  }

  // ---- Activity -----------------------------------------------------------
  if (thunder || heavy) {
    activity.push({
      icon: '🚣',
      si: 'බෝට්ටි සහ අශ්ව චාරික නැවතියි — තේ කර්මාන්තශාලාවක් වැනි වහල යට අත්දැකීමකට සැලසුම මාරු කරන්න',
      en: 'Boats and pony rides pause — shift plans to covered experiences like a tea factory',
    });
  } else if (rainLikely) {
    activity.push({
      icon: '🏛️',
      si: 'වැසි වැඩි විට බෝට්ටි නොයයි — පළමුව නගරයේ දේවල්, පසුව වැව',
      en: 'Boats stop in persistent rain — do the town first, the lake later',
    });
  } else if (raining || rainPossible) {
    activity.push({
      icon: '👟',
      si: 'තණ බිම සහ පඩි පෙති ලිස්සයි — ග්‍රිප් ඇති සපත්තු පැලඳින්න',
      en: 'Lawns and steps get slippery — wear shoes with grip',
    });
  }
  if (windy && !thunder && !heavy) {
    activity.push({
      icon: '💨',
      si: 'සුළං මධ්‍යම-තද — බෝට්ටි ධාවනතාව කලින් තහවුරු කරගන්න; තොප්පි රැගෙන යයි',
      en: 'Breezy to gusty — check boats are running first; hats fly off',
    });
  }
  if (sunny && !rainLikely) {
    activity.push({
      icon: '☀️',
      si: 'අහස පැහැදිලියි — වැව දර්ශන, බෝට්ටි චාරික සහ තණ බිම හොඳමයි; ඡායාරූප සඳහා උදෑසන/සවස ආලෝකය වඩාත් සුන්දරයි',
      en: 'Clear skies — lake views, boats and lawns at their best; morning/afternoon light is loveliest for photos',
    });
  } else if (cloudy && !rainLikely) {
    activity.push({
      icon: '📷',
      si: 'වළාකුළු — මෘදු ආලෝකය ඡායාරූප සඳහා වඩාත් සුදුසුයි; දිගු ඇවිදීමට හොඳයි',
      en: 'Overcast — soft light flatters photos; comfortable for long walks',
    });
  }
  if (uv != null && uv >= 5 && !rainLikely) {
    activity.push({
      icon: '😎',
      si: 'සිසිල් කඳුකර වාතයේදීත ඉර තදයි — මධ්‍යහ්න සූර්ය කාලය සීමා කරන්න',
      en: 'Sun is strong even in cool mountain air — ease off midday exposure',
    });
  }

  // ---- Carry --------------------------------------------------------------
  if (rainLikely) {
    carry.push(
      veryWindy
        ? {
            icon: '🎒',
            si: 'වැසි ජැකට් එකක් — කුඩයක් නොවේ, සුළං නිසා',
            en: 'A rain jacket, not an umbrella — too windy',
          }
        : {
            icon: '🎒',
            si: 'කුඩයක් හෝ වැසි ජැකට් එකක්',
            en: 'An umbrella or a rain jacket',
          },
    );
  } else if (rainPossible) {
    carry.push({
      icon: '🎒',
      si: 'කුඩා කුඩයක් — අවකාශයක් තිබුණත්',
      en: 'A folding umbrella, just in case',
    });
  }
  if (uv != null && uv >= 5) {
    carry.push({
      icon: '🎒',
      si: 'සන්ස්ක්‍රීන්, කණ්ණාඩි සහ තොප්පියක්',
      en: 'Sunscreen, sunglasses and a hat',
    });
  }
  if (maxC <= 15 || now.feelsC <= 10) {
    carry.push({
      icon: '🎒',
      si: 'උණුසුම් ජැකට් + සායක් (ළමුන්ට අමතර ලේයර් එකක්)',
      en: 'A warm jacket and a scarf (an extra layer for kids)',
    });
  }
  if (carry.length === 0) {
    carry.push({
      icon: '🎒',
      si: 'අද සැහැල්ලු දිනයි — ජල බෝතලයක් ප්‍රමාණවත්',
      en: 'A light day — a water bottle is all you need',
    });
  }

  return {
    risks: risks.slice(0, 3),
    wear: wear.slice(0, 3),
    activity: activity.slice(0, 3),
    carry: carry.slice(0, 4),
  };
}
