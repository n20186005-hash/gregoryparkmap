import { attraction } from "../data/attraction";

const API = "https://api.open-meteo.com/v1/forecast";
const TZ = "Asia/Colombo";
const TTL_MS = 15 * 60 * 1000;
const TIMEOUT_MS = 4500;

export interface WeatherNow {
  tempC: number;
  feelsC: number;
  humidity: number;
  windKmh: number;
  gustKmh: number;
  precipMm: number;
  code: number;
  isDay: boolean;
  uv: number | null;
  localTime: string;
}

export interface WeatherDay {
  date: string;
  code: number;
  maxC: number;
  minC: number;
  precipMm: number;
  precipProb: number;
  uvMax: number | null;
  sunrise: string;
  sunset: string;
}

export interface WeatherReport {
  now: WeatherNow | null;
  days: WeatherDay[];
  rainNext12h: number;
  source: "live" | "unavailable";
  fetchedAt: string;
  modelTime?: string;
}

/** WMO weather codes → short label + icon. Kept neutral; no provider text. */
export const wmo: Record<number, { en: string; si: string; icon: string }> = {
  0: { en: "Clear sky", si: "පැහැදිලි අහස", icon: "☀️" },
  1: { en: "Mainly clear", si: "බොහෝ දුරට පැහැදිලි", icon: "🌤️" },
  2: { en: "Partly cloudy", si: "වළාකුළු සහිත", icon: "⛅" },
  3: { en: "Overcast", si: "වළාකුළු වැසුණු", icon: "☁️" },
  45: { en: "Fog", si: "මීදුම", icon: "🌫️" },
  48: { en: "Rime fog", si: "හිම තුහින සහිත මීදුම", icon: "🌫️" },
  51: { en: "Light drizzle", si: "සැහැල්ලු ඉසිඹිය", icon: "🌦️" },
  53: { en: "Drizzle", si: "ඉසිඹිය", icon: "🌦️" },
  55: { en: "Dense drizzle", si: "දැඩි ඉසිඹිය", icon: "🌧️" },
  56: { en: "Freezing drizzle", si: "හිම ඉසිඹිය", icon: "🌧️" },
  57: { en: "Freezing drizzle", si: "හිම ඉසිඹිය", icon: "🌧️" },
  61: { en: "Light rain", si: "සැහැල්ලු වැසි", icon: "🌦️" },
  63: { en: "Rain", si: "වැසි", icon: "🌧️" },
  65: { en: "Heavy rain", si: "දැඩි වැසි", icon: "🌧️" },
  66: { en: "Freezing rain", si: "හිම වැසි", icon: "🌧️" },
  67: { en: "Freezing rain", si: "හිම වැසි", icon: "🌧️" },
  71: { en: "Light snow", si: "සැහැල්ලු හිම", icon: "❄️" },
  73: { en: "Snow", si: "හිම", icon: "❄️" },
  75: { en: "Heavy snow", si: "දැඩි හිම", icon: "❄️" },
  77: { en: "Snow grains", si: "හිම පිටි", icon: "❄️" },
  80: { en: "Rain showers", si: "වැසි කුඩ", icon: "🌦️" },
  81: { en: "Rain showers", si: "වැසි කුඩ", icon: "🌧️" },
  82: { en: "Violent showers", si: "දැඩි වැසි කුඩ", icon: "⛈️" },
  85: { en: "Snow showers", si: "හිම කුඩ", icon: "❄️" },
  86: { en: "Snow showers", si: "හිම කුඩ", icon: "❄️" },
  95: { en: "Thunderstorm", si: "ගිගිරි වැසි", icon: "⛈️" },
  96: { en: "Thunderstorm + hail", si: "ගිගිරි වැසි සහ කැට", icon: "⛈️" },
  99: { en: "Thunderstorm + hail", si: "ගිගිරි වැසි සහ කැට", icon: "⛈️" },
};

let cache: { at: number; report: WeatherReport } | null = null;
let inflight: Promise<WeatherReport> | null = null;
const finite = (x: unknown): x is number =>
  typeof x === "number" && Number.isFinite(x);
const range = (x: unknown, min: number, max: number): x is number =>
  finite(x) && x >= min && x <= max;
const epoch = (iso: string) => Date.parse(iso + "+05:30");
export function parseWeather(d: any, at = Date.now()): WeatherReport | null {
  const c = d?.current,
    dd = d?.daily;
  if (
    !c ||
    !dd ||
    d.timezone !== "Asia/Colombo" ||
    typeof c.time !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(c.time)
  )
    return null;
  const model = epoch(c.time);
  if (
    !Number.isFinite(model) ||
    at - model > 3 * 3600000 ||
    model - at > 3600000
  )
    return null;
  if (
    !range(c.temperature_2m, -50, 60) ||
    !range(c.apparent_temperature, -60, 70) ||
    !range(c.relative_humidity_2m, 0, 100) ||
    !range(c.wind_speed_10m, 0, 400) ||
    !range(c.wind_gusts_10m, 0, 500) ||
    !range(c.precipitation, 0, 1000) ||
    !wmo[c.weather_code] ||
    ![0, 1].includes(c.is_day)
  )
    return null;
  const localToday = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(at));
  if (
    !Array.isArray(dd.time) ||
    dd.time.length < 7 ||
    dd.time[0] !== localToday
  )
    return null;
  const days: WeatherDay[] = [];
  for (let i = 0; i < 7; i++) {
    const date = dd.time[i];
    if (
      typeof date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Date.parse(date) - Date.parse(dd.time[0]) !== i * 86400000 ||
      !wmo[dd.weather_code?.[i]] ||
      !range(dd.temperature_2m_max?.[i], -50, 60) ||
      !range(dd.temperature_2m_min?.[i], -50, 60) ||
      dd.temperature_2m_min[i] > dd.temperature_2m_max[i] ||
      !range(dd.precipitation_sum?.[i], 0, 2000) ||
      !range(dd.precipitation_probability_max?.[i], 0, 100)
    )
      return null;
    days.push({
      date,
      code: dd.weather_code[i],
      maxC: Math.round(dd.temperature_2m_max[i]),
      minC: Math.round(dd.temperature_2m_min[i]),
      precipMm: dd.precipitation_sum[i],
      precipProb: dd.precipitation_probability_max[i],
      uvMax: range(dd.uv_index_max?.[i], 0, 30) ? dd.uv_index_max[i] : null,
      sunrise: "",
      sunset: "",
    });
  }
  return {
    now: {
      tempC: Math.round(c.temperature_2m),
      feelsC: Math.round(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      windKmh: Math.round(c.wind_speed_10m),
      gustKmh: Math.round(c.wind_gusts_10m),
      precipMm: c.precipitation,
      code: c.weather_code,
      isDay: c.is_day === 1,
      uv: null,
      localTime: c.time.slice(11),
    },
    days,
    rainNext12h: -1,
    source: "live",
    modelTime: c.time,
    fetchedAt: new Date(at).toISOString(),
  };
}
export async function getWeather(): Promise<WeatherReport> {
  const at = Date.now();
  if (
    cache &&
    at - cache.at < TTL_MS &&
    cache.report.now &&
    at - epoch(cache.report.modelTime ?? "") < 3 * 3600000
  )
    return cache.report;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const params = new URLSearchParams({
        latitude: String(attraction.latitude),
        longitude: String(attraction.longitude),
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_gusts_10m",
        daily:
          "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max",
        timezone: TZ,
        forecast_days: "7",
      });
      const res = await fetch(API + "?" + params, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.ok) {
        const report = parseWeather(await res.json());
        if (report) {
          cache = { at: Date.now(), report };
          return report;
        }
      }
    } catch {
      /* No stale or fabricated fallback. */
    }
    cache = null;
    return {
      now: null,
      days: [],
      rainNext12h: -1,
      source: "unavailable" as const,
      fetchedAt: new Date().toISOString(),
    };
  })().finally(() => {
    inflight = null;
  });
  return inflight;
}
