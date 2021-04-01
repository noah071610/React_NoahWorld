import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_QUIZ_CLEAR,
  ADD_QUIZ_FAILURE,
  ADD_QUIZ_REQUEST,
  ADD_QUIZ_SUCCESS,
  ADD_WORD_CLEAR,
  ADD_WORD_FAILURE,
  ADD_WORD_REQUEST,
  ADD_WORD_SUCCESS,
  REMOVE_QUIZ_CLEAR,
  REMOVE_QUIZ_FAILURE,
  REMOVE_QUIZ_REQUEST,
  REMOVE_QUIZ_SUCCESS,
  REMOVE_WORD_CLEAR,
  REMOVE_WORD_FAILURE,
  REMOVE_WORD_REQUEST,
  REMOVE_WORD_SUCCESS,
  SEARCH_HASH_TAG_CLEAR,
  SEARCH_HASH_TAG_FAILURE,
  SEARCH_HASH_TAG_REQUEST,
  SEARCH_HASH_TAG_SUCCESS,
  SEARCH_KEYWORD_CLEAR,
  SEARCH_KEYWORD_FAILURE,
  SEARCH_KEYWORD_REQUEST,
  SEARCH_KEYWORD_SUCCESS,
} from "../_reducers/blog";

function addWordAPI(data) {
  return axios.post(`/api/quiz/word`, data);
}

function* addWord(action) {
  try {
    const result = yield call(addWordAPI, action.data);
    yield put({
      type: ADD_WORD_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: ADD_WORD_CLEAR,
    });
  } catch (err) {
    yield put({
      type: ADD_WORD_FAILURE,
      error: err.response.data,
    });
    yield delay(3000);
    yield put({
      type: ADD_WORD_CLEAR,
    });
  }
}

function removeWordAPI(data) {
  return axios.delete(`/api/quiz/word/${data.WordId}`);
}

function* removeWord(action) {
  try {
    const result = yield call(removeWordAPI, action.data);
    yield put({
      type: REMOVE_WORD_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: REMOVE_WORD_CLEAR,
    });
  } catch (err) {
    yield put({
      type: REMOVE_WORD_FAILURE,
      error: err.response.data,
    });
    yield delay(3000);
    yield put({
      type: REMOVE_WORD_CLEAR,
    });
  }
}

function addQuizAPI(data) {
  return axios.post(`/api/quiz`, data);
}

function* addQuiz(action) {
  try {
    const result = yield call(addQuizAPI, action.data);
    yield put({
      type: ADD_QUIZ_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: ADD_QUIZ_CLEAR,
    });
  } catch (err) {
    yield put({
      type: ADD_QUIZ_FAILURE,
      error: err.response.data,
    });
    yield delay(3000);
    yield put({
      type: ADD_QUIZ_CLEAR,
    });
  }
}

function removeQuizAPI(data) {
  return axios.delete(`/api/quiz/:QuizId`);
}

function* removeQuiz(action) {
  try {
    const result = yield call(removeQuizAPI, action.data);
    yield put({
      type: REMOVE_QUIZ_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: REMOVE_QUIZ_CLEAR,
    });
  } catch (err) {
    yield put({
      type: REMOVE_QUIZ_FAILURE,
      error: err.response.data,
    });
    yield delay(3000);
    yield put({
      type: REMOVE_QUIZ_CLEAR,
    });
  }
}

function searchKeywordAPI(data) {
  return axios.post(`/api/search/`, data);
}

function* searchKeyword(action) {
  try {
    const result = yield call(searchKeywordAPI, action.data);
    yield put({
      type: SEARCH_KEYWORD_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: SEARCH_KEYWORD_CLEAR,
    });
  } catch (err) {
    yield put({
      type: SEARCH_KEYWORD_FAILURE,
      error: err.response.data,
    });
    yield delay(3000);
    yield put({
      type: SEARCH_KEYWORD_CLEAR,
    });
  }
}

function searchHashtagAPI(data) {
  return axios.get(`/api/search/hashtag/${data}`);
}

function* searchHashtag(action) {
  try {
    const result = yield call(searchHashtagAPI, action.data);
    yield put({
      type: SEARCH_HASH_TAG_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: SEARCH_HASH_TAG_CLEAR,
    });
  } catch (err) {
    yield put({
      type: SEARCH_HASH_TAG_FAILURE,
      error: err.response.data,
    });
    yield delay(3000);
    yield put({
      type: SEARCH_HASH_TAG_CLEAR,
    });
  }
}

function* watchAddWord() {
  yield takeLatest(ADD_WORD_REQUEST, addWord);
}
function* watchRemoveWord() {
  yield takeLatest(REMOVE_WORD_REQUEST, removeWord);
}
function* watchAddQuiz() {
  yield takeLatest(ADD_QUIZ_REQUEST, addQuiz);
}
function* watchRemoveQuiz() {
  yield takeLatest(REMOVE_QUIZ_REQUEST, removeQuiz);
}
function* watchSearchKeyword() {
  yield takeLatest(SEARCH_KEYWORD_REQUEST, searchKeyword);
}
function* watchSearchHashtag() {
  yield takeLatest(SEARCH_HASH_TAG_REQUEST, searchHashtag);
}

export default function* blogSaga() {
  yield all([
    fork(watchAddWord),
    fork(watchRemoveWord),
    fork(watchRemoveQuiz),
    fork(watchAddQuiz),
    fork(watchSearchKeyword),
    fork(watchSearchHashtag),
  ]);
}
