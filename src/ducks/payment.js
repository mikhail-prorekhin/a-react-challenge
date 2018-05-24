import { all, takeEvery, put, call } from "redux-saga/effects";
import { appName } from "../config";
import { Record } from "immutable";
import firebase from "firebase";
import { createSelector } from "reselect";
import { replace } from "react-router-redux";

/**
 * Constants
 * */
export const moduleName = "payment";
const prefix = `${appName}/${moduleName}`;

export const SET_PAYMENT = `${prefix}/SET_PAYMENT`;
export const SAVE_PAYMENT = `${prefix}/SAVE_PAYMENT`;
export const SAVE_PAYMENT_START = `${prefix}/SAVE_PAYMENT_START`;
export const SAVE_PAYMENT_SUCCESS = `${prefix}/SAVE_PAYMENT_SUCCESS`;
export const SAVE_PAYMENT_ERROR = `${prefix}/SAVE_PAYMENT_ERROR`;
/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  error: null,
  payment: null
});


export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PAYMENT:
      return state
        .set("loading", false)
        .set("loaded", false)
        .set("error", null)
        .set("payment", payload);

    case SAVE_PAYMENT_START:
      return state.set("loading", true);
    case SAVE_PAYMENT_SUCCESS:
      return state
        .set("loading", false)
        .set("loaded", true);
    case SAVE_PAYMENT_ERROR:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("error", payload);
    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName];
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
export const loadedSelector = createSelector(
  stateSelector,
  state => state.loaded
);
export const paymentSelector = createSelector(
  stateSelector,
  state => state.payment
);

/**
 * Action Creators
 * */

export function savePayment(payment) {
  return {
    type: SAVE_PAYMENT,
    payload: { payment }
  };
}

/**
 * Sagas
 * */

export function* savePaymentSaga(action) {
  yield put({
    type: SAVE_PAYMENT_START,
    payload: {}
  });

  const paymentRef = firebase.database().ref("payment");
  try { 
    yield call([paymentRef, paymentRef.push], action.payload.payment);
    yield put({
      type: SAVE_PAYMENT_SUCCESS,
      payload: {}
    });
    yield put(replace("/employee"));
  } catch (error) {
    yield put({
      type: SAVE_PAYMENT_ERROR,
      payload: { error }
    });
  }
}

export const saga = function*() {
  yield all([takeEvery(SAVE_PAYMENT, savePaymentSaga)]);
};
