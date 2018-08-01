import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Container, Row, Col } from "reactstrap";
import SelectCountry from "./SelectCountry.jsx";
import Loading from "./Loading.jsx";

export default class Home extends React.Component {
  state = {
    textVisible: null
  };
  //podcasts = this.props.topPodcasts;

  componentDidMount() {
    if (_.isEmpty(this.props.topPodcasts)) {
      this.props.getTopPodcasts();
    }
    if (_.isEmpty(this.props.countries)) {
      this.props.getCountries();
    }
  }

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
    if (_.isEmpty(this.props.topPodcasts)) {
      return <div className="container loader">Loading top podcasts...</div>;
    }

    return (
      <div className="body-home">
        <Container>
          <div className="text-center">
            <h1>Top Podcast</h1>
            {!this.props.countries && <Loading />}
            {this.props.countries && (
              <SelectCountry
                countries={this.props.countries}
                getTopPodcasts={this.props.getTopPodcasts}
                selectCountry={this.props.selectCountry}
                selectedCountry={this.props.selectedCountry}
              />
            )}
          </div>

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
                      backgroundImage: "url(" + podcast.artworkUrl100 + ")"
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
      </div>
    );
  }
}
