import { createContext, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import NavBar from "./Navbar/Navbar";
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import '../assets/styles/App.css';

declare global {
  type units = "imperial" | "metric";

  // shape of OpenWeather API response data for the current weather
  type CurrentWeatherData = {
    coord: {
      lon: number,
      lat: number,
    },
    weather: {
      id: number,
      main: string,
      description: string,
      icon: string,
    } [],
    base: string,
    main: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      humidity: number,
      sea_level: number,
      grnd_level: number,
    },
    visibility: number,
    wind: {
      speed: number,
      deg: number,
      gust: number,
    },
    rain?: {
      "1h": number,
    },
    snow?: {
      "1h": number,
    },
    clouds: {
      all: number,
    },
    dt: number,
    sys: {
      type: number,
      id: number,
      country: string,
      sunrise: number,
      sunset: number,
    },
    timezone: number,
    id: number,
    name: string,
    cod: number,
  };

  // shape of OpenWeather API forecasted weather's list of weather at each timestamp
  type ForecastWeatherData = {
    dt: number,
    main: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      sea_level: number,
      grnd_level: number,
      humidity: number,
      temp_kf: number
    },
    weather: [
      {
        id: number,
        main: string,
        description: string,
        icon: string
      }
    ],
    clouds: {
      all: number
    },
    wind: {
      speed: number,
      deg: number,
      gust: number
    },
    visibility: number,
    pop: number,
    rain?: {
      "3h": number
    },
    snow?: {
      "3h": number
    },
    sys: {
      pod: string
    },
    dt_txt: string
  };

  // shape of OpenWeather API response data for the forecasted weather
  type ForecastResponseData = {
    cod: string,
    message: number,
    cnt: number,
    list: ForecastWeatherData[],
    city: {
      id: number,
      name: string,
      coord: {
        lat: number,
        lon: number
      },
      country: string,
      population: number,
      timezone: number,
      sunrise: number,
      sunset: number
    }
  };

  // shape of OpenWeather API geolocation's list of cities for each city
  type CityData = {
    name: string,
    local_names?: {
    },
    lat: number,
    lon: number,
    country: string,
    state: string
  };

  // generic weatherData type thats essentially ForecastWeatherData & CurrentWeatherData but without the unecessary items
  type weatherData = {
    main: {
      temp: number,
      feels_like: number,
      humidity: number,
    },
    wind: {
      speed: number
    },
    weather: {
      main: string,
      description: string,
      icon: string,
    }[],
    rain?: {
      "1h": number
    } | {
      "3h": number
    },
    snow?: {
      "1h": number
    } | {
      "3h": number
    },
    dt: number,
    pop?: number,
  }
}

const DEFAULT_UNITS: units = "imperial";
const DEFAULT_LOCATION = { latitude: "39.4667025", longitude: "-87.4139119" }; // Terre Haute, Indiana

export const UnitsContext = createContext<{units: any, setUnits: any}>({
  units: DEFAULT_UNITS[0],
  setUnits: null
});

export const LocationContext = createContext<{location: any, setLocation: any}>({
  location: null,
  setLocation: null
});

function App() {
  const [location, setLocation] = useSearchParams(DEFAULT_LOCATION);
  const [units, setUnits] = useState<units>(DEFAULT_UNITS);

  return (
    <>
      <LocationContext.Provider value={ {location: location, setLocation: setLocation} }>
      <UnitsContext.Provider value={ {units: units, setUnits: setUnits} }>
        <NavBar />
        <CurrentWeather />
        <ForecastWeather />
      </UnitsContext.Provider>
      </LocationContext.Provider>
    </>
  );
}

export default App
