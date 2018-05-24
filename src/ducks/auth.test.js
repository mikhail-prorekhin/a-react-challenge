import firebase from "firebase";
import reducer, {
    signUpSaga, signInSaga, watchStatusChangeSaga,
    SIGN_OUT_REQUEST, SIGN_OUT_START, SIGN_OUT_SUCCESS, SIGN_OUT_ERROR,
    SIGN_IN_REQUEST, SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_ERROR,
    ReducerRecord
} from "./auth";
import { take, call, put } from "redux-saga/effects";
import { replace } from "react-router-redux";

/**
 * Saga tests
 * */

it("should sign in", () => {
  const auth = firebase.auth();
  const authData = {
    email: "test@test.test",
    password: "12341234"
  };

  const user = {
    email: authData.email,
    uid: Math.random().toString()
  };

  const requestAction = {
    type: SIGN_IN_REQUEST,
    payload: authData
  };

  const saga = signInSaga(requestAction);

  expect(saga.next().value).toEqual(put({ type: SIGN_IN_START }));

  expect(saga.next().value).toEqual(
    call(
      [auth, auth.signInWithEmailAndPassword],
      authData.email,
      authData.password
    )
  );

  const error = new Error();

  expect(saga.throw(error).value).toEqual(
    put({
      type: SIGN_IN_ERROR,
      payload: { error }
    })
  );
});

it("should redirect", () => {
  const saga = watchStatusChangeSaga()
  saga.next();
  saga.next('ss');
  expect(saga.next({ user: "ss" }).value).toEqual(put({
    type: SIGN_IN_SUCCESS,
    payload: { user: "ss" }
  }));

  expect(saga.next().value).toEqual(put(replace("/employee")));
});

it("should redirect", () => {
    const saga = watchStatusChangeSaga()
    saga.next();
    saga.next('ss');
    expect(saga.next({ }).value).toEqual(put({
      type: SIGN_OUT_SUCCESS,
      payload: {  }
    }));
  
    expect(saga.next().value).toEqual(put(replace("/auth")));
});

/**
 * Reducer Tests
 * */

it("should sign in", () => {
  const state = new ReducerRecord();
  const user = {
    email: "test@test.test",
    uid: Math.random().toString()
  };

  let newState = reducer(state, {
    type: SIGN_IN_SUCCESS,
    payload: { user }
  });

  expect(newState).toEqual(new ReducerRecord({ user }));

  newState = reducer(state, {
    type: SIGN_OUT_SUCCESS,
    payload: {  }
  });

  expect(newState).toEqual(new ReducerRecord({ user: null }));
});
