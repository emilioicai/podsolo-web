import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

export default class User extends React.Component {
  componentDidMount() {
    // TODO: Don't retrieve episodes if the list is the list is already present (it has been isomorphically fetched)
    this.props.getEpisodes(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      // user has navigated to a new episodes page
      // load data for that podcast and set to state
      this.props.getEpisodes(nextProps.match.params.id);
    }
  }

  render() {
    if (_.isEmpty(this.props.episodes)) {
      return <div className="container loader">Loading...</div>;
    }
    const { episodes } = this.props;
    return (
      <div className='user-details'>

      </div>
    )
  }
}
