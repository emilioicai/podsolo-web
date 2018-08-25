const topPodcasts = (state = null, action) => {
  switch (action.type) {
    case "GET_TOP_PODCASTS":
    case "GET_TOP_PODCASTS_ERROR":
      return null;
    case "GET_TOP_PODCASTS_SUCCESS":
      return action.topPodcasts;
    default:
      return state;
  }
};

export default topPodcasts;
