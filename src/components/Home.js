import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";
import useFilter from "../shared/useFilter";

const Home = ({ userInput }) => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.entities);
  const filteredCountries = useFilter({
    searchItem: userInput,
    dataset: countries,
    searchCriteria: "name",
  });
  React.useEffect(() => {
    if (countries.length === 0) {
      dispatch(entitiesActions.loadCountriesData());
    }
  }, []);
  if (filteredCountries) {
    return (
      <div className="home  gap-1">
        {filteredCountries.map((country) => {
          const { name, flag, currency, capital } = country;

          return (
            <div key={name} className="box mb-1">
              <Link to={{ pathname: `/${name}`, state: { ...country } }}>
                <div className="container flex  cross-center">
                  <img src={flag} alt="" className="box__img" />
                  <div className="text-center box__info">
                    <h4 className="box__heading">{name}</h4>
                    <p className="box__text">Currency: {currency}</p>
                    <p className="box__text">Capital: {capital}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
  return <h1 className="text-center">Loading Countries...</h1>;
};

export default Home;

Home.propTypes = {
  userInput: PropTypes.string,
};
Home.defaultProps = {
  userInput: "",
};
