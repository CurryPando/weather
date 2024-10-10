import '../assets/styles/ForecastWeather.css';
import WeatherDetails from "./Common/WeatherDetails";
import ShortWeatherDetails from "./Common/ShortWeatherDetails";
import useWeatherData from '../utility/hooks/useWeatherData';
import { getLocalDate, isCurrentForecastNewDay } from '../utility/CommonFunctions';
import { useContext } from 'react';
import { LocationContext, UnitsContext } from './App';

/**
 * @returns An Accordion element listing the forecasted weather for the next 5 days
 */
function ForecastWeather() {
  const {units} = useContext(UnitsContext);
  const {location} = useContext(LocationContext);

  const forecastWeatherData = useWeatherData<ForecastResponseData>("forecast", { location: location, units: units });
  
  if (forecastWeatherData === null) {
    return (
      <div>
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="cur-con-weather-card is-desktop lbar-panel content-module">
      <div className="title-container">
        <h2 className="cur-con-weather-card__title">5-Day Forecast</h2>
      </div>
      {
        forecastWeatherData.list.map((forecastTimestamp, index) => {
          // when accordion item header is clicked, toggle visibility by adding/removing "show" from accordion item body
          const handleClick = () => {
            const accordianElementClassList = document.getElementById("collapse" + index)?.classList;

            if (!accordianElementClassList) {
              return;
            }

            if (accordianElementClassList.contains("show")) {
              accordianElementClassList.remove("show");
            }
            else {
              accordianElementClassList.add("show");
            }
          }

          // insert dayDivider <div> if the forecast weather data is of a new day
          let dayDivider = <></>;

          if (isCurrentForecastNewDay(forecastWeatherData, index)) {
            dayDivider =
              <div className="day-divider">
                <h3>{ getLocalDate(new Date(forecastTimestamp.dt * 1000), units, forecastWeatherData.city.timezone) }</h3>
              </div>;
          }

          return (
            <>
            { dayDivider }
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id={ "heading" + index }>
                  <button className="collapse-button" type="button" onClick={ handleClick }>
                    <ShortWeatherDetails weatherData={ forecastTimestamp } forecastTimeZone={ forecastWeatherData.city.timezone } />
                  </button>
                </h2>
                <div id={ "collapse" + index } className="accordion-collapse collapse" aria-labelledby={ "heading" + index } data-bs-parent="#accordionExample">
                  <WeatherDetails weatherData={ forecastTimestamp } />
                </div>
              </div>
            </div>
            </>
          ); // return forecast accordian item
        }) // end forecastWeatherData.list.map
      }
    </div>
  ); // final return
}

export default ForecastWeather;