import { appName } from "../config";
import { Record } from "immutable";
import { createSelector } from "reselect";
import { put, all, takeEvery, call } from "redux-saga/effects";
import calcPayment from "../business/payroll";
import { SET_PAYMENT } from "./payment";
import { replace } from "react-router-redux";

/**
 * Constants
 * */
export const moduleName = "employee";
const prefix = `${appName}/${moduleName}`;
export const SET_EMPLOYEE = `${prefix}/SET_EMPLOYEE`;
export const SET_EMPLOYEE_ERROR = `${prefix}/SET_EMPLOYEE_ERROR`;
/**
 * Reducer
 * */

export const ReducerRecord = Record({
  personData: null,
  error: null
});
export const PersonRecord = Record({
  firstName: null,
  lastName: null,
  annualSalary: null,
  superannuation: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SET_EMPLOYEE:
      return state
        .set("error", null)
        .set("personData", new PersonRecord(payload.employee));
    case SET_EMPLOYEE_ERROR:
      return state.set("personData", null).set("error", payload);
    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const employeeSelector = createSelector(
  stateSelector,
  state => state.employee
);
export const errorSelector = createSelector(
  stateSelector,
  state => state.error
);
/**
 * Action Creators
 * */

export function setEmployee(employee) {
  return {
    type: SET_EMPLOYEE,
    payload: { employee }
  };
}

export function getCurrentTime() {
  return (new Date()).getTime();
}

/**
 * Sagas
 */
export const calcEmployeeSaga = function*(action) {
  const { employee } = action.payload;
  const reportDate = yield call (getCurrentTime);

  try {
    const payment = calcPayment(employee.annualSalary, employee.superannuation);

    yield put({
      type: SET_PAYMENT,
      payload: { ...employee, ...payment, reportDate }
    });

    yield put(replace("/payment"));
  } catch (err) {
    yield put({
      type: SET_EMPLOYEE_ERROR,
      payload: err
    });
  }
};

export const saga = function*() {
  console.log();
  yield all([takeEvery(SET_EMPLOYEE, calcEmployeeSaga)]);
};
