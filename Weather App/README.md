# Atmos Weather

Atmos Weather is a standalone, animated weather tracking web app built as a single HTML page with Vercel serverless API routes. The frontend uses a full-screen canvas for ambient weather visuals, glassmorphism UI surfaces, interactive hourly and forecast views, saved locations, unit toggles, and a weather-based packing planner.

The app is production/API-only: it does not render demo or mock weather data. All weather and location suggestions come from OpenWeatherMap.

## Features

- Live city search with OpenWeatherMap geocoding suggestions.
- Current weather with temperature, feels-like, high/low, rain chance, and condition-aware canvas background.
- Animated weather scenes for rain, sunny, cloudy, and night conditions.
- Celsius/Fahrenheit and km/h/mph toggles.
- Interactive hourly forecast strip.
- OpenWeather forecast accordion with daily wind, humidity, UV, and pressure fields.
- Advanced metrics bento grid for humidity, wind, UV, pressure, visibility, and sun path.
- Saved locations stored in `localStorage`.
- Packing planner recommendations based on the loaded weather.
- Vercel API status indicator: `API SYNC`, `API LIVE`, or `API ERROR`.

## Project Structure

```text
.
|-- index.html             # Root fallback that opens the app
|-- weather-tracker.html   # Complete standalone frontend
|-- api/
|   |-- weather.js         # OpenWeather current + forecast API route
|   `-- suggest.js         # OpenWeather geocoding suggestions API route
`-- vercel.json            # Routes / to weather-tracker.html
```

## OpenWeatherMap Setup

Create an OpenWeatherMap API key from:

```text
https://openweathermap.org/api
```

For local or Vercel usage, set:

```env
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

The key is used only inside the serverless API routes. It is not exposed in the frontend.

## Running Locally

Because the frontend calls `/api/weather` and `/api/suggest`, do not open `weather-tracker.html` directly as a file. Use Vercel locally or another serverless-compatible environment.

With Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Then open the local URL Vercel prints, usually:

```text
http://localhost:3000
```

## Deploying To Vercel

1. Push the project to GitHub.
2. Import the repo in Vercel.
3. Add the environment variable:

```env
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

4. Deploy.

The deployed app will load `weather-tracker.html` at `/`, while API calls are handled by:

```text
/api/weather
/api/suggest
```

## API Notes

This project uses OpenWeatherMap standard endpoints:

- Geocoding: `/geo/1.0/direct`
- Current weather: `/data/2.5/weather`
- Forecast: `/data/2.5/forecast`

The standard current + forecast endpoints do not provide UV Index. The UI therefore displays `N/A` for UV instead of inventing mock values.

## Troubleshooting

If the app shows `API ERROR`, check that `OPENWEATHER_API_KEY` is set correctly in Vercel and that the key is active.

If suggestions do not appear, the geocoding route is failing or the search query has fewer than two characters.

If you open the HTML file directly with `file://`, API calls cannot run because `/api/...` routes require Vercel or a compatible server.
