import { call, put } from "redux-saga/effects";
import reducer, {
  savePaymentSaga,
  SET_PAYMENT,
  SAVE_PAYMENT,
  SAVE_PAYMENT_START,
  SAVE_PAYMENT_SUCCESS,
  SAVE_PAYMENT_ERROR,
  ReducerRecord
} from "./payment";
import { reset } from "redux-form";
import firebase from "firebase";
import { replace } from "react-router-redux";

describe("payment saga", () => {
  it("should save payment", () => {
    const payment = {
      annualSalary: "70000",
      firstName: "John",
      grossIncome: 5833,
      incomeTax: 1191,
      lastName: "Soyer",
      netIncome: 4642,
      payment: 4088,
      reportDate: 12345,
      superannuation: 554
    };

    const action = {
      type: SAVE_PAYMENT,
      payload: { payment }
    };

    const saga = savePaymentSaga(action);
    expect(saga.next().value).toEqual(
      put({
        type: SAVE_PAYMENT_START,
        payload: {}
      })
    );

    const peopleRef = firebase.database().ref("payment");

    expect(saga.next().value).toEqual(
      call([peopleRef, peopleRef.push], action.payload.payment)
    );

    expect(saga.next({}).value).toEqual(
      put({
        type: SAVE_PAYMENT_SUCCESS,
        payload: {}
      })
    );

    expect(saga.next().value).toEqual(put(replace("/employee")));

    expect(saga.next().done).toBe(true);
  });

  it("fail saving payment", () => {
    const payment = {};
    const action = {
      type: SAVE_PAYMENT,
      payload: { payment }
    };
    const saga = savePaymentSaga(action);
    expect(saga.next().value).toEqual(
      put({
        type: SAVE_PAYMENT_START,
        payload: {}
      })
    );

    const peopleRef = firebase.database().ref("payment");

    expect(saga.next().value).toEqual(
      call([peopleRef, peopleRef.push], action.payload.payment)
    );

    const error = new Error();

    expect(saga.throw(error).value).toEqual(
      put({
        type: SAVE_PAYMENT_ERROR,
        payload: { error }
      })
    );
  });
});

describe("payment reducer", () => {
  it("reducer ", () => {
    const state = new ReducerRecord();
    const payment = {
      annualSalary: "70000",
      firstName: "John",
      grossIncome: 5833,
      incomeTax: 1191,
      lastName: "Soyer",
      netIncome: 4642,
      payment: 4088,
      reportDate: 12345,
      superannuation: 554
    };

    let newState = reducer(state, {
      type: SET_PAYMENT,
      payload: payment
    });

    expect(newState).toEqual(
      ReducerRecord({
        payment,
        loading: false,
        loaded: false,
        error: null
      })
    );

    newState = reducer(state, {
      type: SAVE_PAYMENT_START,
      payload: {}
    });

    expect(newState).toEqual(ReducerRecord({ loading: true }));

    newState = reducer(state, {
      type: SAVE_PAYMENT_SUCCESS,
      payload: {}
    });

    expect(newState).toEqual(ReducerRecord({ loaded: true, loading: false }));

    newState = reducer(state, {
      type: SAVE_PAYMENT_ERROR,
      payload: new Error()
    });

    expect(newState).toEqual(
      ReducerRecord({ loaded: true, loading: false, error: new Error() })
    );
  });
});
