import React from "react";
import {
  Link,
  useParams,
  useRouteMatch,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";
import City from "./City";
import { v4 as uuidv4 } from "uuid";

const Country = () => {
  const { country: countryName } = useParams();
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(entitiesActions.getCountryStates(countryName));
  }, []);

  // const { name, flag, currency, cities } = useSelector(
  //   (state) => state.entities.countries
  // ).find((country) => country.name === countryName);

  const {
    state: { name, flag, currency, capital },
  } = useLocation();

  const { cities } = useSelector((state) =>
    state.entities.countries.find((country) => country.name === name)
  );

  React.useEffect(() => {
    dispatch(
      entitiesActions.transformCitiesToGeo({
        country: name,
        cities: cities.map((city) => city.name),
      })
    );
  }, []);

  return (
    <div className="home">
      <div className="box mb-1">
        <div className="container flex gap-2 cross-center">
          <img src={flag} alt="" className="box__img" />
          <div className="text-center">
            <h4 className="box__heading">{name}</h4>
            <p className="box__text">Capital: {capital}</p>
            <p className="box__text">Currency: {currency}</p>
          </div>
        </div>
      </div>
      <div className="cities">
        {cities.map(({ name: cityName, mapUrl, state }) => (
          <Link key={uuidv4()} to={`${url}/${cityName}`}>
            <div className="box mb-1">
              <div className="container flex space-between gap-3 ">
                <img src={mapUrl} alt={`map of ${cityName} `} width="150" />
                <div className=" mb-1">
                  <li>name: {cityName}</li>
                  <li>state: {state}</li>
                </div>
                <button type="button" className="no-stretch">
                  Weather
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Country;
