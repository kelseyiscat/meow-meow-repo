// SkyCast — tiny demo weather logic (no real API, just mock data for testing).

const MOCK = {
  "san francisco": { cond: "Partly cloudy", icon: "⛅", temp: 18, humidity: 62, wind: 12 },
  "london":        { cond: "Light rain",    icon: "🌧️", temp: 11, humidity: 81, wind: 18 },
  "tokyo":         { cond: "Clear sky",     icon: "☀️", temp: 24, humidity: 48, wind: 8  },
  "reykjavik":     { cond: "Snow showers",  icon: "🌨️", temp: -2, humidity: 88, wind: 27 },
  "cairo":         { cond: "Sunny",         icon: "🔆", temp: 33, humidity: 20, wind: 10 },
  "sydney":        { cond: "Thunderstorm",  icon: "⛈️", temp: 22, humidity: 70, wind: 24 },
};

const CONDITIONS = [
  { cond: "Sunny",        icon: "☀️" },
  { cond: "Partly cloudy", icon: "⛅" },
  { cond: "Cloudy",       icon: "☁️" },
  { cond: "Light rain",   icon: "🌧️" },
  { cond: "Thunderstorm", icon: "⛈️" },
  { cond: "Snowy",        icon: "🌨️" },
];

// Deterministic-ish pseudo weather for unknown cities (so it feels responsive).
function fakeWeatherFor(name) {
  let seed = 0;
  for (const ch of name) seed = (seed + ch.charCodeAt(0)) % 997;
  const c = CONDITIONS[seed % CONDITIONS.length];
  return {
    cond: c.cond,
    icon: c.icon,
    temp: (seed % 38) - 5,       // -5..32
    humidity: 35 + (seed % 55),  // 35..89
    wind: 5 + (seed % 30),       // 5..34
  };
}

function lookup(city) {
  const key = city.trim().toLowerCase();
  if (!key) return null;
  return MOCK[key] || fakeWeatherFor(key);
}

function render(city, w) {
  document.getElementById("wc-city").textContent =
    city.replace(/\b\w/g, (m) => m.toUpperCase());
  document.getElementById("wc-cond").textContent = w.cond;
  document.getElementById("wc-icon").textContent = w.icon;
  document.getElementById("wc-temp").textContent = w.temp;
  document.getElementById("wc-humidity").textContent = w.humidity;
  document.getElementById("wc-wind").textContent = w.wind;

  const card = document.getElementById("weather-card");
  card.style.transform = "scale(1.03)";
  setTimeout(() => (card.style.transform = ""), 180);
}

// --- search form ---
const form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("city-input");
  const w = lookup(input.value);
  if (w) render(input.value, w);
});

// --- sample city cards ---
const sampleCities = ["Tokyo", "London", "Reykjavik", "Cairo", "Sydney", "San Francisco"];
const grid = document.getElementById("city-grid");
grid.innerHTML = sampleCities
  .map((c) => {
    const w = lookup(c);
    return `
      <div class="city-card">
        <div>
          <div class="c-name">${c}</div>
          <div class="c-cond">${w.cond}</div>
        </div>
        <div class="c-right">
          <div class="c-emoji">${w.icon}</div>
          <div class="c-temp">${w.temp}°</div>
        </div>
      </div>`;
  })
  .join("");

// --- footer year ---
document.getElementById("year").textContent = new Date().getFullYear();
