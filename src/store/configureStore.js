import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import apiMiddleware from "./middleware/api";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

export default store;
