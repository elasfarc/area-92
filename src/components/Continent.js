import React from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";

const Continent = () => {
  const { continent } = useParams();
  const {
    entities: { continents },
  } = useSelector((state) => state);

  return (
    <div className="home">
      {continents[continent].map((country) => (
        <div key={country.name} className="box mb-1">
          <Link to={`/${continent}`}>
            <div className="container flex gap-2 cross-center">
              <img
                src={`${process.env.PUBLIC_URL}/imgs/${continent}.png`}
                alt=""
                className="box__img"
              />
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
