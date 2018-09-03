import { combineReducers } from "redux";
import countries from "./countries";
import selectedCountry from "./selectedCountry";
import topPodcasts from "./topPodcasts";
import selectedPodcast from "./selectedPodcast";
import episodes from "./episodes";
export default combineReducers({
  countries,
  selectedCountry,
  topPodcasts,
  selectedPodcast,
  episodes
});
