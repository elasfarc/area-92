import * as apiActions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    const { type, payload } = action;
    if (type !== apiActions.API_CALL_REQUEST) return next(action);

    next(action);
    const {
      method = "GET",
      url,
      body,
      onStart,
      onSuccess,
      onError,
      info,
    } = payload;
    if (onStart) dispatch({ type: onStart });
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json(response);
      dispatch(apiActions.onApiSuccess);
      if (onSuccess)
        dispatch({ type: onSuccess, payload: { response: data, info } });
      // console.log("data", data, "info", info);
    } catch (error) {
      dispatch(apiActions.onApiFail);
      if (onError) dispatch({ type: onError, payload: error });
    }
    return null;
  };

export default api;
