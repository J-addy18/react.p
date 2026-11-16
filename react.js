import { useState, useMemo } from "react";
import "./react.css"

const weather = {
  Accra: {
    country: "Ghana", temperature: 29, condition: "Partly cloudy",
    icon: "⛅", humidity: 74, wind: 14, feels: 32,
    forecast: [["Today", "⛅", 29], ["Thu", "☀️", 30], ["Fri", "☁️", 28], ["Sat", "🌧️", 27], ["Sun", "☀️", 29]]
  },
  London: {
    country: "United Kingdom", temperature: 16, condition: "Cloudy",
    icon: "☁️", humidity: 81, wind: 12, feels: 15,
    forecast: [["Today", "☁️", 16], ["Thu", "🌦️", 17], ["Fri", "🌧️", 14], ["Sat", "⛅", 18], ["Sun", "☀️", 19]]
  },
  Tokyo: {
    country: "Japan", temperature: 24, condition: "Light rain",
    icon: "🌧️", humidity: 78, wind: 11, feels: 25,
    forecast: [["Today", "🌧️", 24], ["Thu", "☁️", 23], ["Fri", "🌤️", 25], ["Sat", "☀️", 27], ["Sun", "🌦️", 22]]
  }
};

export default function App() {
  const [city, setCity] = useState("Accra");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const current = weather[city];

  function handleSearch(event) {
    event.preventDefault();
    const found = Object.keys(weather).find(
      (name) => name.toLowerCase() === search.trim().toLowerCase()
    );

    if (found) {
      setCity(found);
      setSearch("");
      setError("");
    } else {
      setError("Try Accra, London or Tokyo.");
    }
  }

  const date = new Intl.DateTimeFormat("en", {
    weekday: "long", day: "numeric", month: "long"
  }).format(new Date());

  return (
    <main className="page">
      <div className="container">
        <header className="topbar">
          <a className="brand" href="/" aria-label="Simple Weather home">
            <span className="brand-icon">☁</span>
            <span>Simple Weather</span>
          </a>
          <p>{date}</p>
        </header>

        <section className="intro">
          <p className="tag">WEATHER AT A GLANCE</p>
          <h1>How's the weather<br />where you are?</h1>
          <p className="intro-copy">A simple look at today's weather and the days ahead.</p>
        </section>

        <form className="search" onSubmit={handleSearch}>
          <label className="sr-only" htmlFor="city">Search for a city</label>
          <input
            id="city"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Accra, London or Tokyo"
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error" role="status">{error}</p>}

        <section className="current-card" aria-label="Current weather">
          <div className="current-heading">
            <div>
              <p className="label">CURRENT WEATHER</p>
              <h2>{city}, {current.country}</h2>
              <p className="condition">{current.condition}</p>
            </div>
            <div className="weather-emoji" aria-hidden="true">{current.icon}</div>
          </div>
          <div className="temperature">{current.temperature}<span>°C</span></div>
          <p className="feels">Feels like {current.feels}°C</p>
        </section>

        <section className="details" aria-label="Weather details">
          <article className="detail">
            <span className="detail-icon">💧</span>
            <div><p>Humidity</p><strong>{current.humidity}%</strong></div>
          </article>
          <article className="detail">
            <span className="detail-icon">💨</span>
            <div><p>Wind speed</p><strong>{current.wind} km/h</strong></div>
          </article>
          <article className="detail">
            <span className="detail-icon">🌡️</span>
            <div><p>Feels like</p><strong>{current.feels}°C</strong></div>
          </article>
        </section>

        <section className="forecast-section">
          <div className="section-heading">
            <div><p className="label">THE NEXT FEW DAYS</p><h2>5-day forecast</h2></div>
          </div>
          <div className="forecast">
            {current.forecast.map(([day, icon, temp], index) => (
              <article className={`forecast-day ${index === 0 ? "today" : ""}`} key={day}>
                <p>{day}</p>
                <span aria-hidden="true">{icon}</span>
                <strong>{temp}°</strong>
              </article>
            ))}
          </div>
        </section>

        <footer>Simple Weather <span>•</span> Built with React, JavaScript, HTML & CSS</footer>
      </div>
    </main>
  );
}