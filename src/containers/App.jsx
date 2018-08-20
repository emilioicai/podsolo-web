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
        topPodcasts: [],
        episodes: [],
        countries: [],
        selectedCountry: "us"
      };
    }
  }

  selectPodcast = podcastId => {
    const podcastData = this.state.topPodcasts.find(x => x.id === podcastId);
    this.setState({ selectedPodcast: podcastData });
  };

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

  selectCountry = (country = "us") => {
    this.setState({ selectedCountry: country, topPodcasts: [] });
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

  getTopPodcasts = (country = "us") => {
    getTopPodcasts(country)
      .then(topPodcasts => {
        this.setState({
          topPodcasts
        });
        return null;
      })
      .catch(err => {
        console.error("Error when getting top podcasts:", err);
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
                  selectedPodcast={this.state.selectedPodcast}
                  selectPodcastById={this.selectPodcastById}
                />
              )}
            />
            <Route
              path="/"
              render={props => (
                <Home
                  {...props}
                  topPodcasts={this.state.topPodcasts}
                  getTopPodcasts={this.getTopPodcasts}
                  selectPodcast={this.selectPodcast}
                  selectCountry={this.selectCountry}
                  selectedCountry={this.state.selectedCountry}
                />
              )}
            />
          </Switch>
          <Footer />
        </div>
      </Provider>
    );
  }
}
