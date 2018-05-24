import { mount } from "enzyme";
import { ProtectedRouteDev as ProtectedRoute } from "./ProtectedRoute";
import React from "react";
import Loader from "./Loader";
import { MemoryRouter, Router, Route } from "react-router";
import history from "../../history";

describe("Protected Route", () => {
  it("allow the access ", () => {
    const form = mount(
          <Router history={history}>
            <ProtectedRoute authorized path="/" component={Loader} />
          </Router>
      );
    expect(form.find(".loading").length).toBe(1);
  });
  it("the access denied ", () => {
    const form = mount(
        <Router history={history}>
          <ProtectedRoute  path="/" component={Loader} />
        </Router>
    );
  expect(form.find(".unauthorized__title").length).toBe(1);
  });
});
