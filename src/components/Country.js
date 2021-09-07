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

const Country = () => {
  const { country: countryName } = useParams();
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();
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
  console.log("++++++");
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
        {cities.map(({ name: cityName, mapUrl }) => (
          <Link key={cityName} to={`${url}/${cityName}`}>
            <div className="box mb-1">
              <div className="container flex gap-3 cross-center">
                <img src={mapUrl} alt={`map of ${cityName} `} width="150" />
                <div>{cityName}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Country;
