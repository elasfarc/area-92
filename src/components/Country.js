import React from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";

const Country = () => {
  const { continent, country: countryName } = useParams();
  const { url, path } = useRouteMatch();
  const { cities, flag } = useSelector((state) =>
    state.entities.continents[continent].find(
      (countryEle) => countryEle.name === countryName
    )
  );
  const dispatch = useDispatch();
  console.log("+++++++++");
  console.log("+++cocococo++++", cities);
  console.log("country", countryName, "continent", continent);
  console.log("url", url);
  console.log("path", path);
  React.useEffect(() => {
    dispatch(entitiesActions.loadCitiesPerCountry(countryName, continent));
  }, []);
  return cities ? (
    <div className="home">
      <div className="text-center">{countryName}</div>
      {cities.map((city) => (
        <div key={city} className="box mb-1">
          <Link to={`${url}/${city}`}>
            <div className="container flex gap-2 cross-center">
              <img src={flag} alt="" className="box__img" />
              <div className="text-center">
                <h4 className="box__heading">{city}</h4>
                <p className="box__text">blah blah blah</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  ) : null;
};

export default Country;
