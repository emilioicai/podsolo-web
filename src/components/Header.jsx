import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <nav id="mainNav" className="navbar navbar-custom">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              Top podcasts
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
