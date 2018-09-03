import {
  getCountries as getCountriesAPI,
  getTopPodcasts as getTopPodcastsAPI,
  getPodcast as getPodcastAPI,
  getEpisodes as getEpisodesAPI
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

export const selectPodcastById = (podcastId, cb) => {
  return dispatch => {
    getPodcastAPI(podcastId)
      .then(podcastData => {
        return dispatch(selectPodcast(podcastData));
      })
      .catch(err => {
        console.error("Error when getting podcasts:", err);
        return dispatch({
          type: "SELECT_PODCASTS_BY_ID_ERROR",
          error: err
        });
      });
  };
};

export const getEpisodes = (podcastId, limit, cb) => {
  return dispatch => {
    dispatch({
      type: "GET_EPISODES_LIST"
    });
    getEpisodesAPI(podcastId, limit, cb)
      .then(episodes => {
        return dispatch({
          type: "GET_EPISODES_SUCCESS",
          episodes: episodes
        });
      })
      .catch(err => {
        console.error("Error when getting episodeList:", err);
        return dispatch({
          type: "GET_EPISODES_ERROR",
          error: err
        });
      });
  };
};
