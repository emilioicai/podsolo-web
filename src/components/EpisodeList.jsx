import React from "react";
import _ from "lodash";
import Loading from "./Loading.jsx";
import Home from "./Home.jsx";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
  CardColumns
} from "reactstrap";

export default class User extends React.Component {
  state = {
    loadingMore: false
  };
  limit = 12;

  componentDidMount = () => {
    // TODO: Don't retrieve episodes if the list is the list is already present (it has been isomorphically fetched)
    this.props.getEpisodes(this.props.match.params.id, this.limit);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      // user has navigated to a new episodes page
      // load data for that podcast and set to state
      this.props.getEpisodes(nextProps.match.params.id, this.limit);
    }
  };

  loadMore = () => {
    this.props.getEpisodes(
      this.props.match.params.id,
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
    console.log(this.props.selectedPodcast);
    if (_.isEmpty(this.props.episodes)) {
      return <Loading />;
    }
    const { episodes } = this.props;
    return (
      <div>
        {/* <Container>
          <div>
            <Col sm="2" />
          </div>
        </Container> */}
        <ul>
          <CardColumns>
            {/* <Row> */}
            {episodes.map((e, i) => {
              return (
                // <Col sm="4">
                <li className="list" key={i}>
                  <Card body>
                    <CardTitle>{e.title}</CardTitle>
                    <CardText>
                      <div
                        dangerouslySetInnerHTML={{ __html: e.description }}
                      />
                    </CardText>
                    <Button>Go somewhere</Button>
                  </Card>
                </li>
                // </Col>
              );
            })}
            {/* </Row>  */}
          </CardColumns>
        </ul>

        <div id="load-more">
          {!this.state.loadingMore && (
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
