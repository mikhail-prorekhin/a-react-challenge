import { all, takeEvery, take, put, apply, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { appName } from "../config";
import { createSelector } from "reselect";
import { Record } from "immutable";
import firebase from "firebase";
import { replace } from "react-router-redux";

/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_IN_START = `${prefix}/SIGN_IN_START`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;

export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_START = `${prefix}/SIGN_OUT_START`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${prefix}/SIGN_OUT_ERROR`;
/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  loading: false,
  error: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_START:
    case SIGN_OUT_START:
      return state.set("error", null).set("loading", true);

    case SIGN_OUT_SUCCESS:
      return state.set("loading", false).delete("user");
    case SIGN_IN_SUCCESS:
      return state.set("loading", false).set("user", payload.user);

    case SIGN_IN_ERROR:
    case SIGN_OUT_ERROR:
      return state.set("loading", false).set("error", payload.error.message);

    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName];
export const userSelector = createSelector(stateSelector, state => state.user);
export const errorSelector = createSelector(
  stateSelector,
  state => state.error
);
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
);

/**
 * Action Creators
 * */

export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  };
}

export function signOut(email, password) {
  return {
    type: SIGN_OUT_REQUEST
  };
}


export const createAuthChannel = () =>
  eventChannel(emit =>
    firebase.auth().onAuthStateChanged(user => emit({ user }))
  );

export const watchStatusChangeSaga = function*() {
  const chan = yield call(createAuthChannel);
  while (true) {
    const { user } = yield take(chan);

    if (user) {
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      });
      yield put(replace("/employee"));
    } else {
      yield put({
        type: SIGN_OUT_SUCCESS,
        payload: {}
      });
      yield put(replace("/auth"));
    }
  }
};

export const signInSaga = function*(action) {
  const { email, password } = action.payload;

  yield put({
    type: SIGN_IN_START
  });
  try {
    const auth = firebase.auth();
    yield apply(auth, auth.signInWithEmailAndPassword, [email, password]);
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      payload: { error }
    });
  }
};

export const signOutSaga = function*(action) {
  yield put({
    type: SIGN_OUT_START
  });
  try {
    const auth = firebase.auth();
    yield apply(auth, auth.signOut);
  } catch (error) {
    yield put({
      type: SIGN_OUT_ERROR,
      payload: { error }
    });
  }
};

export const saga = function*() {
  yield all([
    takeEvery(SIGN_IN_REQUEST, signInSaga),
    takeEvery(SIGN_OUT_REQUEST, signOutSaga),
    watchStatusChangeSaga()
  ]);
};
