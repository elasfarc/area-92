import * as apiActions from "./api";

// ACTION TYPES
const COUNTRIES_REQUESTED = "/countries/request";
const COUNTRIES_LOADED = "/countries/load";

const COUNTY_REQUESTED = "/country/request";
const COUNTRY_LOADED = "/country/load";

const STATES_GEO_LOADED = "/country/states";

const STATES_LOADED = "/country/states/D";
const CITIES_TRANSFORM_TO_GEO = "country/cities/transform2Geo";

const WEATHER_REQUESTED = "/:city/weather/request";
const CITY_WEATHER_LOADED = "/:city/weather/load";

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
export const loadCountryData = (country) => async (dispatch) => {
  dispatch({ type: COUNTY_REQUESTED });
  let payload;
  const apiLinks = [
    "https://countriesnow.space/api/v0.1/countries/capital",
    "https://countriesnow.space/api/v0.1/countries/flag/images",
    "https://countriesnow.space/api/v0.1/countries/currency",
  ];
  try {
    // eslint-disable-next-line no-restricted-syntax
    for await (const url of apiLinks) {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ country }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const { data } = await response.json();
      payload = { ...payload, ...data };
    }
    dispatch(apiActions.onApiSuccess());
    dispatch({ type: COUNTRY_LOADED, payload });
  } catch (error) {
    dispatch({ type: "api_fail", payload: error });
  }
};

// ACTION CREATOR

export const getCountryStates = (country) => async (dispatch) => {
  dispatch({ type: COUNTRIES_REQUESTED });
  try {
    const {
      data: { iso3, states },
    } = await dispatch(
      apiActions.requestApiCall({
        url: `https://countriesnow.space/api/v0.1/countries/states`,
        method: "POST",
        body: { country },
      })
    );
    const { results } = await dispatch(
      apiActions.requestApiCall({
        url: `http://open.mapquestapi.com/geocoding/v1/batch?key=4qiFlGPdSaIgG97k8C3AyJRKLBpq1jtJ`,
        method: "POST",
        body: {
          //locations: states.map(({ name: city }) => ({ city, country })),
          locations: states.map(({ name }) => ({
            city: name.split(" ")[0],
            country,
          })),
        },
      })
    );
    dispatch(apiActions.onApiSuccess());
    dispatch({
      type: STATES_GEO_LOADED,
      payload: { country, states, iso3, results },
    });
  } catch (error) {
    dispatch(apiActions.onApiFail());
  }
};

// export const getCountryStates = (country) =>
//   apiActions.requestApiCall({
//     url: `https://countriesnow.space/api/v0.1/countries/states`,
//     method: "POST",
//     body: { country },
//     onStart: COUNTRIES_REQUESTED,
//     onSuccess: STATES_LOADED,
//     info: country,
//   });

export const transformCitiesToGeo = ({ country, cities }) =>
  apiActions.requestApiCall({
    url: `http://open.mapquestapi.com/geocoding/v1/batch?key=4qiFlGPdSaIgG97k8C3AyJRKLBpq1jtJ`,
    method: "POST",
    body: { locations: cities.map((city) => ({ city, country })) },
    onStart: COUNTRIES_REQUESTED,
    onSuccess: CITIES_TRANSFORM_TO_GEO,
    info: country,
  });

export const getGeoWeather = ({ lat, lng }, country, city) =>
  apiActions.requestApiCall({
    url: `https://tranquil-depths-60651.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&appid=e38f7e1cfd58b718a6bef99f85667dcd&units=metric`,
    onStart: WEATHER_REQUESTED,
    onSuccess: CITY_WEATHER_LOADED,
    info: { country, city },
  });

// REDUCER
const initialState = {
  countries: [],
  isLoading: false,
};

const reducer = (state = initialState, { type, payload }) => {
  if (type === COUNTRIES_REQUESTED) return { ...state, isLoading: true };
  if (type === COUNTY_REQUESTED) return { ...state, isLoading: true };

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
  if (type === COUNTRY_LOADED) {
    return {
      ...state,
      isLoading: false,
      countries: [...state.countries, payload],
    };
  }

  if (type === STATES_GEO_LOADED) {
    console.log("summer time , payload", payload);
    const { country: countryName, states, iso3, results } = payload;
    return {
      ...state,
      isLoading: false,
      countries: state.countries.map((country) =>
        country.name === countryName
          ? {
              ...country,
              iso3,
              states: results.map(
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
  if (type === CITY_WEATHER_LOADED) {
    console.log("^_^ summertime weather", payload);
    const {
      info: { country: countryName, city: cityName },
      response: {
        current: {
          temp,
          humidity,
          wind_speed: windSpeed,
          weather: { description, icon },
        },
      },
    } = payload;
    return {
      ...state,
      countries: state.countries.map((country) =>
        country.name === countryName
          ? {
              ...country,
              states: country.states.map((state) =>
                state.name === cityName
                  ? {
                      ...state,
                      weather: { temp, humidity, windSpeed, description, icon },
                    }
                  : state
              ),
            }
          : country
      ),
    };
  }
  return state;
};

export default reducer;
