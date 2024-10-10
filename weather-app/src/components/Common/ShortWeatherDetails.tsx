import { useContext } from "react";
import { getLocalTime, getIconFromWeatherCode } from "../../utility/CommonFunctions";
import { UnitsContext } from "../App";

/**
 * @returns An abbreviated version of the given weatherData
 */
function ShortWeatherDetails({ weatherData, forecastTimeZone } : { weatherData: weatherData, forecastTimeZone: number }) {
  const {units} = useContext(UnitsContext);
  
  const forecastDate = new Date(weatherData.dt * 1000);

  return (
    <div className="accordion-details">
      <div className="accordion-time detail">
        <h3>{ getLocalTime(forecastDate, units, forecastTimeZone) }</h3>
      </div>
      <div className="temp">
        { Math.round(weatherData.main.temp) }°
        <span className="after-temp">
          { units === "imperial" ? "F" : "C" }
        </span>
      </div>
      <img src={ getIconFromWeatherCode(weatherData.weather[0].icon) } width="50" height="50"></img>
      <div className="weather-phrase detail">
        { weatherData.weather[0].main }
      </div>
      <div className="precipitation detail">
        &#9730; { Math.round((weatherData.pop ? weatherData.pop : 0) * 10) * 10 }%
      </div>
      <div className="wind detail">
        ☴ { Math.round(weatherData.wind.speed) } { units === "imperial" ? "mph" : "m/s" }
      </div>
    </div>
  ); // final return
}

export default ShortWeatherDetails;