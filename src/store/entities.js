// ACTION TYPES
const COUNTRIES_LOADED = "/countries/load";
const CITIES_LOADED = "country/cities/load";
const CITY_TRANSFORM_TO_GEO = "/city/transform";
const CITY_WEATHER_LOADED = "/weather/city";
// ACTION CREATOR
export const loadCountriesPerContinent = () => ({});
export const loadCitiesPerCountry = () => ({});
export const transformCityToGeo = () => ({});
export const getGeoWeather = () => ({});
// REDUCER
const initialState = {
  continents: ["africa", "asia", "europe", "americas", "Oceania"],
};

const reducer = (state = initialState, { type, payload }) => {
  if (type === COUNTRIES_LOADED) return state;
  if (type === CITIES_LOADED) return state;
  if (type === CITY_TRANSFORM_TO_GEO) return state;
  if (type === CITY_WEATHER_LOADED) return state;
  return state;
};

export default reducer;
