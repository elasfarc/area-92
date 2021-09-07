import * as apiActions from "./api";

// ACTION TYPES
const COUNTRIES_REQUESTED = "/countries/request";
const COUNTRIES_LOADED = "/countries/load";
const CAPITALS_LOADED = "/countries/capital";
const CITY_TRANSFORM_TO_GEO = "/city/transform";
const CITY_WEATHER_LOADED = "/weather/city";

// ACTION CREATOR

export const loadCountriesData = () =>
  apiActions.requestApiCall({
    url: `https://countriesnow.space/api/v0.1/countries/info?returns=flag,currency,cities`,
    onStart: COUNTRIES_REQUESTED,
    onSuccess: COUNTRIES_LOADED,
  });
export const loadContriesCapitals = () =>
  apiActions.requestApiCall({
    url: `https://countriesnow.space/api/v0.1/countries/capital`,
    onSuccess: CAPITALS_LOADED,
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

  if (type === CAPITALS_LOADED) {
    const { data } = payload;
    return {
      ...state,
      isLoading: false,
      capitals: data,
    };
  }

  if (type === CITY_TRANSFORM_TO_GEO) return state;
  if (type === CITY_WEATHER_LOADED) return state;
  return state;
};

export default reducer;
