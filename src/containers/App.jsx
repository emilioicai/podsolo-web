import React from "react";
import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import Home from "../components/Home.jsx";
import EpisodeList from "../components/EpisodeList.jsx";
import { getEpisodes, getTopPodcasts } from "api";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // check to see if we have existing server-rendered data
    // sets the state if we do, otherwise initialize it to an empty state
    if (props.state) {
      this.state = props.state;
    } else {
      this.state = {
        selectedPodcast: null,
        topPodcasts: [],
        episodes: []
      };
    }
  }

  selectPodcast = podcastId => {
    this.setState({ selectedPodcast: podcastId });
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

  getTopPodcasts = () => {
    getTopPodcasts()
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
    let selectedPodcast = null;
    if (this.state.topPodcasts && this.state.selectedPodcast) {
      selectedPodcast = this.state.topPodcasts.find(
        x => x.id === this.state.selectedPodcast
      );
    }

    return (
      <div>
        <nav id="mainNav" className="navbar navbar-custom">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                Top podcasts
              </Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route
            path="/:id"
            render={props => (
              <EpisodeList
                {...props}
                episodes={this.state.episodes}
                getEpisodes={this.getEpisodes}
                selectedPodcast={selectedPodcast}
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
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
