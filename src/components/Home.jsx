import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Container, Row, Col } from "reactstrap";

import Loading from "./Loading.jsx";

import ReactFlagsSelect from "react-flags-select";

export default class Home extends React.Component {
  componentDidMount() {
    if (_.isEmpty(this.props.topPodcasts)) {
      this.props.getTopPodcasts();
    }
    if (_.isEmpty(this.props.countries)) {
      this.props.getCountries();
    }
  }

  render() {
    return (
      <div className="body-home">
        <div className="container">
          <Row>
            <Col
              xs={{ size: "12", offset: "0" }}
              sm={{ size: "12", offset: "0" }}
              md={{ size: "12" }}
              lg={{ size: "4" }}
            >
              <div className="text-center">
                <h1>Top Podcasts</h1>
                <h3>See the most listened podcasts in each country</h3>
                {!this.props.countries && <Loading />}

                {this.props.countries && (
                  <ReactFlagsSelect
                    defaultCountry={this.props.selectedCountry.toUpperCase()}
                    selectedSize={17}
                    countries={this.props.countries.map(c => {
                      return c.code.toUpperCase();
                    })}
                    onSelect={cc => {
                      this.props.selectCountry(cc.toLowerCase());
                      this.props.getTopPodcasts(cc.toLowerCase());
                    }}
                  />
                )}
              </div>
            </Col>

            <Col
              xs={{ size: "12", offset: "0" }}
              sm={{ size: "12", offset: "0" }}
              md={{ size: "12" }}
              lg={{ size: "8" }}
            >
              {!_.isEmpty(this.props.topPodcasts) && (
                <Container className={"container-home-rigth"}>
                  <Row>
                    {this.props.topPodcasts &&
                      this.props.topPodcasts.length > 0 &&
                      this.props.topPodcasts.map(podcast => {
                        return (
                          <Col
                            xs={{ size: "6", offset: "2" }}
                            sm={{ size: "6", offset: "0" }}
                            md={{ size: "4", offset: "0" }}
                            lg={{ size: "4" }}
                          >
                            <div
                              className="card-home"
                              style={{
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundImage:
                                  "url(" + podcast.artworkUrl100 + ")"
                              }}
                            >
                              <Link
                                to={`/${podcast.id}`}
                                className="card-home-link"
                                onClick={() =>
                                  this.props.selectPodcast(podcast.id)
                                }
                              >
                                <h2 className="card-home-description">
                                  {podcast.name}
                                </h2>
                              </Link>
                            </div>
                          </Col>
                        );
                      })}
                    {this.props.topPodcasts &&
                      this.props.topPodcasts.length === 0 && <Loading />}
                  </Row>
                </Container>
              )}
              {_.isEmpty(this.props.topPodcasts) && <Loading />}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
