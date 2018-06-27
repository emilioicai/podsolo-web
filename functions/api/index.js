require('es6-promise').polyfill();
require('isomorphic-fetch');

const API_URL = 'us-central1-podcasts-205113.cloudfunctions.net';

const getEpisodes = (podcastId) => {
  return fetch(`//${API_URL}/episodes`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((episodes) => {
      console.log(episodes);
      return episodes;
    })
    .catch((err) => {
      console.error('Error retrieving episodes: ', err);
    });
}

const getTopPodcasts = () => {
  return fetch(`//${API_URL}/topPodcasts`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((topPodcasts) => {
      console.log(topPodcasts);
      return topPodcasts;
    })
    .catch((err) => {
      console.error('Error retrieving podcasts: ', err);
    });
}

module.exports = {
  getEpisodes,
  getTopPodcasts,
};