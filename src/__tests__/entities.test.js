import configureStore from "redux-mock-store";
import api from "../store/middleware/api";
import * as entitiesActions from "../store/entities";
import store from "../store/configureStore";

const middlewares = [api];
const mockStore = configureStore(middlewares);

const initialState = {
  countries: [],
  isLoading: false,
};

describe("entites Actions", () => {
  describe("request a list of countries ", () => {
    test("dispatch the correct type", () => {
      const mockedStore = mockStore(initialState);
      mockedStore.dispatch({ type: entitiesActions.COUNTRIES_REQUESTED });
      const actions = mockedStore.getActions();
      const expectedPayload = { type: "/countries/request" };
      expect(actions).toEqual([expectedPayload]);
    });
    test("the status of state is loading", () => {
      store.dispatch({ type: entitiesActions.COUNTRIES_REQUESTED });
      const {
        entities: { isLoading },
      } = store.getState();

      expect(isLoading).toBe(true);
    });
  });
  describe("request data for a specific country ", () => {
    test("dispatch the correct type", () => {
      const mockedStore = mockStore(initialState);
      mockedStore.dispatch({ type: entitiesActions.COUNTY_REQUESTED });
      const actions = mockedStore.getActions();
      const expectedPayload = { type: "/country/request" };
      expect(actions).toEqual([expectedPayload]);
    });
    test("the status of state is loading", () => {
      store.dispatch({ type: entitiesActions.COUNTY_REQUESTED });
      const {
        entities: { isLoading },
      } = store.getState();

      expect(isLoading).toBe(true);
    });
  });
  describe("Loading countries ", () => {
    test("dispatch the correct type", () => {
      const mockedStore = mockStore(initialState);
      mockedStore.dispatch({ type: entitiesActions.COUNTRIES_LOADED });
      const actions = mockedStore.getActions();
      const expectedPayload = { type: "/countries/load" };
      expect(actions).toEqual([expectedPayload]);
    });
    test("the status of state is NOT loading", () => {
      store.dispatch({
        type: entitiesActions.COUNTRIES_LOADED,
        payload: { countries: [{}], capitals: [{}] },
      });
      const {
        entities: { isLoading },
      } = store.getState();
      expect(isLoading).toBe(false);
    });
  });
});

describe("Loading data of a given country ", () => {
  test("dispatch the correct type", () => {
    const mockedStore = mockStore(initialState);
    mockedStore.dispatch({ type: entitiesActions.COUNTRY_LOADED });
    const actions = mockedStore.getActions();
    const expectedPayload = { type: "/country/load" };
    expect(actions).toEqual([expectedPayload]);
  });
  test("the status of state is NOT loading", () => {
    store.dispatch({
      type: entitiesActions.COUNTRY_LOADED,
      payload: { countries: [{}] },
    });
    const {
      entities: { isLoading },
    } = store.getState();
    expect(isLoading).toBe(false);
  });
});

describe("Loading STATES of a given country ", () => {
  test("dispatch the correct type", () => {
    const mockedStore = mockStore(initialState);
    mockedStore.dispatch({ type: entitiesActions.STATES_GEO_LOADED });
    const actions = mockedStore.getActions();
    const expectedPayload = { type: "/country/states" };
    expect(actions).toEqual([expectedPayload]);
  });
  test("the status of state is NOT loading", () => {
    store.dispatch({
      type: entitiesActions.STATES_GEO_LOADED,
      payload: { country: "france", states: [], iso3: "FR" },
    });
    const {
      entities: { isLoading },
    } = store.getState();
    expect(isLoading).toBe(false);
  });
});
