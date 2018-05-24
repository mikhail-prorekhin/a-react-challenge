import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <nav className="footer__nav">
          <h2 className="logo">myob</h2>
          <ul className="links footer--links">
            <li className="links--item link">
              <a className="links-ref" href={null}>
                link 1
              </a>
            </li>
            <li className="links--item link">
              <a className="links-ref" href={null}>
                link 2
              </a>
            </li>
            <li className="links--item link">
              <a className="links-ref" href={null}>
                link 3
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__info">
          <h4 className="footer--copyright">A company (2018)</h4>
          <h4 className="footer--about">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h4>
        </div>
      </footer>
    );
  }
}

export default Footer;
