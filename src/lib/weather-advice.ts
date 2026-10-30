import type { WeatherReport } from "./weather";
interface Item {
  si: string;
  en: string;
  icon: string;
}
export function buildAdvice(r: WeatherReport) {
  const risks: Item[] = [],
    wear: Item[] = [],
    activity: Item[] = [],
    carry: Item[] = [];
  if (!r.now) return { risks, wear, activity, carry };
  const n = r.now,
    d = r.days[0];
  if ([95, 96, 99].includes(n.code))
    risks.push({
      si: "ගිගිරුම් අනාවැකිය — නිල අවවාද බලන්න; විවෘත ජලය අසල සැලසුම් නැවත සලකා බලන්න.",
      en: "Thunderstorm model signal: check official warnings and reconsider exposed lakeside plans.",
      icon: "⛈️",
    });
  else if ([65, 67, 82].includes(n.code))
    risks.push({
      si: "දැඩි වැසි අනාවැකිය — නිල අවවාද සහ මාර්ග තත්ත්වය පරීක්ෂා කරන්න.",
      en: "Heavy-rain model signal: check official warnings and route conditions.",
      icon: "🌧️",
    });
  if (n.gustKmh >= 60 || n.windKmh >= 50)
    risks.push({
      si: "තද සුළං අනාවැකිය — පිටත්වීමට පෙර නිල තොරතුරු බලන්න.",
      en: "Strong-wind model signal: check official information before departure.",
      icon: "💨",
    });
  if ([45, 48].includes(n.code))
    risks.push({
      si: "මීදුම අනාවැකිය — මාර්ග දෘශ්‍යතාව ගැන සැලකිලිමත් වන්න.",
      en: "Fog model signal: allow for reduced road visibility.",
      icon: "🌫️",
    });
  if (n.tempC <= 15 || n.feelsC <= 10)
    wear.push({
      si: "උණුසුම් ඇඳුම් ලේයරයක් රැගෙන යන්න.",
      en: "Bring a warm layer for the forecast temperature.",
      icon: "🧥",
    });
  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(
      n.code
    ) ||
    (d?.precipProb ?? 0) >= 60
  )
    carry.push({
      si: "වැසි ජැකට් එකක් රැගෙන යන්න.",
      en: "Bring rain protection; rain probability is not a certainty.",
      icon: "🎒",
    });
  if ((d?.uvMax ?? 0) >= 5)
    carry.push({
      si: "හිරු ආවරණ, තොප්පියක් සහ කණ්ණාඩි රැගෙන යන්න.",
      en: "Bring sun protection for the forecast UV maximum.",
      icon: "😎",
    });
  return { risks, wear, activity, carry };
}
