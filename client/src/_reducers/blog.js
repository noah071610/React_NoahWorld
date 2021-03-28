import { portfolio1, portfolio2, portfolio3 } from "../components/config";
import produce from "../util/produce";

const initialState = {
  theme: "light",
  header: "blog",
  portfolios: null,
  portfolio: [],
  prePortfolio: [],
  postPortfolio: [],
  posts: [],
  onAbout: false,
  onSignUpPage: false,
  postEditOn: false,
  searchPosts: null,
  hashtagPosts: null,
  onSlideMenu: false,
  onHeaderTitle: false,

  searchedKeyword: null,

  searchKeywordLoading: false,
  searchKeywordDone: false,
  searchKeywordError: null,

  searchHashTagLoading: false,
  searchHashTagDone: false,
  searchHashTagError: null,

  addWordLoading: false,
  addWordDone: false,
  addWordError: null,

  addQuizLoading: false,
  addQuizDone: false,
  addQuizError: null,

  removeWordLoading: false,
  removeWordDone: false,
  removeWordError: null,

  removeQuizLoading: false,
  removeQuizDone: false,
  removeQuizError: null,
};

export const MODE_CHANGE = "MODE_CHANGE";
export const LOAD_PORTFOLIOS = "LOAD_PORTFOLIOS";
export const LOAD_PORTFOLIO = "LOAD_PORTFOLIO";
export const LOAD_PREPORTFOLIO = "LOAD_PREPORTFOLIO";
export const LOAD_POSTPORTFOLIO = "LOAD_PSTPORTFOLIO";
export const CHAGE_HEADER = "CHAGE_HEADER";
export const SWITCH_ABOUT = "SWITCH_ABOUT";
export const ON_ABOUT = "ON_ABOUT";
export const OFF_ABOUT = "OFF_ABOUT";
export const ON_SIGN_UP_PAGE = "ON_SIGN_UP_PAGE";
export const REMOVE_IMAGE = "REMOVE_IMAGE";
export const POST_EDIT_ON = "POST_EDIT_ON";
export const POST_EDIT_OFF = "POST_EDIT_OFF";
export const CLICK_HASH_TAG = "CLICK_HASH_TAG";
export const ON_SLIDE_MENU = "ON_SLIDE_MENU";
export const ON_HEADER_TITLE = "ON_HEADER_TITLE";

export const SEARCH_KEYWORD_REQUEST = "SEARCH_KEYWORD_REQUEST";
export const SEARCH_KEYWORD_SUCCESS = "SEARCH_KEYWORD_SUCCESS";
export const SEARCH_KEYWORD_FAILURE = "SEARCH_KEYWORD_FAILURE";
export const SEARCH_KEYWORD_CLEAR = "SEARCH_KEYWORD_CLEAR";

export const SEARCH_HASH_TAG_REQUEST = "SEARCH_HASH_TAG_REQUEST";
export const SEARCH_HASH_TAG_SUCCESS = "SEARCH_HASH_TAG_SUCCESS";
export const SEARCH_HASH_TAG_FAILURE = "SEARCH_HASH_TAG_FAILURE";
export const SEARCH_HASH_TAG_CLEAR = "SEARCH_HASH_TAG_CLEAR";

export const ADD_WORD_REQUEST = "ADD_WORD_REQUEST";
export const ADD_WORD_SUCCESS = "ADD_WORD_SUCCESS";
export const ADD_WORD_FAILURE = "ADD_WORD_FAILURE";
export const ADD_WORD_CLEAR = "ADD_WORD_CLEAR";

export const REMOVE_WORD_REQUEST = "REMOVE_WORD_REQUEST";
export const REMOVE_WORD_SUCCESS = "REMOVE_WORD_SUCCESS";
export const REMOVE_WORD_FAILURE = "REMOVE_WORD_FAILURE";
export const REMOVE_WORD_CLEAR = "REMOVE_WORD_CLEAR";

export const REMOVE_QUIZ_REQUEST = "REMOVE_QUIZ_REQUEST";
export const REMOVE_QUIZ_SUCCESS = "REMOVE_QUIZ_SUCCESS";
export const REMOVE_QUIZ_FAILURE = "REMOVE_QUIZ_FAILURE";
export const REMOVE_QUIZ_CLEAR = "REMOVE_QUIZ_CLEAR";

export const ADD_QUIZ_REQUEST = "ADD_QUIZ_REQUEST";
export const ADD_QUIZ_SUCCESS = "ADD_QUIZ_SUCCESS";
export const ADD_QUIZ_FAILURE = "ADD_QUIZ_FAILURE";
export const ADD_QUIZ_CLEAR = "ADD_QUIZ_CLEAR";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MODE_CHANGE:
        draft.theme = action.data;
        break;
      case LOAD_PORTFOLIOS:
        draft.portfolios = [portfolio1, portfolio2, portfolio3];
        break;
      case LOAD_PORTFOLIO:
        draft.portfolios = [portfolio1, portfolio2, portfolio3];
        draft.portfolio = draft.portfolios[action.id];
        break;
      case CHAGE_HEADER:
        draft.header = action.header;
        break;
      case SWITCH_ABOUT:
        draft.onAbout = !draft.onAbout;
        break;
      case ON_ABOUT:
        draft.onAbout = true;
        break;
      case OFF_ABOUT:
        draft.onAbout = false;
        break;
      case ON_SIGN_UP_PAGE:
        draft.onSignUpPage = action.data;
        break;
      case POST_EDIT_ON:
        draft.postEditOn = !draft.postEditOn;
        break;
      case ON_SLIDE_MENU:
        draft.onSlideMenu = !draft.onSlideMenu;
        break;
      case ON_HEADER_TITLE:
        draft.onHeaderTitle = action.data;
        break;
      case POST_EDIT_OFF:
        draft.postEditOn = false;
        break;
      case SEARCH_KEYWORD_REQUEST:
        draft.searchKeywordLoading = true;
        draft.searchKeywordDone = false;
        draft.searchKeywordError = null;
        break;
      case SEARCH_KEYWORD_SUCCESS: {
        draft.searchPosts = action.data.searchPosts;
        draft.searchKeywordLoading = false;
        draft.searchKeywordDone = true;
        draft.searchedKeyword = action.data.searchedKeyword;
        break;
      }
      case SEARCH_KEYWORD_FAILURE:
        draft.searchKeywordLoading = false;
        draft.searchKeywordError = action.error;
        break;
      case SEARCH_KEYWORD_CLEAR:
        draft.searchKeywordLoading = false;
        draft.searchKeywordDone = false;
        draft.searchKeywordError = null;
        break;
      case SEARCH_HASH_TAG_REQUEST:
        draft.searchHashTagLoading = true;
        draft.searchHashTagDone = false;
        draft.searchHashTagError = null;
        break;
      case SEARCH_HASH_TAG_SUCCESS: {
        draft.searchHashTagLoading = false;
        draft.searchHashTagDone = true;
        draft.hashtagPosts = action.data.hashtagPosts;
        break;
      }
      case SEARCH_HASH_TAG_FAILURE:
        draft.searchHashTagLoading = false;
        draft.searchHashTagError = action.error;
        break;
      case SEARCH_HASH_TAG_CLEAR:
        draft.searchHashTagLoading = false;
        draft.searchHashTagDone = false;
        draft.searchHashTagError = null;
        break;
      case ADD_WORD_REQUEST:
        draft.addWordLoading = true;
        draft.addWordDone = false;
        draft.addWordError = null;
        break;
      case ADD_WORD_SUCCESS:
        draft.addWordLoading = false;
        draft.addWordDone = true;
        break;
      case ADD_WORD_FAILURE:
        draft.addWordLoading = false;
        draft.addWordError = action.error;
        break;
      case ADD_WORD_CLEAR:
        draft.addWordLoading = false;
        draft.addWordDone = false;
        draft.addWordError = null;
        break;
      case REMOVE_WORD_REQUEST:
        draft.removeWordLoading = true;
        draft.removeWordDone = false;
        draft.removeWordError = null;
        break;
      case REMOVE_WORD_SUCCESS:
        draft.removeWordLoading = false;
        draft.removeWordDone = true;
        break;
      case REMOVE_WORD_FAILURE:
        draft.removeWordLoading = false;
        draft.removeWordError = action.error;
        break;
      case REMOVE_WORD_CLEAR:
        draft.removeWordLoading = false;
        draft.removeWordDone = false;
        draft.removeWordError = null;
        break;
      case REMOVE_QUIZ_REQUEST:
        draft.removeQuizLoading = true;
        draft.removeQuizDone = false;
        draft.removeQuizError = null;
        break;
      case REMOVE_QUIZ_SUCCESS:
        draft.removeQuizLoading = false;
        draft.removeQuizDone = true;
        break;
      case REMOVE_QUIZ_FAILURE:
        draft.removeQuizLoading = false;
        draft.removeQuizError = action.error;
        break;
      case REMOVE_QUIZ_CLEAR:
        draft.removeQuizLoading = false;
        draft.removeQuizDone = false;
        draft.removeQuizError = null;
        break;
      case ADD_QUIZ_REQUEST:
        draft.addQuizLoading = true;
        draft.addQuizDone = false;
        draft.addQuizError = null;
        break;
      case ADD_QUIZ_SUCCESS:
        draft.addQuizLoading = false;
        draft.addQuizDone = true;
        break;
      case ADD_QUIZ_FAILURE:
        draft.addQuizLoading = false;
        draft.addQuizError = action.error;
        break;
      case ADD_QUIZ_CLEAR:
        draft.addQuizLoading = false;
        draft.addQuizDone = false;
        draft.addQuizError = null;
        break;
      default:
        return state;
    }
  });

export default reducer;
