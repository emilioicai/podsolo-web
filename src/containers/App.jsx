import React from "react";
import { Switch, Route } from "react-router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Home from "./Home.jsx";
import EpisodeList from "./EpisodeList.jsx";
import rootReducer from "../reducers";
import { getEpisodes, getTopPodcasts, getPodcast, getCountries } from "api";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // check to see if we have existing server-rendered data
    // sets the state if we do, otherwise initialize it to an empty state
    if (props.state) {
      this.state = props.state;
      if (!this.state.selectedCountry) this.state.selectedCountry = "us";
    } else {
      this.state = {
        selectedPodcast: null,
        episodes: []
      };
    }
  }

  selectPodcastById = (podcastId, cb) => {
    getPodcast(podcastId)
      .then(podcast => {
        return this.setState({ selectedPodcast: podcast });
      })
      .catch(err => {
        console.error("Error when getting podcast:", err);
        return cb(err, null);
      });
  };

  getEpisodes = (podcastId, limit, clearEpisodes = true, cb) => {
    if (clearEpisodes) {
      this.setState({
        episodes: []
      });
    }
    getEpisodes(podcastId, limit)
      .then(episodes => {
        this.setState({
          episodes
        });
        if (cb) return cb(null, episodes);
        return null;
      })
      .catch(err => {
        console.error("Error when getting episodes:", err);
        return cb(err, null);
      });
  };

  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <Switch>
            <Route
              path="/:id"
              render={props => (
                <EpisodeList
                  {...props}
                  episodes={this.state.episodes}
                  getEpisodes={this.getEpisodes}
                  selectPodcastById={this.selectPodcastById}
                />
              )}
            />
            <Route
              path="/"
              render={props => (
                <Home {...props} selectPodcast={this.selectPodcast} />
              )}
            />
          </Switch>
          <Footer />
        </div>
      </Provider>
    );
  }
}
