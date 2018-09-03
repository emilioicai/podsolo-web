const episodes = (state = null, action) => {
  switch (action.type) {
    case "GET_EPISODES_LIST":
    case "GET_EPISODES_LIST_ERROR":
      return null;
    case "GET_EPISODES_SUCCESS":
      return action.episodes;
    default:
      return state;
  }
};

export default episodes;
