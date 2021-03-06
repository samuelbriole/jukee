import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { reset } from 'redux-form';

import api from 'utils/api';
import { types as sessionTypes } from 'actions/session';
import { types as errorTypes } from 'actions/errors';
import routes from 'config/routes';

function setCurrentUser(response) {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
}

// Login

function login(data) {
  return api.post('/sessions', data);
}

function* callLogin({ data }) {
  try {
    const result = yield call(login, data);
    yield put({
      type: sessionTypes.AUTHENTICATION_SUCCESS,
      response: result.data,
    });
    setCurrentUser(result.data);
    yield put(reset('signup'));
  } catch (error) {
    yield put({ type: sessionTypes.AUTHENTICATION_FAILURE });
    yield put({ type: errorTypes.NEW_ERROR, message: error.response.data.errors });
    localStorage.removeItem('token');
  }
}

function* loginSaga() {
  yield* takeEvery(sessionTypes.LOGIN_REQUEST, callLogin);
}

// Signup

function signup(data) {
  return api.post('/users', data);
}

function* callSignup({ data }) {
  try {
    const result = yield call(signup, data);
    yield put({
      type: sessionTypes.AUTHENTICATION_SUCCESS,
      response: result.data,
    });
    setCurrentUser(result.data);
    yield put(reset('signup'));
  } catch (error) {
    yield put({ type: sessionTypes.AUTHENTICATION_FAILURE });
    yield put({ type: errorTypes.NEW_ERROR, message: error.response.data.errors });
    localStorage.removeItem('token');
  }
}

function* signupSaga() {
  yield* takeEvery(sessionTypes.SIGNUP_REQUEST, callSignup);
}

// Logout

function logout() {
  return api.delete('/sessions');
}

function* callLogout() {
  yield call(logout);
  localStorage.removeItem('token');
}

function* logoutSaga() {
  yield* takeEvery(sessionTypes.LOGOUT, callLogout);
}

// Authenticate

function authenticate() {
  return api.post('/sessions/refresh');
}

function* callAuthenticate() {
  try {
    const result = yield call(authenticate);
    yield put({
      type: sessionTypes.AUTHENTICATION_SUCCESS,
      response: result.data,
    });
    setCurrentUser(result.data);
  } catch (error) {
    yield put({ type: sessionTypes.AUTHENTICATION_FAILURE });
    yield put({ type: errorTypes.NEW_ERROR, message: error.response.data.errors });
    localStorage.removeItem('token');
    window.location = routes.login;
  }
}

function* authenticateSaga() {
  yield* takeEvery(sessionTypes.AUTHENTICATION_REQUEST, callAuthenticate);
}

export default [loginSaga, signupSaga, logoutSaga, authenticateSaga];
