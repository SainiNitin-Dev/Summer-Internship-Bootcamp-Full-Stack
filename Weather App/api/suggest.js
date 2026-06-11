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

function getLookupQuery(query) {
  const clean = String(query || "").trim();
  return cityAliases[clean.toLowerCase()] || clean;
}

export default async function handler(req, res) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const query = String(req.query.q || "").trim();

  if (!apiKey) {
    return res.status(500).json({ message: "OPENWEATHER_API_KEY is not configured." });
  }

  if (query.length < 2) {
    return res.status(200).json([]);
  }

  try {
    const params = new URLSearchParams({
      q: getLookupQuery(query),
      limit: "7",
      appid: apiKey
    });
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?${params}`);

    if (!response.ok) {
      throw new Error("OpenWeatherMap geocoding failed.");
    }

    const places = await response.json();
    const seen = new Set();
    const suggestions = places
      .filter((place) => Number.isFinite(place.lat) && Number.isFinite(place.lon))
      .map((place) => ({
        name: place.name,
        state: place.state || "",
        country: place.country || "",
        lat: place.lat,
        lon: place.lon
      }))
      .filter((place) => {
        const key = `${place.name}|${place.state}|${place.country}|${place.lat.toFixed(3)}|${place.lon.toFixed(3)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    return res.status(200).json(suggestions);
  } catch (error) {
    return res.status(502).json({ message: error.message || "Location suggestions failed." });
  }
}
