import { useContext } from "react";
import "../../assets/styles/FavoritedCities.css"
import { LocationContext } from "../App";

/**
 * @returns A list elements of the given favorited cities
 */
function FavoritedCities(
  { favoritedCities, setFavoritedCities }: {
    favoritedCities: Set<CityData>,
    setFavoritedCities: React.Dispatch<React.SetStateAction<Set<CityData>>>
  }) {

  const {setLocation} = useContext(LocationContext);

  const favoritedCityElements: React.ReactNode[] = [];
  let counter = 0;

  // for each favorited city, generate and add list item to favoritedCityElements
  favoritedCities.forEach((value, _key, _set) => {
    // when clicking city button, set location to city
    const handleClick = () => {
      setLocation((prev: URLSearchParams) => {
        prev.set("latitude", String(value.lat));
        prev.set("longitude", String(value.lon));
        return prev;
      });
    }

    // when click remove favorite button, remove city from favorited cities
    const handleUnfavorite = () => {
      const newFavoritedCities = new Set<CityData>([...favoritedCities]);
      newFavoritedCities.delete(value);

      setFavoritedCities(newFavoritedCities);
    }

    favoritedCityElements.push(
      <li className="nav-item" key={ counter }>
        <div className="nav-item-wrapper">
          <button className="nav-link" type="button" onClick={ handleClick }>{ value.name }</button>
          <button className="unfavorite-button nav-link" type="button" onClick={ handleUnfavorite }>&times;</button>
        </div>
      </li>
    );

    counter++;
  }); // end favoritedCities.forEach
  
  return (
    <ul className="nav">
      { favoritedCityElements }
    </ul>
  ); // final return
}

export default FavoritedCities;