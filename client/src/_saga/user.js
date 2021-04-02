import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_ICON_FAILURE,
  ADD_ICON_REQUEST,
  ADD_ICON_SUCCESS,
  ADD_ICON_URL_FAILURE,
  ADD_ICON_URL_REQUEST,
  ADD_ICON_URL_SUCCESS,
  CHANGE_PASSWORD_CLEAR,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CONFIRM_PASSWORD_CLEAR,
  CONFIRM_PASSWORD_FAILURE,
  CONFIRM_PASSWORD_REQUEST,
  CONFIRM_PASSWORD_SUCCESS,
  LOAD_INFO_FAILURE,
  LOAD_INFO_REQUEST,
  LOAD_INFO_SUCCESS,
  LOG_IN_CLEAR,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_CLEAR,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REMOVE_ICON_FAILURE,
  REMOVE_ICON_REQUEST,
  REMOVE_ICON_SUCCESS,
  SIGN_UP_CLEAR,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  WITHDRWAL_CLEAR,
  WITHDRWAL_FAILURE,
  WITHDRWAL_REQUEST,
  WITHDRWAL_SUCCESS,
} from "../_reducers/user";

function logInAPI(data) {
  return axios.post("/api/user/logIn", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: LOG_IN_CLEAR,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
    yield delay(3000);
    yield put({
      type: LOG_IN_CLEAR,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/user/logOut");
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
    yield delay(3000);
    yield put({
      type: LOG_OUT_CLEAR,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
    yield delay(3000);
    yield put({
      type: LOG_OUT_CLEAR,
    });
  }
}

function signUpAPI(data) {
  return axios.post("/api/user/signUp", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      result,
    });
    yield delay(5000);
    yield put({
      type: SIGN_UP_CLEAR,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function addIconAPI(data) {
  return axios.post("/api/user/icon", data);
}

function* addIcon(action) {
  try {
    const result = yield call(addIconAPI, action.data);
    yield put({
      type: ADD_ICON_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_ICON_FAILURE,
      error: err.response.data,
    });
  }
}

function addIconUrlAPI(data) {
  return axios.post("/api/user/icon/url", data);
}

function* addIconUrl(action) {
  try {
    const result = yield call(addIconUrlAPI, action.data);
    yield put({
      type: ADD_ICON_URL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_ICON_URL_FAILURE,
      error: err.response.data,
    });
  }
}

function removeIconAPI(data) {
  return axios.delete(`/api/user/icon/${data}`);
}

function* removeIcon(action) {
  try {
    const result = yield call(removeIconAPI, action.data);
    yield put({
      type: REMOVE_ICON_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_ICON_FAILURE,
      error: err.response.data,
    });
  }
}

function loadInfoAPI() {
  return axios.get("/api/user");
}

function* loadInfo(action) {
  try {
    const result = yield call(loadInfoAPI);
    yield put({
      type: LOAD_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function confirmPasswordAPI(data) {
  return axios.post(`api/user/confirm`, data);
}

function* confirmPassword(action) {
  try {
    const result = yield call(confirmPasswordAPI, action.data);
    yield put({
      type: CONFIRM_PASSWORD_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: CONFIRM_PASSWORD_CLEAR,
    });
  } catch (err) {
    yield put({
      type: CONFIRM_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

function changePasswordAPI(data) {
  return axios.post(`api/user/password`, data);
}

function* changePassword(action) {
  try {
    const result = yield call(changePasswordAPI, action.data);
    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: CHANGE_PASSWORD_CLEAR,
    });
  } catch (err) {
    yield put({
      type: CHANGE_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

function withdrawalAPI(data) {
  return axios.delete(`api/user/${data}`);
}

function* withdrawal(action) {
  try {
    const result = yield call(withdrawalAPI, action.data);
    yield put({
      type: WITHDRWAL_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: WITHDRWAL_CLEAR,
    });
  } catch (err) {
    yield put({
      type: WITHDRWAL_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchAddIcon() {
  yield takeLatest(ADD_ICON_REQUEST, addIcon);
}
function* watchAddIconUrl() {
  yield takeLatest(ADD_ICON_URL_REQUEST, addIconUrl);
}
function* watchRemoveIcon() {
  yield takeLatest(REMOVE_ICON_REQUEST, removeIcon);
}
function* watchLoadInfo() {
  yield takeLatest(LOAD_INFO_REQUEST, loadInfo);
}
function* watchConfirmPassword() {
  yield takeLatest(CONFIRM_PASSWORD_REQUEST, confirmPassword);
}
function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}
function* watchWithdrawal() {
  yield takeLatest(WITHDRWAL_REQUEST, withdrawal);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchSignUp),
    fork(watchAddIcon),
    fork(watchAddIconUrl),
    fork(watchRemoveIcon),
    fork(watchLogOut),
    fork(watchLoadInfo),
    fork(watchConfirmPassword),
    fork(watchChangePassword),
    fork(watchWithdrawal),
  ]);
}
