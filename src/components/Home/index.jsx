import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Container, Row, Col } from "reactstrap";

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
          <h1 className="text-center">Top Podcast</h1>
          {/* <div className="cards-list"> */}
          <Container>
            <ul className="cards">
              <Row>
                {this.props.topPodcasts.map(podcast => {
                  return (
                    <Col xs="12" sm="12" md="6" lg="3">
                      <li key={podcast.id}>
                        <div
                          className="card"
                          style={{
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundImage:
                              "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url(" +
                              podcast.artworkUrl100 +
                              ")"
                          }}
                        >
                          {/* <div className="card-category">Popular</div> */}
                          <div className="card-description">
                            <h2>{podcast.name}</h2>
                          </div>
                          <Link to={`/${podcast.id}`} className="card-link" />
                        </div>
                      </li>
                    </Col>
                  );
                })}
              </Row>
            </ul>
          </Container>
          {/* </div> */}
        </div>
      </div>
    );
  }
}
