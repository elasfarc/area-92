import * as apiActions from "./api";

// ACTION TYPES
const COUNTRIES_REQUESTED = "/countries/request";
const COUNTRIES_LOADED = "/countries/load";
const STATES_LOADED = "/country/states";
const CITIES_TRANSFORM_TO_GEO = "country/cities/transform2Geo";
const CITY_WEATHER_LOADED = "/weather/city";

// async thunk
export const loadCountriesData = () => async (dispatch) => {
  dispatch({ type: COUNTRIES_REQUESTED });
  try {
    const { data: countries } = await (
      await fetch(
        `https://countriesnow.space/api/v0.1/countries/info?returns=flag,currency,cities`
      )
    ).json();
    const { data: capitals } = await (
      await fetch(`https://countriesnow.space/api/v0.1/countries/capital`)
    ).json();
    dispatch(apiActions.onApiSuccess());
    dispatch({
      type: COUNTRIES_LOADED,
      payload: { countries, capitals },
    });
  } catch (error) {
    dispatch(apiActions.onApiFail());
  }
};

// ACTION CREATOR

export const getCountryStates = (country) =>
  apiActions.requestApiCall({
    url: `https://countriesnow.space/api/v0.1/countries/states`,
    method: "POST",
    body: { country },
    onStart: COUNTRIES_REQUESTED,
    onSuccess: STATES_LOADED,
    info: country,
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
    const { countries, capitals } = payload;
    return {
      ...state,
      isLoading: false,
      countries: countries.map((country) => ({
        ...country,
        ...capitals.find(({ capital, name }) => country.name === name),
      })),
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
