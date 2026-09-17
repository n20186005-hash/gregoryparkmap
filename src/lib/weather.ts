/**
 * Server-side weather for Gregory Park.
 *
 * Fetched at request time on the Cloudflare Worker (output: 'server'), then
 * cached in memory and via CDN Cache-Control so the same visitor is not
 * re-fetched on every navigation. If the upstream fetch fails we fall back to
 * the 30-year climate normals for the current month — never to invented
 * numbers. No provider name is emitted to the page on purpose.
 */

import { attraction } from '../data/attraction';
import { monthlyNormals } from '../data/visitor-guide';

const API = 'https://api.open-meteo.com/v1/forecast';
const TZ = 'Asia/Colombo';
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
  source: 'live' | 'stale' | 'climatology';
  fetchedAt: string;
  /** Typical range for the current month, for the offline fallback card. */
  typical?: { month: string; minC: number; maxC: number; rainMm: number };
}

/** WMO weather codes → short label + icon. Kept neutral; no provider text. */
export const wmo: Record<number, { en: string; si: string; icon: string }> = {
  0: { en: 'Clear sky', si: 'පැහැදිලි අහස', icon: '☀️' },
  1: { en: 'Mainly clear', si: 'බොහෝ දුරට පැහැදිලි', icon: '🌤️' },
  2: { en: 'Partly cloudy', si: 'වළාකුළු සහිත', icon: '⛅' },
  3: { en: 'Overcast', si: 'වළාකුළු වැසුණු', icon: '☁️' },
  45: { en: 'Fog', si: 'මීදුම', icon: '🌫️' },
  48: { en: 'Rime fog', si: 'හිම තුහින සහිත මීදුම', icon: '🌫️' },
  51: { en: 'Light drizzle', si: 'සැහැල්ලු ඉසිඹිය', icon: '🌦️' },
  53: { en: 'Drizzle', si: 'ඉසිඹිය', icon: '🌦️' },
  55: { en: 'Dense drizzle', si: 'දැඩි ඉසිඹිය', icon: '🌧️' },
  56: { en: 'Freezing drizzle', si: 'හිම ඉසිඹිය', icon: '🌧️' },
  57: { en: 'Freezing drizzle', si: 'හිම ඉසිඹිය', icon: '🌧️' },
  61: { en: 'Light rain', si: 'සැහැල්ලු වැසි', icon: '🌦️' },
  63: { en: 'Rain', si: 'වැසි', icon: '🌧️' },
  65: { en: 'Heavy rain', si: 'දැඩි වැසි', icon: '🌧️' },
  66: { en: 'Freezing rain', si: 'හිම වැසි', icon: '🌧️' },
  67: { en: 'Freezing rain', si: 'හිම වැසි', icon: '🌧️' },
  71: { en: 'Light snow', si: 'සැහැල්ලු හිම', icon: '❄️' },
  73: { en: 'Snow', si: 'හිම', icon: '❄️' },
  75: { en: 'Heavy snow', si: 'දැඩි හිම', icon: '❄️' },
  77: { en: 'Snow grains', si: 'හිම පිටි', icon: '❄️' },
  80: { en: 'Rain showers', si: 'වැසි කුඩ', icon: '🌦️' },
  81: { en: 'Rain showers', si: 'වැසි කුඩ', icon: '🌧️' },
  82: { en: 'Violent showers', si: 'දැඩි වැසි කුඩ', icon: '⛈️' },
  85: { en: 'Snow showers', si: 'හිම කුඩ', icon: '❄️' },
  86: { en: 'Snow showers', si: 'හිම කුඩ', icon: '❄️' },
  95: { en: 'Thunderstorm', si: 'ගිගිරි වැසි', icon: '⛈️' },
  96: { en: 'Thunderstorm + hail', si: 'ගිගිරි වැසි සහ කැට', icon: '⛈️' },
  99: { en: 'Thunderstorm + hail', si: 'ගිගිරි වැසි සහ කැට', icon: '⛈️' },
};

let cache: { at: number; report: WeatherReport } | null = null;
let inflight: Promise<WeatherReport> | null = null;

function buildUrl(): string {
  const p = new URLSearchParams({
    latitude: String(attraction.latitude),
    longitude: String(attraction.longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_gusts_10m,uv_index',
    hourly: 'temperature_2m,precipitation_probability,weather_code',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max,sunrise,sunset',
    timezone: TZ,
    forecast_days: '7',
    past_days: '0',
  });
  return `${API}?${p.toString()}`;
}

function clock(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: TZ,
    }).format(new Date(iso));
  } catch {
    const m = iso.match(/T(\d{2}:\d{2})/);
    return m ? m[1] : '';
  }
}

async function fetchLive(): Promise<WeatherReport | null> {
  try {
    const res = await fetch(buildUrl(), { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) return null;
    const d = await res.json();
    if (!d?.current || !d?.daily?.time?.length) return null;

    const c = d.current;
    const dd = d.daily;
    const days: WeatherDay[] = [];
    for (let i = 0; i < Math.min(dd.time.length, 7); i++) {
      days.push({
        date: dd.time[i],
        code: dd.weather_code[i],
        maxC: Math.round(dd.temperature_2m_max[i]),
        minC: Math.round(dd.temperature_2m_min[i]),
        precipMm: Math.round((dd.precipitation_sum[i] ?? 0) * 10) / 10,
        precipProb: typeof dd.precipitation_probability_max[i] === 'number' ? dd.precipitation_probability_max[i] : -1,
        uvMax: typeof dd.uv_index_max[i] === 'number' ? Math.round(dd.uv_index_max[i]) : null,
        sunrise: clock(dd.sunrise[i]),
        sunset: clock(dd.sunset[i]),
      });
    }

    let rainNext12h = -1;
    if (Array.isArray(d.hourly?.time)) {
      const nowMs = Date.now();
      for (let i = 0; i < d.hourly.time.length; i++) {
        const diffH = (new Date(d.hourly.time[i]).getTime() - nowMs) / 3_600_000;
        if (diffH >= -1 && diffH <= 12) {
          const v = d.hourly.precipitation_probability[i];
          if (typeof v === 'number' && v > rainNext12h) rainNext12h = v;
        }
      }
    }

    const now: WeatherNow = {
      tempC: Math.round(c.temperature_2m),
      feelsC: Math.round(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      windKmh: Math.round(c.wind_speed_10m),
      gustKmh: Math.round(c.wind_gusts_10m),
      precipMm: c.precipitation ?? 0,
      code: c.weather_code,
      isDay: c.is_day === 1,
      uv: typeof c.uv_index === 'number' ? Math.round(c.uv_index * 10) / 10 : null,
      localTime: clock(c.time),
    };

    return { now, days, rainNext12h, source: 'live', fetchedAt: new Date().toISOString() };
  } catch {
    return null;
  }
}

function climatologyReport(): WeatherReport {
  const n = monthlyNormals[new Date().getMonth()];
  return {
    now: null,
    days: [],
    rainNext12h: -1,
    source: 'climatology',
    fetchedAt: new Date().toISOString(),
    typical: { month: n.m, minC: n.minC, maxC: n.maxC, rainMm: n.rainMm },
  };
}

export async function getWeather(): Promise<WeatherReport> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.report;
  if (!inflight) {
    inflight = (async () => {
      const live = await fetchLive();
      if (live) return live;
      if (cache) return { ...cache.report, source: 'stale' };
      return climatologyReport();
    })().finally(() => {
      inflight = null;
    });
  }
  const report = await inflight;
  if (report.source === 'live') cache = { at: now, report };
  return report;
}
