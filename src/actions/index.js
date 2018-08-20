import { getCountries as getCountriesAPI } from "api";

export const getCountries = () => {
  return dispatch => {
    dispatch({
      type: "GET_COUNTRIES"
    });
    getCountriesAPI()
      .then(countries => {
        return dispatch({
          type: "GET_COUNTRIES_SUCCESS",
          countries: countries
        });
      })
      .catch(err => {
        console.error("Error when getting contries:", err);
        return dispatch({
          type: "GET_COUNTRIES_ERROR",
          error: err
        });
      });
  };
};
