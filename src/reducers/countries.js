const countries = (state = null, action) => {
  switch (action.type) {
    case "GET_COUNTRIES":
    case "GET_COUNTRIES_ERROR":
      return null;
    case "GET_COUNTRIES_SUCCESS":
      return action.countries;
    default:
      return state;
  }
};

export default countries;
