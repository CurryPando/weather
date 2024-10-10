import { useContext } from "react";
import { getIconFromWeatherCode, calculateDewPoint } from "../../utility/CommonFunctions";
import { UnitsContext } from "../App";

/**
 * @returns A more in-depth section of the given weatherData
 */
function WeatherDetails({ weatherData } : { weatherData: weatherData }) {
  const {units} = useContext(UnitsContext);

  const weatherRainAmount = weatherData.rain ? Object.entries(weatherData.rain)[0][1] : 0;
  const weatherSnowAmount = weatherData.snow ? Object.entries(weatherData.snow)[0][1] : 0;

  return (
    <div className="cur-con-weather-card__body">
      <div className="cur-con-weather-card__panel">
        <div className="forecast-container">
          <img className="weather-icon" src={ getIconFromWeatherCode(weatherData.weather[0].icon) } width="88" height="88"></img>
          <div className="temp-container">
            <div className="temp">
              { Math.round(weatherData.main.temp) }°
              <span className="after-temp">
                { units === "imperial" ? "F" : "C" }
              </span>
            </div>
          </div>
        </div>
        <div>
          <span className="phrase">
            { weatherData.weather[0].description }
          </span>
        </div>
      </div>
      <div className="cur-con-weather-card__panel details-container">
        <div className="spaced-content detail">
          <span className="label">Precipitation</span>
          <div className="precipitation">
            <span className="value">Rain: { weatherRainAmount }mm/h</span>
            <span className="value">Snow: { weatherSnowAmount }mm/h</span>
          </div>
        </div>
        <div className="spaced-content detail">
          <span className="label">Feels Like</span>
          <span className="value">{ Math.round(weatherData.main.feels_like) }° { units == "imperial" ? "F" : "C" }</span>
        </div>
        <div className="spaced-content detail">
          <span className="label">Wind</span>
          <span className="value">{ Math.round(weatherData.wind.speed) } { units == "imperial" ? "mph" : "m/s" }</span>
        </div>
        <div className="spaced-content detail">
          <span className="label">Dew Point</span>
          <span className="value">{ Math.round(calculateDewPoint(units, weatherData.main.temp, weatherData.main.humidity)) }° { units == "imperial" ? "F" : "C" }</span>
        </div>
        <div className="spaced-content detail">
          <span className="label">Humidity</span>
          <span className="value">{ weatherData.main.humidity }%</span>
        </div>
      </div>
    </div>
  ); // final return
}

export default WeatherDetails;