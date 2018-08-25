import { combineReducers } from "redux";
import countries from "./countries";
import selectedCountry from "./selectedCountry";
import topPodcasts from "./topPodcasts";
import selectedPodcast from "./selectedPodcast";
export default combineReducers({
  countries,
  selectedCountry,
  topPodcasts,
  selectedPodcast
});
