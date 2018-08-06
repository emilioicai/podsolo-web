import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import Loading from "./Loading.jsx";
import { Row, Col, Button } from "reactstrap";
import * as moment from "moment";
import ReactAudioPlayer from "react-audio-player";

export default class User extends React.Component {
  state = {
    loadingMore: false,
    showMoreId: null
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
  handleEpisodePlayer = i => {
    if (this.state.showMoreId === i) {
      this.setState({ showMoreId: null });
    } else {
      this.setState({ showMoreId: i });
    }
  };

  render() {
    const { episodes } = this.props;
    return (
      <div className=" episodes-body container-fluid">
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
                    <div className="card-episode">
                      <div onClick={() => this.handleEpisodePlayer(i)}>
                        <div className="card-episode-upvote">
                          <i className="fas fa-broadcast-tower" />
                        </div>
                        <div className="card-episode-body">
                          <p className="duration-text">{e.itunes_duration}</p>
                          <h3>{e.title}</h3>
                          <p>{moment(e.created).format("MMMM Do YYYY")}</p>
                        </div>
                      </div>
                      <div
                        className={`card-episode-description ${this.state
                          .showMoreId !== i && "d-none"}`}
                      >
                        <div className="episode-audio">
                          <ReactAudioPlayer
                            src="my_audio_file.ogg"
                            autoPlay
                            controls
                          />
                        </div>

                        <p>{e.itunes_summary}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div id="load-more">
              {!_.isEmpty(this.props.episodes) &&
                !this.state.loadingMore && (
                  <Link onClick={this.loadMore} to="#load-more">
                    <Button color="info" size="md">
                      Load more...
                    </Button>
                  </Link>
                )}
              {this.state.loadingMore && <Loading />}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
