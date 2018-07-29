import React from "react";
export default class Footer extends React.Component {
  render() {
    return (
      <div className="navbar navbar-fixed-bottom footer">
        <div className="footer-links">
          <a href="#">
            <i className="fab fa-github-alt" />
          </a>
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
          <a href="#">
            <i className="fab fa-linkedin" />
          </a>
        </div>
        <div className="footer-copyright">
          This website is made with <i className="fa fa-heart" /> by Emilio &
          Eugenia
        </div>
      </div>
    );
  }
}
