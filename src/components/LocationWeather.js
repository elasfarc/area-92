import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";

const LocationWeather = ({
  coordinates,
  location: { countryName, cityName },
}) => {
  const dispatch = useDispatch();
  const isWeatherLoaded = React.useRef(false);

  const state = useSelector((state) =>
    state.entities.countries
      .find((country) => country.name === countryName)
      .states.find((state) => state.name === cityName)
  );

  React.useEffect(() => {
    //dispatch(entitiesActions.getGeoWeather(coordinates, countryName, cityName));
    isWeatherLoaded.current = true;
  }, []);

  //console.log(state, "kkkk");
  if (isWeatherLoaded.current) {
    console.log("////// here llkk");
    const {
      weather: { temp, humidity, windSpeed, description, icon },
    } = state;
    return (
      <ul>
        <li>temp: {temp}</li>
        <li>humidity: {humidity}</li>
        <li>windSpeed: {windSpeed}</li>
        <li>description: {description}</li>
      </ul>
    );
  }
  return (
    <div>
      <p>loading weather...</p>
    </div>
  );
};

export default LocationWeather;

// return weather ? (
//   <>hello weather</>
// ) : (
//   <div>
//     <p>loading weather...</p>
//   </div>
// );
