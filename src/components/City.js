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
import LocationWeather from "./LocationWeather";

const City = ({ cityInfo }) => {
  const { countryName, cityName, mapUrl, state, latLng } = cityInfo;
  console.log("cityInfo", cityInfo);
  return (
    <div className="box mb-1">
      <div className="container  text-center  ">
        {/* <Link to={`${url}/${cityName}`}> */}
        <img src={mapUrl} alt={`map of ${cityName} `} width="150" />
        {/* </Link> */}
        <div className=" mb-1">
          <li>name: {cityName}</li>
          <li>state: {state}</li>
        </div>
        <LocationWeather
          coordinates={latLng}
          location={{ countryName, cityName }}
        />
      </div>
    </div>
  );
};

export default City;
