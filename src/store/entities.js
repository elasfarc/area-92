import * as apiActions from "./api";

// ACTION TYPES
const COUNTRIES_REQUESTED = "/countries/request";
const COUNTRIES_LOADED = "/countries/load";
const CITIES_LOADED = "country/cities/load";
const CITY_TRANSFORM_TO_GEO = "/city/transform";
const CITY_WEATHER_LOADED = "/weather/city";

// ACTION CREATOR
export const loadCountriesPerContinent = (continent) =>
  apiActions.requestApiCall({
    url: `https://restcountries.eu/rest/v2/region/${continent}?fields=name;flag`,
    onStart: COUNTRIES_REQUESTED,
    onSuccess: COUNTRIES_LOADED,

    info: continent,
  });
export const loadCitiesPerCountry = (country, continent) =>
  apiActions.requestApiCall({
    url: `https://countriesnow.space/api/v0.1/countries/cities`,
    method: "POST",
    body: { country },
    onStart: COUNTRIES_REQUESTED,
    onSuccess: CITIES_LOADED,

    info: { country, continent },
  });

export const loadCountriesData = () =>
  apiActions.requestApiCall({
    url: `https://countriesnow.space/api/v0.1/countries/info?returns=flag,currency,capital,cities,population`,
    onStart: COUNTRIES_REQUESTED,
    onSuccess: COUNTRIES_LOADED,
  });

export const transformCityToGeo = () => ({});
export const getGeoWeather = () => ({});

// REDUCER
const initialState = {
  countries: [],
  isLoading: false,
};

const reducer = (state = initialState, { type, payload }) => {
  if (type === COUNTRIES_REQUESTED) return { ...state, isLoading: true };
  if (type === COUNTRIES_LOADED)
    return {
      ...state,
      isLoading: false,
      countries: payload.data,
    };
  if (type === CITIES_LOADED)
    return {
      ...state,
      isLoading: false,
      continents: {
        ...state.continents,
        [payload.info.continent]: state.continents[payload.info.continent].map(
          (country) =>
            country.name === payload.info.country
              ? { ...country, cities: payload.data.data }
              : country
        ),
      },
    };

  if (type === CITY_TRANSFORM_TO_GEO) return state;
  if (type === CITY_WEATHER_LOADED) return state;
  return state;
};

export default reducer;
