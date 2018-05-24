import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./common/ProtectedRoute";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import DefaultPage from "./routes/DefaultPage";

class App extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute path="/employee" component={MainPage} />
        <ProtectedRoute path="/payment" component={MainPage} />
        <Route path="/auth" component={LoginPage} />
        <Route exact path="/" component={DefaultPage} />
      </Switch>
    );
  }
}

export default App;
