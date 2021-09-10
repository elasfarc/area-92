import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";
import City from "./City";

const States = ({ countryName }) => {
  const dispatch = useDispatch();
  const country = useSelector((state) =>
    state.entities.countries.find((country) => country.name === countryName)
  );

  React.useEffect(() => {
    dispatch(entitiesActions.getCountryStates(countryName));
  }, []);

  if (country.states) {
    return (
      <>
        {country.states.map(({ name: cityName, mapUrl, state, latLng }) => (
          <City
            key={cityName}
            className=""
            cityInfo={{ countryName, cityName, mapUrl, state, latLng }}
          />
        ))}
      </>
    );
  }
  return <p className="text-center">loading States...</p>;
};

export default States;
