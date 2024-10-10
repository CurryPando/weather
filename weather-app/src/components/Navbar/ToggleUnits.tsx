import { useContext } from "react";
import { UnitsContext } from "../App";

/**
 * @returns A toggle button for switching the units between Imperial and Metric
 */
function ToggleUnits() {
  const {setUnits} = useContext(UnitsContext);

  return (
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" className="btn-check" name="btnradio" id="btnradio-imperial" autoComplete="off" onClick={() => {setUnits("imperial")}}></input>
      <label className="btn btn-outline-primary" htmlFor="btnradio-imperial">°F</label>
      <input type="radio" className="btn-check" name="btnradio" id="btnradio-metric" autoComplete="off" onClick={() => {setUnits("metric")}}></input>
      <label className="btn btn-outline-primary" htmlFor="btnradio-metric">°C</label>
    </div>
  ); // final return
}

export default ToggleUnits;