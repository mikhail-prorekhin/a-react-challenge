import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class DefaultPage extends Component {
  render() {
    return (
      <Redirect
        to={{
          pathname: "/auth"
        }}
      />
    );
  }
}

export default DefaultPage;
