import API_KEY from "./ApiKey";

/**
 * @param units "imperial" (F) or "metric" (C)
 * @param T Temperature (in the given units)
 * @param RH Relative Humidity (0 - 100)
 * @returns The dewpoint in F or C
 */
export const calculateDewPoint = (units: units, T: number, RH: number) => {
  if (units == "imperial") {
    T = (T - 32) * 5/9;
  }

  const gamma = Math.log(RH / 100) + 17.625 * T / (243.04 + T);
  const dewPoint = 243.04 * gamma/(17.625 - gamma);

  return units === "imperial" ? dewPoint * 9/5 + 32 : dewPoint;
}

const getGeocodeUrl = (query: string) => {
  return "http://api.openweathermap.org/geo/1.0/direct?q=" + query + "&limit=5&appid=" + API_KEY;
}

/**
 * @param query The query used to match cities
 * @returns A promise that, when resolved, contains a list of `CityData`
 */
export const fetchGeocodeApi = (query: string): Promise<CityData[]> => {
  return fetch(getGeocodeUrl(query))
    .then(response => {
      if (!response.ok) {
        throw new Error("Geocoding API response not ok")
      }
      return response.json();
    });
}

export const combineNameStateCountry = (name: string, state: string, country: string) => {
  let output = "";

  if (name) {
    output += name + ", ";
  }
  if (state) {
    output += state + ", ";
  }
  if (country) {
    output += country + ", ";
  }

  output = output.substring(0, output.length - 2);

  return output;
}

/**
 * @param weatherCode string that encodes a weather type 
 * @returns A URL containing the corresponding icon .PNG
 * @see https://openweathermap.org/weather-conditions
 */
export const getIconFromWeatherCode = (weatherCode: string) => {
  return ("https://openweathermap.org/img/wn/" + weatherCode + "@2x.png");
}

/**
 * @param time Javascript Date object
 * @param units "imperial" (12-hour) or "metric" (24-hour)
 * @param UTCTimeShiftSeconds Displays the time in the time zone shifted this many seconds from UTC time
 * @returns A string formatted either `HH:MM AM/PM` (12-hours), or `HH:MM` (24-hours)
 */
export const getLocalTime = (time: Date, units: units, UTCTimeShiftSeconds?: number) => {
  if (!UTCTimeShiftSeconds) {
    return (time.toLocaleTimeString(units == "imperial" ? "en-US" : "en-GB", { timeStyle: "short" }));
  }

  const UTCTime = new Date(time.getTime() + UTCTimeShiftSeconds * 1000);

  return (UTCTime.toLocaleTimeString(units == "imperial" ? "en-US" : "en-GB", { timeStyle: "short", timeZone: "+0000" }));
}

/**
 * @param time Javascript Date object
 * @param units "imperial" (MM/DD/YYYY) or "metric" (DD/MM/YYYY)
 * @param UTCTimeShiftSeconds Displays the date in the time zone shifted this many seconds from UTC time
 * @returns A string formatted either `MM/DD/YYYY` or `DD/MM/YYYY`
 */
export const getLocalDate = (time: Date, units: units, UTCTimeShiftSeconds?: number) => {
  if (!UTCTimeShiftSeconds) {
    return (time.toLocaleDateString(units == "imperial" ? "en-US" : "en-GB", { timeStyle: "short" }));
  }

  const UTCTime = new Date(time.getTime() + UTCTimeShiftSeconds * 1000);

  return (UTCTime.toLocaleDateString(units == "imperial" ? "en-US" : "en-GB", { timeZone: "+0000" }));
}

/**
 * @param forecastWeatherData ForecastResponseData object
 * @param index The index of the desired forecast in the forecastWeatherData object
 * @returns Whether the forecast at `index` is on a new day from the forecast at `index-1`
 */
export const isCurrentForecastNewDay = (forecastWeatherData: ForecastResponseData, index: number) => {
  if (index == 0) {
    return true;
  }

  const currentDate = new Date((forecastWeatherData.list[index].dt + forecastWeatherData.city.timezone) * 1000);
  const pastDate = new Date((forecastWeatherData.list[index - 1].dt + forecastWeatherData.city.timezone) * 1000);

  return currentDate.getUTCDay() !== pastDate.getUTCDay();
}