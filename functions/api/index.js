require("es6-promise").polyfill();
require("isomorphic-fetch");

const API_URL = "us-central1-podcasts-205113.cloudfunctions.net";

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

const getTopPodcasts = () => {
  return fetch(`//${API_URL}/topPodcasts`)
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

module.exports = {
  getEpisodes,
  getTopPodcasts,
  getPodcast
};
