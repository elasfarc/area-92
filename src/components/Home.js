import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";

const Home = () => {
  // const { url, path } = useRouteMatch();
  // console.log("url", url, "path", path, "+++", `${url}/africa`);
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.entities);

  console.log("countries", countries);
  React.useEffect(() => {
    if (countries.length === 0) dispatch(entitiesActions.loadCountriesData());
  }, []);
  return (
    <div className="home">
      {countries.map((country) => {
        const { name, flag, currency } = country;
        return (
          <div key={name} className="box mb-1">
            <Link to={`/${name}`}>
              <div className="container flex gap-2 cross-center">
                <img src={flag} alt="" className="box__img" />
                <div className="text-center">
                  <h4 className="box__heading">{name}</h4>
                  <p className="box__text">Currency: {currency}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
