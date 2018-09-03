import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { Row, Col, Button } from "reactstrap";
import AudioPlayer from "../components/AudioPlayer.jsx";
import { formatDurationString } from "../utilities";
import { connect } from "react-redux";
import { selectPodcast, selectEpisodes } from "../selectors";
import { selectPodcastById, getEpisodes } from "../actions";

class EpisodeLists extends React.Component {
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
                      {/* <div onClick={() => this.handleEpisodePlayer(i)}> */}
                      <div className="episode-audio">
                        <AudioPlayer
                          streamUrl={e.enclosures[0].url}
                          trackTitle={e.title}
                          created={e.created}
                          preloadType="none"
                          itunes_duration={formatDurationString(
                            e.itunes_duration
                          )}
                          onClickIcon={() => this.handleEpisodePlayer(i)}
                        />
                      </div>
                      {/* </div> */}
                      <div
                        className={`card-episode-description ${this.state
                          .showMoreId !== i && "d-none"}`}
                      >
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
//esto es para tomar las acciones  y usarlas como props
const mapDispatchToProps = dispatch => {
  return {
    selectPodcastById: podcastId => {
      dispatch(selectPodcastById(podcastId));
    },
    getEpisodes: (podcastId, limit) => {
      dispatch(getEpisodes(podcastId, limit));
    }
  };
};

// este es para seleccionar partes del estado y usarlo como props
const mapStateToProps = state => {
  return {
    selectedPodcast: selectPodcast(state),
    episodes: selectEpisodes(state)
  };
};

const ConnectedEpisodeLists = connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodeLists);

export default ConnectedEpisodeLists;
