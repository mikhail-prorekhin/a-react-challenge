import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import ErrorField from "../common/ErrorField";
import Loader from "../common/Loader";
import { loadingSelector, errorSelector, signIn } from "../../ducks/auth";


class LogInForm extends Component {
  static propTypes = {};

  render() {
    const { loading, authError, handleSubmit } = this.props;
    return (
      <div className="login ">
        <h3 className="logo login__logo">myob</h3>
        <h3 className="login__title">Sign in to Pay Slip Generator</h3>

        <form
          className="login__form form"
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <Field name="email"   component={ErrorField} />
          <Field name="password" component={ErrorField} type="password" />
          {authError && (
            <h2 className="login__error error-message">{authError}</h2>
          )}
          {loading && <Loader />}
          <input className="btn login__submit" type="submit" value="sign in"/>
        </form>
      </div>
    );
  }

  onSubmit = ({ email, password }) => this.props.signIn(email, password);
}

export const validate = ({ email, password }) => {
  const errors = {};
  if (!password) errors.password = "password is required";
  if (!email) errors.email = "email is required";
  if (!/^[\w\d\._-]+@([\w\d_-]+\.)+[\w\d]+$/.test(email))
    errors.email = "must be a valid email";

  return errors;
};

export default connect(
  state => ({
    loading: loadingSelector(state),
    authError: errorSelector(state)
  }),
  { signIn }
)(
  reduxForm({
    form: "auth",
    validate
  })(LogInForm)
);
