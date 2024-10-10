import { useState, useEffect, useContext } from 'react';
import { getLocalTime } from '../../utility/CommonFunctions';
import { UnitsContext } from '../App';

/**
 * @param UTCTimeShiftSeconds The desired time zone in terms of the number of seconds shifted from the UTC time zone
 * @returns A <h3> that displays and keeps track of the current time in both the current time zone, and the specified time zone
 */
function CurrentTime({ UTCTimeShiftSeconds } : { UTCTimeShiftSeconds: number }) {
  const {units} = useContext(UnitsContext);

  var [time, setTime] = useState(new Date());

  // start interval on mount to update the time every second, clear interval on unmount
  useEffect(() => {
    var timer = setInterval(() => setTime(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    }
  }, []);

  return (
    <h3>{ getLocalTime(time, units, UTCTimeShiftSeconds) } ({ getLocalTime(time, units) })</h3>
  ); // final return
}

export default CurrentTime;