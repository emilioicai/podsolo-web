const selectedPodcast = (state = null, action) => {
  switch (action.type) {
    case "SELECT_PODCAST":
      return action.selectedPodcast;
    default:
      return state;
  }
};

export default selectedPodcast;
