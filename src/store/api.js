// ACTION TYPES
export const API_CALL_REQUEST = "/api/request";
export const API_CALL_SUCCESS = "/api/success";
export const API_CALL_FAIL = "/api/fail";

// ACTION CREATOR
export const requestApiCall = (payload) => ({
  type: API_CALL_REQUEST,
  payload,
});
export const onApiSuccess = () => ({ type: API_CALL_SUCCESS });
export const onApiFail = () => ({ type: API_CALL_FAIL });
