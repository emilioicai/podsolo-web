import React from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Home from '../components/Home';
import EpisodeList from '../components/EpisodeList';
import { getEpisodes, getTopPodcasts } from 'api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // check to see if we have existing server-rendered data
    // sets the state if we do, otherwise initialize it to an empty state
    if (props.state) {
      this.state = props.state;
    } else {
      this.state = {
        topPodcasts: [],
        episodes: []
      }
    }
  }

  getEpisodes = (employeeId) => {
    this.setState({
      episodes: []
    });
    getEpisodes(employeeId)
      .then((episodes) => {
        this.setState({
          episodes
        });
        return null;
      })
      .catch((err) => {
        console.error('Error when getting episodes:', err)
      });
  };

  getTopPodcasts = () => {
    getTopPodcasts()
      .then((topPodcasts) => {
        this.setState({
          topPodcasts
        });
        return null;
      })
      .catch((err) => {
        console.error('Error when getting top podcasts:', err)
      });
  };

  render() {
    return (
      <div>
        <nav id="mainNav" className="navbar navbar-custom">
          <div className="container">
            <div className="navbar-header">
              <Link to='/' className="navbar-brand">Top podcasts</Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path='/:id' render={(props) => (
            <EpisodeList {...props}
              episodes={this.state.episodes}
              getEpisodes={this.getEpisodes}
            />
          )} />
          <Route path='/' render={(props) => (
            <Home {...props}
              topPodcasts={this.state.topPodcasts}
              getTopPodcasts={this.getTopPodcasts}
            />
          )} />
        </Switch>
      </div>
    )
  }
}
