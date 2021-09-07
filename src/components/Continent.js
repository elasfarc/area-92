import React from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";

const Continent = () => {
  const {
    entities: { continents },
  } = useSelector((state) => state);
  const { continent } = useParams();
  const { url, path } = useRouteMatch();
  console.log("url", url, "path", path);
  return (
    <div className="home">
      <div className="text-center">{continent}</div>
      {continents[continent].map((country) => (
        <div key={country.name} className="box mb-1">
          <Link to={`${url}/${country.name}`}>
            <div className="container flex gap-2 cross-center">
              <img src={country.flag} alt="" className="box__img" />
              <div className="text-center">
                <h4 className="box__heading">{country.name}</h4>
                <p className="box__text">blah blah blah</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Continent;
