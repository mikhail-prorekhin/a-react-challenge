import { call, put } from "redux-saga/effects";
import reducer, {
  SET_EMPLOYEE,
  calcEmployeeSaga,
  SET_EMPLOYEE_ERROR,
  RESET_EMPLOYEE,
  ReducerRecord,
  PersonRecord
} from "./employee";
import { SET_PAYMENT } from "./payment";
import { reset } from "redux-form";
import calcPayment from "../business/payroll";
import { replace } from "react-router-redux";

describe("employee saga", () => {
  it("should redirect", () => {
    const employee = {
      firstName: "John",
      lastName: "Smith",
      annualSalary: 60050,
      superannuation: 9
    };

    const set_employee_action = {
      type: SET_EMPLOYEE,
      payload: { employee }
    };

    const saga = calcEmployeeSaga(set_employee_action);

    saga.next().value;

    const payment = calcPayment(employee.annualSalary, employee.superannuation);
    const payment_action = {
      type: SET_PAYMENT,
      payload: { ...employee, ...payment, reportDate: 123 }
    };

    expect(saga.next(123).value).toEqual(put(payment_action));

    expect(saga.next().value).toEqual(put(replace("/payment")));
  });

  it("should fail", () => {
    const employee = {
      firstName: "John",
      lastName: "Smith",
      annualSalary: -60050,
      superannuation: 9
    };
    const set_employee_action = {
      type: SET_EMPLOYEE,
      payload: { employee }
    };

    const saga = calcEmployeeSaga(set_employee_action);

    saga.next().value;

    const payment_error_action = {
        type: SET_EMPLOYEE_ERROR,
        payload:  new Error("the income must be a positive number")
      };
  
      expect(saga.next().value).toEqual(put(payment_error_action));   
  });
});

/**
 * Reducer Tests
 * */
describe("employee reducer", () => {
it("set payment", () => {
    const state = new ReducerRecord();
    const employee = {
        firstName: "John",
        lastName: "Smith",
        annualSalary: 60050,
        superannuation: 9
      };
  
    let set_employee = reducer(state, {
      type: SET_EMPLOYEE,
      payload: { employee }
    });
    expect(set_employee).toEqual(new ReducerRecord({ error: null, personData: new PersonRecord(employee)}));
  
    const set_employee_fail = reducer(state, {
       type: SET_EMPLOYEE_ERROR,
       payload: Error("Test Error")
     });
     expect(set_employee_fail).toEqual(new ReducerRecord({ error: new Error("Test Error"), personData: null}));
 
  });
});
