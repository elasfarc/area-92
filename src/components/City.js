import React from "react";
import PropTypes from "prop-types";
import LocationWeather from "./LocationWeather";

const City = ({ cityInfo }) => {
  const { countryName, cityName, mapUrl, state, latLng } = cityInfo;
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

City.propTypes = {
  cityInfo: PropTypes.shape({
    countryName: PropTypes.string,
    cityName: PropTypes.string,
    mapUrl: PropTypes.string,
    state: PropTypes.string,
    latLng: PropTypes.shape({}),
  }).isRequired,
};
