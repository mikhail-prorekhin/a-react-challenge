import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loadingSelector, loadedSelector, paymentSelector, savePayment} from '../../ducks/payment'
import { NavLink} from 'react-router-dom'



import Loader from '../common/Loader'

class PaymentReport extends Component {
    static propTypes = {

    };

    formatter = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        minimumFractionDigits: 0
      });
    options = { year: 'numeric', month: 'long', day: 'numeric' };

    savePayment = () => {
        this.props.savePayment(this.props.report);
    }

    render() {
        console.log(this.props.report);
        if (!this.props.report) {
            return (<div className="nodata form">
                <h2 className="nodata__title" data>Sorry no data to display, pease <NavLink  className="nodata__link link"  to = '/employee' >enter</NavLink> an employee data </h2>
                </div>)
        }

        const {
            annualSalary,
            firstName,
            grossIncome,
            incomeTax,
            lastName,
            netIncome,
            payment,
            reportDate,
            superannuation,
        } = this.props.report;
        let loader = this.props.loading? <Loader />: "";

        return (
            <div className=" report-main  main-content">
            {loader}
                <h1 className="page-title">Pay slip generator</h1>
                <div  className="report form">
                <div className="form-info">
                    <h1 className="form-info--title report-info">payslip for {firstName} {lastName}</h1>
                </div>
                <table className=" report__table">
                    <thead>
                        <tr  className=" report__head">
                        <td> item</td>
                        <td > employee details</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className=" report__row"><td>employee</td><td >{`${firstName} ${lastName}`}</td></tr>
                        <tr className=" report__row"><td>pay date</td><td >{(new Date(reportDate)).toLocaleDateString('en-AU', this.options)}</td></tr>
                        <tr className=" report__row"><td>pay frequency</td><td >monthly</td></tr>
                        <tr className=" report__row"><td>annual income</td><td >{this.formatter.format(annualSalary)}</td></tr>
                        <tr className=" report__row"><td>gross income</td><td >{this.formatter.format(grossIncome)}</td></tr>
                        <tr className=" report__row"><td>income tax</td><td >{this.formatter.format(incomeTax)}</td></tr>
                        <tr className=" report__row"><td>net income</td><td >{this.formatter.format(netIncome)}</td></tr>
                        <tr className=" report__row"><td>supper</td><td >{this.formatter.format(superannuation)}</td></tr>
                        <tr className=" report__row"><td>pay</td><td >{this.formatter.format(payment)}</td></tr>
                    </tbody>
                </table>
                <button className="btn report__submit" onClick={this.savePayment}> Pay </button>
                </div>
            </div>
        )
    }

}

export default connect((state) => ({
    report: paymentSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
}), { savePayment })(PaymentReport)