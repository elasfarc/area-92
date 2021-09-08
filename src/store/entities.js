import * as apiActions from "./api";

// ACTION TYPES
const COUNTRIES_REQUESTED = "/countries/request";
const COUNTRIES_LOADED = "/countries/load";
const CAPITALS_LOADED = "/countries/capital";
const STATES_LOADED = "/country/states";
const CITIES_TRANSFORM_TO_GEO = "country/cities/transform2Geo";
const CITY_WEATHER_LOADED = "/weather/city";

// ACTION CREATOR

export const loadCountriesData = () =>
  apiActions.requestApiCall({
    url: `https://countriesnow.space/api/v0.1/countries/info?returns=flag,currency,cities`,
    onStart: COUNTRIES_REQUESTED,
    onSuccess: COUNTRIES_LOADED,
  });
export const getCountryStates = (country) =>
  apiActions.requestApiCall({
    url: `https://countriesnow.space/api/v0.1/countries/states`,
    method: "POST",
    body: { country },
    onStart: COUNTRIES_REQUESTED,
    onSuccess: STATES_LOADED,
    info: country,
  });

export const loadContriesCapitals = () =>
  apiActions.requestApiCall({
    url: `https://countriesnow.space/api/v0.1/countries/capital`,
    onSuccess: CAPITALS_LOADED,
  });

export const transformCitiesToGeo = ({ country, cities }) =>
  apiActions.requestApiCall({
    url: `http://open.mapquestapi.com/geocoding/v1/batch?key=4qiFlGPdSaIgG97k8C3AyJRKLBpq1jtJ`,
    method: "POST",
    body: { locations: cities.map((city) => ({ city, country })) },
    onStart: COUNTRIES_REQUESTED,
    onSuccess: CITIES_TRANSFORM_TO_GEO,
    info: country,
  });

export const getGeoWeather = () => ({});

// REDUCER
const initialState = {
  countries: [],
  isLoading: false,
};

const reducer = (state = initialState, { type, payload }) => {
  if (type === COUNTRIES_REQUESTED) return { ...state, isLoading: true };
  if (type === COUNTRIES_LOADED) {
    const { data } = payload.response;
    return {
      ...state,
      isLoading: false,
      countries: data.map((country) => ({
        ...country,
        cities: country.cities?.map((city) => ({ name: city })),
      })),
    };
  }

  if (type === CAPITALS_LOADED) {
    const {
      response: { data },
    } = payload;
    return {
      ...state,
      isLoading: false,
      capitals: data,
    };
  }
  if (type === STATES_LOADED) {
    const {
      response: {
        data: { states },
      },
      info: countryName,
    } = payload;

    return {
      ...state,
      isLoading: false,
      countries: state.countries.map((country) =>
        country.name === countryName ? { ...country, states } : country
      ),
    };
  }

  if (type === CITIES_TRANSFORM_TO_GEO) {
    console.log(payload);
    return {
      ...state,
      isLoading: false,
      countries: state.countries.map((country) =>
        country.name === payload.info
          ? {
              ...country,
              cities: payload.response.results.map(
                ({
                  providedLocation,
                  locations: [{ latLng, mapUrl, adminArea3 }],
                }) => ({
                  name: providedLocation.city,
                  country: country.name,
                  state: adminArea3,
                  latLng,
                  mapUrl,
                })
              ),
            }
          : country
      ),
    };
  }
  if (type === CITY_WEATHER_LOADED) return state;
  return state;
};

export default reducer;
