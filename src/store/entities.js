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
    url: `https://restcountries.eu/rest/v2/region/${continent}?fields=name`,
    onStart: COUNTRIES_REQUESTED,
    onSuccess: COUNTRIES_LOADED,

    info: continent,
  });
export const loadCitiesPerCountry = () => ({});
export const transformCityToGeo = () => ({});
export const getGeoWeather = () => ({});

// REDUCER
const initialState = {
  continents: {
    africa: [],
    asia: [],
    europe: [],
    americas: [],
    oceania: [],
  },
  isLoading: false,
};

const reducer = (state = initialState, { type, payload }) => {
  if (type === COUNTRIES_REQUESTED) return { ...state, isLoading: true };
  if (type === COUNTRIES_LOADED)
    return {
      ...state,
      isLoading: false,
      continents: {
        ...state.continents,
        [payload.info]: payload.data,
      },
    };
  if (type === CITIES_LOADED) return state;
  if (type === CITY_TRANSFORM_TO_GEO) return state;
  if (type === CITY_WEATHER_LOADED) return state;
  return state;
};

export default reducer;
