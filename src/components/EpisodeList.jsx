import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

export default class User extends React.Component {
  componentDidMount = () => {
    // TODO: Don't retrieve episodes if the list is the list is already present (it has been isomorphically fetched)
    this.props.getEpisodes(this.props.match.params.id, 10);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      // user has navigated to a new episodes page
      // load data for that podcast and set to state
      this.props.getEpisodes(nextProps.match.params.id, 10);
    }
  }

  loadMore = () => {
    this.props.getEpisodes(this.props.match.params.id, this.props.episodes.length + 10, false);
  }

  render() {
    if (_.isEmpty(this.props.episodes)) {
      return <div className="container loader">Loading...</div>;
    }
    const { episodes } = this.props;
    return (
      <div>
        <ul className="cards">
          {episodes.map((e, i) => {
            return (<li className="card card-inline" key={i}>
              <div className="card-block">
                <h4 className="card-title">{e.title}</h4>
                <div dangerouslySetInnerHTML={{ __html: e.description }} />
              </div>
            </li>)
          })}
        </ul>
        <div id="load-more">
          <a onClick={this.loadMore} href='#load-more'>Load more...</a>
        </div>
      </div >
    )
  }
}
