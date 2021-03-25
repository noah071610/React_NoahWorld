import produce from "../util/produce";

const initialState = {
  user: null,
  imagePath: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,

  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  loadInfoLoading: false,
  loadInfoDone: false,
  loadInfoError: null,

  signUpLoading: false,
  signUpDone: false,
  signUpError: null,

  addIconLoading: false,
  addIconDone: false,
  addIconError: null,
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_IN_CLEAR = "LOG_IN_CLEAR";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
export const LOG_OUT_CLEAR = "LOG_OUT_CLEAR";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const SIGN_UP_CLEAR = "SIGN_UP_CLEAR";

export const LOAD_INFO_REQUEST = "LOAD_INFO_REQUEST";
export const LOAD_INFO_SUCCESS = "LOAD_INFO_SUCCESS";
export const LOAD_INFO_FAILURE = "LOAD_INFO_FAILURE";

export const ADD_ICON_REQUEST = "ADD_ICON_REQUEST";
export const ADD_ICON_SUCCESS = "ADD_ICON_SUCCESS";
export const ADD_ICON_FAILURE = "ADD_ICON_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.user = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_IN_CLEAR:
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.user = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case LOG_OUT_CLEAR:
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOAD_INFO_REQUEST:
        draft.loadInfoLoading = true;
        draft.loadInfoDone = null;
        draft.loadInfoError = false;
        break;
      case LOAD_INFO_SUCCESS:
        draft.loadInfoLoading = false;
        draft.loadInfoDone = true;
        draft.user = action.data;
        break;
      case LOAD_INFO_FAILURE:
        draft.loadInfoLoading = false;
        draft.loadInfoError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.onSignUpPage = false;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case SIGN_UP_CLEAR:
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case ADD_ICON_REQUEST:
        draft.addIconLoading = true;
        draft.addIconError = null;
        draft.addIconDone = false;
        break;
      case ADD_ICON_SUCCESS:
        draft.addIconLoading = false;
        draft.addIconDone = true;
        draft.user.icon = action.data;
        break;
      case ADD_ICON_FAILURE:
        draft.addIconLoading = false;
        draft.addIconError = action.error;
        break;
      default:
        return state;
    }
  });

export default reducer;
