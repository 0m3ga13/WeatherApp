import React from "react";
import "./Card.css";
import AuthContext from "./auth-context";

const MainCard = ({ idx }) => (
  <AuthContext.Consumer>
    {(ctx) => (
      <>
        {ctx.forecastData.map((data, index) => {
          const date = new Date(data.dt * 1000); // Convert Unix timestamp to milliseconds
          const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
          const formattedDate = date.toLocaleDateString(undefined, options);
          let backgroundClass = "";
          let message = "";
          // let imgSrc = "";

          const temperatureCelsius =
            data.main && data.main.temp
              ? Math.round(data.main.temp - 273.15)
              : ""; // Check if temp property exists before accessing it

          if (temperatureCelsius > 35) {
            message = "🌞";
            backgroundClass = "sunny";
            // imgSrc = "images/weather.jpg";
          } else if (temperatureCelsius > 10 && temperatureCelsius < 35) {
            message = "⛅";
            backgroundClass = "cloudy";
           
            // imgSrc = "images/weather2.jpg";
          } else {
            message = "❄";
            backgroundClass = "rainy";
            // imgSrc = "images/weather3.jpg";
          }

          return (
            <div className={`card ${backgroundClass}`} key={index}>
              <p>{formattedDate}</p>
              <p>
                {temperatureCelsius
                  ? `🌡️ ${temperatureCelsius}°C ${message}`
                  : "Temperature data not available"}
              </p>
              <p>
                💧{" "}
                {data.main && data.main.humidity
                  ? data.main.humidity
                  : "Humidity data not available"}
              </p>
              <p>
                🌬️{" "}
                {data.wind && data.wind.speed
                  ? data.wind.speed
                  : "Wind speed data not available"}
              </p>
              <p>
                {data.weather && data.weather.length > 0
                  ? data.weather[0].description
                  : "Weather data not available"}
              </p>
            </div>
          );
        }).filter((_, index) => index === idx)}
      </>
    )}
  </AuthContext.Consumer>
);

export default MainCard;
