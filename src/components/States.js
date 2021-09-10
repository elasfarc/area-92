import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";
import City from "./City";
import useFilter from "../shared/useFilter";

const States = ({ countryName, userInput }) => {
  const dispatch = useDispatch();
  const country = useSelector((state) =>
    state.entities.countries.find((country) => country.name === countryName)
  );

  const filteredStates = useFilter({
    searchItem: userInput,
    dataset: country?.states,
    searchCriteria: "name",
  });

  React.useEffect(() => {
    dispatch(entitiesActions.getCountryStates(countryName));
  }, []);

  if (filteredStates) {
    return (
      <>
        {filteredStates.map(({ name: cityName, mapUrl, state, latLng }) => (
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

States.propTypes = {
  userInput: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
};
