require("es6-promise").polyfill();
require("isomorphic-fetch");

const API_URL = "us-central1-podcasts-205113.cloudfunctions.net"; //STAGING
// const API_URL = "us-central1-podcasts-production.cloudfunctions.net"; // PRODUCTION

const getEpisodes = (podcastId, limit = 999) => {
  return fetch(`//${API_URL}/episodes?podcastId=${podcastId}&limit=${limit}`)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(episodes => {
      return episodes;
    })
    .catch(err => {
      console.error("Error retrieving episodes: ", err);
    });
};

const getTopPodcasts = (country = "us") => {
  return fetch(`//${API_URL}/topPodcasts?country=${country}`)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(topPodcasts => {
      return topPodcasts;
    })
    .catch(err => {
      console.error("Error retrieving podcasts: ", err);
    });
};

const getPodcast = podcastId => {
  return fetch(`//${API_URL}/podcast?podcastId=${podcastId}`)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(podcast => {
      return podcast;
    })
    .catch(err => {
      console.error("Error retrieving podcast: ", err);
    });
};

const getCountries = () => {
  return fetch(`//${API_URL}/countries`)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(countries => {
      return countries;
    })
    .catch(err => {
      console.error("Error retrieving countries: ", err);
    });
};

module.exports = {
  getEpisodes,
  getTopPodcasts,
  getPodcast,
  getCountries
};
