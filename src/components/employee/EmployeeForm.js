import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import ErrorField from "../common/ErrorField";
import { isValidAndPositiveValue } from "../../business/payroll";
import { errorSelector, setEmployee } from "../../ducks/employee";

class EmpoloyeeForm extends Component {
  static propTypes = {};
  onSubmit = ({ firstName, lastName, annualSalary, superannuation }) =>
    this.props.setEmployee({
      firstName,
      lastName,
      annualSalary,
      superannuation
    });

  render() {
    const { calcPaymentError } = this.props;
    return (
      <div className="employee  main-content">
      <h1 className="page-title">Pay slip generator</h1>
        <form
          className="employee__form form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
        <div className="form-info">

            <h1 className="form-info--title eployee-info">employee info</h1>
        </div>
        <table className="employee__table">
          <tr className="employee__row">
            <td className="employee__cell">
            <Field name="firstName" label="first name" component={ErrorField} />
            </td>
            <td className="employee__cell">
            <Field name="lastName" label="last name" component={ErrorField} />
            </td>
          </tr>
          <tr className="employee__row">
            <td className="employee__cell">
            <Field
            inputModificator="input-money"
            name="annualSalary"
            label="annual salary"
            component={ErrorField}/>
            </td>
            <td className="employee__cell">
            <Field
            inputModificator="input-percent"
            name="superannuation"
            label="superannuation rate"
            component={ErrorField}/>
            </td>
          </tr>
        </table>

          {calcPaymentError && (
            <h2 className="employee__error error-message">{calcPaymentError}</h2>
          )}
          <input className="btn employee__submit" type="submit" value="generate payslip" />
        </form>
      </div>
    );
  }
}

export const validate = ({
  firstName,
  lastName,
  annualSalary,
  superannuation
}) => {
  const errors = {};
  if (!firstName) errors.firstName = "first name is required";
  if (!lastName) errors.lastName = "last name is required";
  if (!/^\s*\+?\d+\s*$/.test(annualSalary))
    errors.annualSalary = "must be positive value";
  if (!isValidAndPositiveValue(superannuation) || +superannuation > 50)
    errors.superannuation = "must be 0% - 50% inclusive";

  return errors;
};

export default connect(
  state => ({
    calcPaymentError: errorSelector(state)
  }),
  { setEmployee }
)(
  reduxForm({
    form: "employee",
    validate
  })(EmpoloyeeForm)
);
