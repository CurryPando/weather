import { useState, useEffect } from "react";
import API_KEY from "../ApiKey";

const getWeatherUrl = (type: string, lat: number, long: number, units: units) => {
  return "https://api.openweathermap.org/data/2.5/" + type + "?lat=" + lat + "&lon=" + long + "&units=" + units + "&appid=" + API_KEY;
}

/**
 * Manages the weatherData logic, keeps the state and fetches the OpenWeather API whenever the location or units change
 * @type CurrentWeatherData or ForecastResponseData 
 * @param type "weather" (CurrentWeatherData) | "forecast" (ForecastResponseData)
 * @param dependencies Object of the location and units of the weather data
 * @returns `Type | null` weatherData
 */
const useWeatherData = <Type>(type: "weather" | "forecast", { location, units }: { location: URLSearchParams, units: units }) => {
  const [weatherData, setWeatherData]= useState<Type | null>(null);

  useEffect(() => {
    if (!location.get("latitude") || !location.get("longitude")) {
      return;
    }

    const controller = new AbortController();

    fetch(getWeatherUrl(type, Number(location.get("latitude")), Number(location.get("longitude")), units))
      .then(response => {
        if (!response.ok) {
          throw new Error("Weather API response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
    
    return () => {
      controller.abort();
    }
  }, [location, units]);

  return weatherData;
}

export default useWeatherData;