import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Container, Row, Col } from "reactstrap";

export default class Home extends React.Component {
  state = {
    textVisible: null
  };
  //podcasts = this.props.topPodcasts;

  componentDidMount() {
    if (_.isEmpty(this.props.topPodcasts)) {
      this.props.getTopPodcasts();
    }
  }
  podcast = this.props.topPodcasts.find(x => x.id === "1408796715");

  showText = podcastId => {
    this.setState({
      textVisible: podcastId
    });
  };

  hideText = () => {
    this.setState({
      textVisible: null
    });
  };

  render() {
    console.log(this.podcast.artworkUrl100);

    if (_.isEmpty(this.props.topPodcasts)) {
      return <div className="container loader">Loading top podcasts...</div>;
    }

    return (
      <div className="body-home">
        {/* <div className="cards-list"> */}
        <Container>
          <h1 className="text-center">Top Podcast</h1>
          <Row>
            {this.props.topPodcasts.map(podcast => {
              return (
                <Col
                  xs={{ size: "6", offset: "3" }}
                  sm={{ size: "6", offset: "0" }}
                  md={{ size: "4", offset: "0" }}
                  lg={{ size: "3", offset: "0" }}
                >
                  <div
                    className="card-home"
                    style={{
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url(" +
                        podcast.artworkUrl100 +
                        ")"
                    }}
                  >
                    <Link
                      to={`/${podcast.id}`}
                      className="card-home-link"
                      onClick={() => this.props.selectPodcast(podcast.id)}
                      onMouseOver={() => this.showText(podcast.id)}
                      onMouseLeave={() => this.hideText()}
                    >
                      <h2 className="card-home-description">{podcast.name}</h2>
                    </Link>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
        {/* </div> */}
      </div>
    );
  }
}
