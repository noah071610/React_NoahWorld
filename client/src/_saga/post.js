import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_CATEGORY_POSTS_REQUEST,
  LOAD_CATEGORY_POSTS_FAILURE,
  LOAD_CATEGORY_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  LOAD_CLASS_POSTS_REQUEST,
  LOAD_CLASS_POSTS_SUCCESS,
  LOAD_CLASS_POSTS_FAILURE,
  EDIT_POST_REQUEST,
  EDIT_POST_FAILURE,
  EDIT_POST_SUCCESS,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_CLEAR,
  LOAD_MORE_POSTS_REQUEST,
  LOAD_MORE_POSTS_SUCCESS,
  LOAD_MORE_POSTS_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_CLEAR,
  LOAD_RECENT_POSTS_REQUEST,
  LOAD_RECENT_POSTS_SUCCESS,
  LOAD_RECENT_POSTS_FAILURE,
  UPLOAD_POST_IMAGE_REQUEST,
  UPLOAD_POST_IMAGE_SUCCESS,
  UPLOAD_POST_IMAGE_CLEAR,
  UPLOAD_POST_IMAGE_FAILURE,
} from "../_reducers/post";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostsAPI(data) {
  return axios.get(`/api/post`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadCategoryPostsAPI(data) {
  return axios.get(`/api/post/category/${data}`);
}

function* loadCategoryPosts(action) {
  try {
    const result = yield call(loadCategoryPostsAPI, action.data);
    yield put({
      type: LOAD_CATEGORY_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_CATEGORY_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMorePostsAPI(data) {
  return axios.get(`/api/post/morepost/${data.category}?lastId=${data.LastId}`);
}

function* loadMorePosts(action) {
  try {
    const result = yield call(loadMorePostsAPI, action.data);
    yield put({
      type: LOAD_MORE_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MORE_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadClassPostsAPI() {
  return axios.get(`/api/post/class`);
}

function* loadClassPosts() {
  try {
    const result = yield call(loadClassPostsAPI);
    yield put({
      type: LOAD_CLASS_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_CLASS_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`/api/post/onePost/${data.postId}/${data.UserId}`);
}
function loadSidePostsAPI(data) {
  return axios.get(`/api/post/sidePosts/${data.id}/${data.category}`);
}

function* loadPost(action) {
  try {
    const post = yield call(loadPostAPI, action.data);
    const sidePosts = yield call(loadSidePostsAPI, post.data.post);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: { post, sidePosts },
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function loadRecentPostsAPI(data) {
  return axios.post(`/api/post/recent`, data);
}
function* loadRecentPosts(action) {
  try {
    const result = yield call(loadRecentPostsAPI, action.data);
    yield put({
      type: LOAD_RECENT_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_RECENT_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/api/post/like/${data.PostId}/${data.UserId}`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/api/post/like/${data.PostId}/${data.UserId}`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post("/api/post/images", data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
    yield delay(3000);
    yield put({
      type: UPLOAD_IMAGES_CLEAR,
    });
  }
}

function uploadPostImageAPI(data) {
  return axios.post("/api/post/image", data);
}

function* uploadPostImage(action) {
  try {
    const result = yield call(uploadPostImageAPI, action.data);
    yield put({
      type: UPLOAD_POST_IMAGE_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: UPLOAD_POST_IMAGE_CLEAR,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_POST_IMAGE_FAILURE,
      error: err.response.data,
    });
    yield delay(3000);
    yield put({
      type: UPLOAD_POST_IMAGE_CLEAR,
    });
  }
}

function removePostAPI(data) {
  return axios.post(`api/post/delete`, data);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: REMOVE_POST_CLEAR,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function editPostAPI(data) {
  return axios.post(`api/post/edit`, data);
}

function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.data);
    yield put({
      type: EDIT_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: EDIT_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchloadCategoryPosts() {
  yield takeLatest(LOAD_CATEGORY_POSTS_REQUEST, loadCategoryPosts);
}
function* watchloadMorePosts() {
  yield takeLatest(LOAD_MORE_POSTS_REQUEST, loadMorePosts);
}
function* watchLoadRecentPosts() {
  yield takeLatest(LOAD_RECENT_POSTS_REQUEST, loadRecentPosts);
}
function* watchloadClassPosts() {
  yield takeLatest(LOAD_CLASS_POSTS_REQUEST, loadClassPosts);
}
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost);
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchUploadPostImage() {
  yield takeLatest(UPLOAD_POST_IMAGE_REQUEST, uploadPostImage);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchloadCategoryPosts),
    fork(watchloadMorePosts),
    fork(watchloadClassPosts),
    fork(watchLoadPost),
    fork(watchLoadRecentPosts),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
    fork(watchUploadPostImage),
    fork(watchRemovePost),
    fork(watchEditPost),
  ]);
}
