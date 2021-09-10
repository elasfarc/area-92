import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";

const filterData = ({ searchItem, dataset, searchCriteria }) => {
  let result = [];
  result = dataset.filter(
    (data) => data[searchCriteria].search(searchItem) !== -1
  );
  return result;
};
const Home = ({ userInput }) => {
  // const { url, path } = useRouteMatch();
  // console.log("url", url, "path", path, "+++", `${url}/africa`);
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.entities);
  const [filteredData, setFilteredData] = React.useState(countries);

  React.useEffect(() => {
    if (countries.length === 0) {
      dispatch(entitiesActions.loadCountriesData());
    }
    setFilteredData(countries);
  }, [countries]);

  React.useEffect(() => {
    setFilteredData(
      filterData({
        searchItem: userInput,
        dataset: countries,
        searchCriteria: "name",
      })
    );
  }, [userInput]);

  return (
    <div className="home  gap-1">
      {filteredData.map((country) => {
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
};

export default Home;
