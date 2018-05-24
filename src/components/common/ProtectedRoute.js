import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { userSelector } from "../../ducks/auth";
import { NavLink } from "react-router-dom";

export class ProtectedRouteDev extends Component {
  static propTypes = {};

  render() {
    const { component, authorized, ...rest } = this.props;
    return <Route {...rest} render={this.renderAuthorized} />;
  }

  renderAuthorized = ({ match }) => {
    return this.props.authorized ? (
      <this.props.component match={match} />
    ) : (
      <div className="unauthorized">
        <h2 className="unauthorized__title">
          You are an unauthorized, please
          <NavLink className="unauthorized__link link" to="/auth">
            login
          </NavLink>
          first
        </h2>
      </div>
    );
  };
}


export default connect(
  state => ({
    authorized: userSelector(state)
  }),
  null,
  null,
  { pure: false }
)(ProtectedRouteDev);
