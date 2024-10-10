import '../assets/styles/CurrentWeather.css';
import WeatherDetails from './Common/WeatherDetails';
import CurrentTime from './Common/CurrentTime';
import useWeatherData from '../utility/hooks/useWeatherData';
import { useContext } from 'react';
import { LocationContext, UnitsContext } from './App';

/**
 * @returns A section that displays the current weather
 */
function CurrentWeather() {
  const {units} = useContext(UnitsContext);
  const {location} = useContext(LocationContext);

  const currentWeatherData = useWeatherData<CurrentWeatherData>("weather", { location: location, units: units });

  if (currentWeatherData === null) {
    return (
      <div>
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="cur-con-weather-card is-desktop lbar-panel content-module">
      <div className="title-container">
        <h2 className="cur-con-weather-card__title"> { currentWeatherData.name }, { currentWeatherData.sys.country }</h2>
        <CurrentTime UTCTimeShiftSeconds={ currentWeatherData.timezone } />
      </div>
      <WeatherDetails weatherData={ currentWeatherData } />
    </div>
  ); // final return
}

export default CurrentWeather;