const selectedCountry = (state = "us", action) => {
  switch (action.type) {
    case "SELECT_COUNTRY":
      return action.selectedCountry;
    default:
      return state;
  }
};

export default selectedCountry;
