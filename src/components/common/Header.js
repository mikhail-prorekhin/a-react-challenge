import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../../ducks/auth";

class Header extends Component {
  signOut = e => {
    e.preventDefault();
    this.props.signOut();
  };

  render() {
    return (
      <header className="header">
        <h2 class="header--logo logo">myob</h2>
        <a className="header--logout" href={null} onClick={this.signOut}>
          logout
        </a>
      </header>
    );
  }
}

export default connect(null, { signOut })(Header);
