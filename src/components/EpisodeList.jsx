import React from "react";
import _ from "lodash";
import Loading from "./Loading.jsx";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container
} from "reactstrap";
import * as moment from 'moment';

export default class User extends React.Component {
  state = {
    loadingMore: false
  };
  limit = 12;

  componentDidMount = () => {
    // TODO: Don't retrieve episodes if the list is the list is already present (it has been isomorphically fetched)
    this.props.getEpisodes(this.props.match.params.id, this.limit);
    if (!this.props.selectedPodcast) {
      this.props.selectPodcastById(this.props.match.params.id);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (
      this.props.selectedPodcast &&
      nextProps.selectedPodcast &&
      this.props.selectedPodcast.id !== nextProps.selectedPodcast.id
    ) {
      // user has navigated to a new episodes page
      // load data for that podcast and set to state
      this.props.getEpisodes(nextProps.selectedPodcast.id, this.limit);
    }
  };

  loadMore = () => {
    this.props.getEpisodes(
      this.props.selectedPodcast.id,
      this.props.episodes.length + this.limit,
      false,
      () => {
        this.setState({
          loadingMore: false
        });
      }
    );
    this.setState({
      loadingMore: true
    });
  };

  render() {
    console.log(this.props.episodes);
    const { episodes } = this.props;
    return (
      <dir className="body-episode">
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <div className="podcast-information text-center">
                {this.props.selectedPodcast && (
                  <div className="podcast-text">
                    <img src={this.props.selectedPodcast.artworkUrl100} />
                    <h1>{this.props.selectedPodcast.name}</h1>
                    <p>{this.props.selectedPodcast.artistName}</p>
                    {this.props.episodes &&
                      this.props.episodes.length > 0 && (
                        <h6>{this.props.episodes.length} EPISODES</h6>
                      )}
                  </div>
                )}
                {!this.props.selectedPodcast && <Loading />}
              </div>
            </Col>
            <Col md="9">
              {_.isEmpty(this.props.episodes) && <Loading />}
              {!_.isEmpty(this.props.episodes) && (
                <div>
                  {episodes.map((e, i) => {
                    return (
                      <div className="product">
                        <div className="product-upvote">
                          <i className="fas fa-broadcast-tower" />
                        </div>
                        <div className="product-body">
                          <h3>{e.title}</h3>
                          <p>{moment(e.created).format("MMMM Do YYYY")}</p>
                        </div>
                        <div>
                          <p>{e.itunes_duration}</p>
                          <ul className="list-inline product-controls hidden-sm hidden-xs">
                            <li>
                              <a href="">
                                <i className="fa fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="">
                                <i className="fa fa-share" />
                              </a>
                            </li>
                            <li>
                              <a href="">
                                <i className="fa fa-star" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Col>
          </Row>
          <div id="load-more">
            {!_.isEmpty(this.props.episodes) &&
              !this.state.loadingMore && (
                <a onClick={this.loadMore} href="#load-more">
                  Load more...
                </a>
              )}
            {this.state.loadingMore && <Loading />}
          </div>
        </div>
      </dir>
    );
  }
}
