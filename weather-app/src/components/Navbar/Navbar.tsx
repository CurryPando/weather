import '../../assets/styles/Navbar.css';
import reactLogo from '../../assets/images/react.svg';
import { useContext, useState } from 'react';
import FavoritedCities from './FavoritedCities';
import Results from './Results';
import { fetchGeocodeApi } from '../../utility/CommonFunctions';
import ToggleUnits from './ToggleUnits';
import { LocationContext } from '../App';

/**
 * @returns A nav element of the nav bar, a search bar, and a list of favorited cities
 */
function NavBar() {
  const {setLocation} = useContext(LocationContext);
  
  const [results, setResults] = useState<CityData[]>([]);
  const [favoritedCities, setFavoritedCities] = useState<Set<CityData>>(new Set<CityData>());

  // on "enter", setLocation to top result and clear results
	const searchLocation = (e: React.FormEvent) => {
		e.preventDefault();

		if (results.length < 1) return;

		setLocation((prev: URLSearchParams) => {
      prev.set("latitude", String(results[0].lat));
      prev.set("longitude", String(results[0].lon));
      return prev;
    });

    setResults([]);
	}

  // on input, fetch list of matching cities and setResults
  const handleChange = (value: string) => {
    if (!value) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    fetchGeocodeApi(value)
      .then(data => {
        setResults(data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });

    return () => {
      controller.abort();
    }
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={reactLogo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"></img>
            Weather
          </a>
          <div className="search-params">
            <form className="d-flex" role="search" onSubmit={searchLocation}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Terre Haute, Indiana"
                aria-label="Search"
                onChange={(e) => handleChange(e.target.value)}></input>
            </form>
            <ToggleUnits />
          </div>
        </div>
      </nav>
      <Results results={ results } favoritedCities={ favoritedCities } setResults={ setResults } setFavoritedCities={ setFavoritedCities } />
      <FavoritedCities favoritedCities={ favoritedCities } setFavoritedCities={ setFavoritedCities } />
    </>
  ); // final return
}

export default NavBar;
