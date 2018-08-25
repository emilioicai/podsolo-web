import {
  getCountries as getCountriesAPI,
  getTopPodcasts as getTopPodcastsAPI
} from "api";

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

export const getTopPodcasts = (country = "us") => {
  return dispatch => {
    dispatch({
      type: "GET_TOP_PODCASTS"
    });
    getTopPodcastsAPI(country)
      .then(topPodcasts => {
        return dispatch({
          type: "GET_TOP_PODCASTS_SUCCESS",
          topPodcasts: topPodcasts
        });
      })
      .catch(err => {
        console.error("Error when getting podcasts:", err);
        return dispatch({
          type: "GET_TOP_PODCASTS_ERROR",
          error: err
        });
      });
  };
};

export const selectCountry = country => ({
  type: "SELECT_COUNTRY",
  selectedCountry: country
});

export const selectPodcast = podcastData => {
  return {
    type: "SELECT_PODCAST",
    selectedPodcast: podcastData
  };
};

// selectPodcast = podcastId => {
//   const podcastData = this.state.topPodcasts.find(x => x.id === podcastId);
//   this.setState({ selectedPodcast: podcastData });
// };

// selectPodcastById = (podcastId, cb) => {
//   getPodcast(podcastId)
//     .then(podcast => {
//       return this.setState({ selectedPodcast: podcast });
//     })
//     .catch(err => {
//       console.error("Error when getting podcast:", err);
//       return cb(err, null);
//     });
// };
