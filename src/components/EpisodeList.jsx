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
    // console.log(
    //   "---->",
    //   this.props.selectPodcastById(this.props.match.params.id)
    // );
    const { episodes } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <Col md="2">
              {this.props.selectedPodcast && (
                <img src={this.props.selectedPodcast.artworkUrl100} />
              )}
              {!this.props.selectedPodcast && <Loading />}
            </Col>
            <Col md="10">
              {_.isEmpty(this.props.episodes) && <Loading />}
              {!_.isEmpty(this.props.episodes) && (
                <ul>
                  {episodes.map((e, i) => {
                    return (
                      <li className="list" key={i}>
                        <Card body>
                          <CardTitle>{e.title}</CardTitle>
                          <CardText>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: e.description
                              }}
                            />
                          </CardText>
                          <Button>Go somewhere</Button>
                        </Card>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Col>
          </Row>
        </Container>
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
    );
  }
}
