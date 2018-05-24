import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import EmployeeForm from "../employee/EmployeeForm";
import PaymentReport from "../payment/PaymentReport";

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <Header />
        <Route path="/employee" component={EmployeeForm} />
        <Route path="/payment" component={PaymentReport} />
        <Footer />
      </div>
    );
  }
}

export default MainPage;
