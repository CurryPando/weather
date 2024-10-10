import { useContext } from "react";
import { combineNameStateCountry } from "../../utility/CommonFunctions";
import { LocationContext } from "../App";

/**
 * @returns A <div> listing the given results 
 */
function Results (
  { results, favoritedCities, setResults, setFavoritedCities }: {
    results: CityData[],
    favoritedCities: Set<CityData>,
    setResults: React.Dispatch<React.SetStateAction<CityData[]>>,
    setFavoritedCities: React.Dispatch<React.SetStateAction<Set<CityData>>>
  }) {

  const {setLocation} = useContext(LocationContext);

  return (
    <div className="results-list">
      {
        results.map((result, index) => {
          if (!result) return;

          const resultName = combineNameStateCountry(result.name, result.state, result.country);

          if (!resultName) return;

          // when result on list is clicked, set location to result
          const handleClick = () => {
            setLocation((prev: URLSearchParams) => {
              prev.set("latitude", String(result.lat));
              prev.set("longitude", String(result.lon));
              return prev;
            });

            setResults([]);
          }

          // on favorite button clicked, add result to favoritedCities set
          const handleFavorite = () => {
            setFavoritedCities(
              new Set([...favoritedCities, result])
            );
          }

          return (
            <div className="result" key={index}>
              <div className="result-city" onClick={handleClick}>{resultName}</div>
              <div className="favorite" onClick={handleFavorite}>&#9734;</div>
            </div>
          );
        }) // end results.map
      }
    </div>
  ); // final return
}

export default Results;