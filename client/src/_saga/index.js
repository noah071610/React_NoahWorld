import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_ICON_FAILURE,
  ADD_ICON_REQUEST,
  ADD_ICON_SUCCESS,
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
  SIGN_UP_CLEAR,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  WITHDRWAL_CLEAR,
  WITHDRWAL_FAILURE,
  WITHDRWAL_REQUEST,
  WITHDRWAL_SUCCESS,
} from "../_reducers/user";
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
  ADD_COMMENT_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  LOAD_CLASS_POSTS_REQUEST,
  LOAD_CLASS_POSTS_SUCCESS,
  LOAD_CLASS_POSTS_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  ADD_COMMENT_CLEAR,
  EDIT_COMMENT_REQUEST,
  EDIT_POST_REQUEST,
  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_CLEAR,
  EDIT_POST_FAILURE,
  EDIT_POST_SUCCESS,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_CLEAR,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  UNLIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_FAILURE,
  LIKE_COMMENT_REQUEST,
  UNLIKE_COMMENT_REQUEST,
  ADD_SUB_COMMENT_REQUEST,
  REMOVE_SUB_COMMENT_REQUEST,
  EDIT_SUB_COMMENT_REQUEST,
  EDIT_SUB_COMMENT_FAILURE,
  EDIT_SUB_COMMENT_CLEAR,
  EDIT_SUB_COMMENT_SUCCESS,
  REMOVE_SUB_COMMENT_FAILURE,
  REMOVE_SUB_COMMENT_SUCCESS,
  ADD_SUB_COMMENT_FAILURE,
  ADD_SUB_COMMENT_CLEAR,
  ADD_SUB_COMMENT_SUCCESS,
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
} from "../_reducers/post";
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

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

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
    // yield delay(3000);
    // yield put({
    //   type: ADD_ICON_CLEAR,
    // });
  } catch (err) {
    yield put({
      type: ADD_ICON_FAILURE,
      error: err.response.data,
    });
  }
}

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

function addCommentAPI(data) {
  return axios.post(`/api/comment/${data.postId}`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: ADD_COMMENT_CLEAR,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function removeCommentAPI(data) {
  return axios.delete(`/api/comment/${data}`);
}

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function editCommentAPI(data) {
  return axios.post(`api/comment/edit/${data.CommentId}/`, data);
}

function* editComment(action) {
  try {
    const result = yield call(editCommentAPI, action.data);
    yield put({
      type: EDIT_COMMENT_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: EDIT_COMMENT_CLEAR,
    });
  } catch (err) {
    yield put({
      type: EDIT_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}
function likeCommentAPI(data) {
  return axios.patch(`/api/comment/like/${data.UserId}/${data.CommentId}`);
}

function* likeComment(action) {
  try {
    const result = yield call(likeCommentAPI, action.data);
    yield put({
      type: LIKE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikeCommentAPI(data) {
  return axios.delete(`/api/comment/unlike/${data.UserId}/${data.CommentId}`);
}

function* unlikeComment(action) {
  try {
    const result = yield call(unlikeCommentAPI, action.data);
    yield put({
      type: UNLIKE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function addSubCommentAPI(data) {
  return axios.post(`/api/comment/sub/${data.CommentId}`, data);
}

function* addSubComment(action) {
  try {
    const result = yield call(addSubCommentAPI, action.data);
    yield put({
      type: ADD_SUB_COMMENT_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: ADD_SUB_COMMENT_CLEAR,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_SUB_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function removeSubCommentAPI(data) {
  return axios.delete(`/api/comment/sub/${data.CommentId}/${data.SubCommentId}`);
}

function* removeSubComment(action) {
  try {
    const result = yield call(removeSubCommentAPI, action.data);
    yield put({
      type: REMOVE_SUB_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: REMOVE_SUB_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function editSubCommentAPI(data) {
  return axios.post(`api/comment/sub/edit/${data.CommentId}/${data.SubCommentId}`, data);
}

function* editSubComment(action) {
  try {
    const result = yield call(editSubCommentAPI, action.data);
    yield put({
      type: EDIT_SUB_COMMENT_SUCCESS,
      data: result.data,
    });
    yield delay(3000);
    yield put({
      type: EDIT_SUB_COMMENT_CLEAR,
    });
  } catch (err) {
    yield put({
      type: EDIT_SUB_COMMENT_FAILURE,
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
function* watchLoadInfo() {
  yield takeLatest(LOAD_INFO_REQUEST, loadInfo);
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
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}
function* watchEditComment() {
  yield takeLatest(EDIT_COMMENT_REQUEST, editComment);
}
function* watchLikeComment() {
  yield takeLatest(LIKE_COMMENT_REQUEST, likeComment);
}

function* watchUnlikeComment() {
  yield takeLatest(UNLIKE_COMMENT_REQUEST, unlikeComment);
}
function* watchAddSubComment() {
  yield takeLatest(ADD_SUB_COMMENT_REQUEST, addSubComment);
}
function* watchRemoveSubComment() {
  yield takeLatest(REMOVE_SUB_COMMENT_REQUEST, removeSubComment);
}
function* watchEditSubComment() {
  yield takeLatest(EDIT_SUB_COMMENT_REQUEST, editSubComment);
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

export default function* rootSaga() {
  yield all([
    fork(watchAddWord),
    fork(watchRemoveWord),
    fork(watchRemoveQuiz),
    fork(watchAddQuiz),
    fork(watchSearchKeyword),
    fork(watchSearchHashtag),
    fork(watchLogOut),
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchloadCategoryPosts),
    fork(watchloadMorePosts),
    fork(watchloadClassPosts),
    fork(watchLoadPost),
    fork(watchLoadRecentPosts),
    fork(watchLoadInfo),
    fork(watchLogIn),
    fork(watchSignUp),
    fork(watchAddIcon),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchEditComment),
    fork(watchLikeComment),
    fork(watchUnlikeComment),
    fork(watchAddSubComment),
    fork(watchRemoveSubComment),
    fork(watchEditSubComment),
    fork(watchUploadImages),
    fork(watchRemovePost),
    fork(watchEditPost),
    fork(watchConfirmPassword),
    fork(watchChangePassword),
    fork(watchWithdrawal),
  ]);
}
