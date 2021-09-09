import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";

const LocationWeather = ({
  coordinates,
  location: { countryName, cityName },
}) => {
  const dispatch = useDispatch();
  const [getWeather, setGetWeather] = React.useState(false);

  const city = useSelector((state) =>
    state.entities.countries
      .find((country) => country.name === countryName)
      .states.find((state) => state.name === cityName)
  );

  React.useEffect(() => {
    if (getWeather) {
      dispatch(
        entitiesActions.getGeoWeather(coordinates, countryName, cityName)
      );
    }
  }, [getWeather]);

  if (city?.weather) {
    const {
      weather: { temp, humidity, windSpeed, description, icon },
    } = city;

    return (
      <div>
        <ul>
          <li>temp: {temp}</li>
          <li>humidity: {humidity}</li>
          <li>windSpeed: {windSpeed}</li>
          <li>description: {description}</li>
        </ul>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="condition"
        />
      </div>
    );
  }

  return (
    <div>
      {getWeather ? (
        <div>loading weater info...</div>
      ) : (
        <button
          type="button"
          className="btn"
          onClick={() => setGetWeather(true)}
        >
          {" "}
          get weather data
        </button>
      )}
    </div>
  );
};

export default LocationWeather;
