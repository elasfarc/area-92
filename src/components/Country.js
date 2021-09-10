import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";
import States from "./States";

const Country = ({ userInput }) => {
  const { country: countryName } = useParams();
  const dispatch = useDispatch();

  const country = useSelector((state) =>
    state.entities.countries.find((country) => country?.name === countryName)
  );

  React.useEffect(() => {
    if (!country) {
      dispatch(entitiesActions.loadCountryData(countryName));
    }
  }, []);

  if (country) {
    const { name, flag, currency, capital } = country;
    return (
      <div className="home  gap-1">
        <div className="box mb-1 country text-center">
          <div className="container flex gap-3 cross-center  ">
            <img src={flag} alt="" className="box__img" />
            <div className="text-center">
              <h4 className="box__heading">{name}</h4>
              <p className="box__text">Capital: {capital}</p>
              <p className="box__text">Currency: {currency}</p>
            </div>
          </div>
        </div>
        <States countryName={countryName} />
      </div>
    );
  }

  return <h1 className="text-center">Loading... </h1>;
};

export default Country;
