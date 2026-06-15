const cityAliases = {
  gurugram: "Gurgaon,IN",
  gurgaon: "Gurgaon,IN",
  delhi: "New Delhi,IN",
  bangalore: "Bengaluru,IN",
  bengaluru: "Bengaluru,IN",
  bombay: "Mumbai,IN",
  mumbai: "Mumbai,IN",
  calcutta: "Kolkata,IN"
};

function kelvinToC(k) {
  return Math.round(k - 273.15);
}

function msToKmh(ms) {
  return Math.round(ms * 3.6);
}

function getLookupQuery(city) {
  const cleanCity = String(city || "").trim();
  return cityAliases[cleanCity.toLowerCase()] || cleanCity;
}

async function resolveLocation(city, apiKey) {
  const lookup = getLookupQuery(city);
  const params = new URLSearchParams({ q: lookup, limit: "1", appid: apiKey });
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?${params}`);

  if (!response.ok) {
    throw new Error("Could not resolve that city.");
  }

  const matches = await response.json();
  if (!Array.isArray(matches) || !matches.length) {
    throw new Error("No matching city found.");
  }

  const match = matches[0];
  return {
    lat: match.lat,
    lon: match.lon,
    displayName: cityAliases[String(city).trim().toLowerCase()] ? String(city).trim() : match.name,
    country: match.country || "",
    state: match.state || ""
  };
}

function locationFromQuery(query, currentJson) {
  return {
    lat: Number(query.lat),
    lon: Number(query.lon),
    displayName: String(query.city || currentJson?.name || "").trim(),
    country: String(query.country || currentJson?.sys?.country || "").trim(),
    state: String(query.state || "").trim()
  };
}

function normalizeWeather(currentJson, forecastJson, fallbackCity, location) {
  const now = new Date();
  const list = forecastJson.list || [];
  const hourly = list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toISOString(),
    temp: kelvinToC(item.main.temp),
    feelsLike: kelvinToC(item.main.feels_like),
    condition: item.weather?.[0]?.main || "Clear",
    description: item.weather?.[0]?.description || item.weather?.[0]?.main || "Clear",
    cloudCover: item.clouds?.all ?? null,
    rainChance: Math.round((item.pop || 0) * 100),
    windKmh: msToKmh(item.wind?.speed || 0),
    humidity: item.main.humidity
  }));

  const byDay = new Map();
  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const key = date.toDateString();
    const existing = byDay.get(key) || {
      date,
      min: 99,
      max: -99,
      condition: item.weather?.[0]?.main || "Clear",
      rainChance: 0,
      cloudCover: 0,
      humidity: 0,
      windKmh: 0,
      pressure: 0,
      uv: null,
      visibilityKm: Math.round((item.visibility || currentJson.visibility || 10000) / 1000),
      count: 0
    };

    existing.min = Math.min(existing.min, kelvinToC(item.main.temp_min));
    existing.max = Math.max(existing.max, kelvinToC(item.main.temp_max));
    existing.rainChance = Math.max(existing.rainChance, Math.round((item.pop || 0) * 100));
    existing.cloudCover += item.clouds?.all ?? 0;
    existing.humidity += item.main.humidity;
    existing.windKmh += msToKmh(item.wind?.speed || 0);
    existing.pressure += item.main.pressure;
    existing.count += 1;
    byDay.set(key, existing);
  });

  const daily = [...byDay.values()].slice(0, 7).map((day, index) => ({
    date: day.date.toISOString(),
    min: day.min,
    max: day.max,
    condition: day.condition,
    rainChance: day.rainChance,
    cloudCover: Math.round(day.cloudCover / day.count),
    humidity: Math.round(day.humidity / day.count),
    windKmh: Math.round(day.windKmh / day.count),
    pressure: Math.round(day.pressure / day.count),
    uv: null,
    visibilityKm: day.visibilityKm
  }));

  return {
    source: "live",
    city: location.displayName || currentJson.name || fallbackCity,
    country: location.country || currentJson.sys?.country || "",
    updatedAt: now.toISOString(),
    timezoneOffset: currentJson.timezone || 0,
    current: {
      temp: kelvinToC(currentJson.main.temp),
      feelsLike: kelvinToC(currentJson.main.feels_like),
      condition: currentJson.weather?.[0]?.main || "Clear",
      description: currentJson.weather?.[0]?.description || "Clear",
      cloudCover: currentJson.clouds?.all ?? null,
      high: kelvinToC(currentJson.main.temp_max),
      low: kelvinToC(currentJson.main.temp_min),
      humidity: currentJson.main.humidity,
      windKmh: msToKmh(currentJson.wind?.speed || 0),
      windDeg: currentJson.wind?.deg || 0,
      pressure: currentJson.main.pressure,
      visibilityKm: Math.round((currentJson.visibility || 10000) / 1000),
      uv: null,
      sunrise: new Date((currentJson.sys?.sunrise || now.getTime() / 1000) * 1000).toISOString(),
      sunset: new Date((currentJson.sys?.sunset || now.getTime() / 1000) * 1000).toISOString(),
      rainChance: hourly[0]?.rainChance || 0
    },
    hourly,
    daily
  };
}

export default async function handler(req, res) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const city = String(req.query.city || "").trim();
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);

  if (!apiKey) {
    return res.status(500).json({ message: "OPENWEATHER_API_KEY is not configured." });
  }

  if (!city && (!Number.isFinite(lat) || !Number.isFinite(lon))) {
    return res.status(400).json({ message: "City or coordinates are required." });
  }

  try {
    const location = Number.isFinite(lat) && Number.isFinite(lon)
      ? locationFromQuery(req.query)
      : await resolveLocation(city, apiKey);
    const params = new URLSearchParams({
      lat: String(location.lat),
      lon: String(location.lon),
      appid: apiKey
    });

    const [currentRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?${params}`)
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error("OpenWeatherMap request failed.");
    }

    const currentJson = await currentRes.json();
    const forecastJson = await forecastRes.json();
    return res.status(200).json(normalizeWeather(currentJson, forecastJson, city, location));
  } catch (error) {
    return res.status(502).json({ message: error.message || "Weather lookup failed." });
  }
}
