import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { FaCloud, FaSun, FaWind, FaBolt, FaCloudRain } from "react-icons/fa";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [forecastData, setForecastData] = useState([]);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=027f4794913f192299dbb1215eae8b58`;
  const urlforecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=027f4794913f192299dbb1215eae8b58`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      axios.get(urlforecast).then((response) => {
        setForecastData(response.data.list);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  const getWeatherIcon = (weatherDescription) => {
    switch (weatherDescription) {
      case "Clouds":
        return <FaCloud />;
      case "Clear":
        return <FaSun />;
      case "Wind":
        return <FaWind />;
      case "Thunderstorm":
        return <FaBolt />;
      case "Rain":
        return <FaCloudRain />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="icon">
            {data.weather ? getWeatherIcon(data.weather[0].main) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {forecastData.length > 0 && (
          <div className="forecast">
            {forecastData.map(
              (forecast, index) =>
                index % 8 === 0 && (
                  <div key={index} className="forecast-item">
                    <p>{moment(forecast.dt_txt).format("ddd, MMM Do")}</p>
                    <p>{forecast.main.temp.toFixed()}°C</p>
                    <div className="forecast-icon">
                      {getWeatherIcon(forecast.weather[0].main)}
                    </div>
                  </div>
                )
            )}
          </div>
        )}

        {data.name !== undefined && (
          <div className="bottom">
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
