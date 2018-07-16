import React from "../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react";
import { Link } from "../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-router-dom";
import _ from "../../../../../../Library/Caches/typescript/2.9/node_modules/@types/lodash";
import "./home.css";

export default class Home extends React.Component {
  componentDidMount() {
    if (_.isEmpty(this.props.topPodcasts)) {
      this.props.getTopPodcasts();
    }
  }

  render() {
    if (_.isEmpty(this.props.topPodcasts)) {
      return <div className="container loader">Loading top podcasts...</div>;
    }
    return (
      <div className="body-home">
        <div className="container home">
          <ul className="cards">
            {this.props.topPodcasts.map(podcast => {
              return (
                <li className="card card-inline" key={podcast.id}>
                  <img
                    className="card-img-top card-image"
                    src={podcast.artworkUrl100}
                  />
                  <div className="card-block">
                    <h4 className="card-title">{podcast.name}</h4>
                    <Link to={`/${podcast.id}`} className="btn">
                      Details
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
