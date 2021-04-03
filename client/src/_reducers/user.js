import produce from "../util/produce";

const initialState = {
  user: null,
  imagePath: null,
  confirmPassword: false,

  logInLoading: false,
  logInDone: false,
  logInError: null,

  logInGoogleLoading: false,
  logInGoogleDone: false,
  logInGoogleError: null,

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

  addIconUrlLoading: false,
  addIconUrlDone: false,
  addIconUrlError: null,

  removeIconLoading: false,
  removeIconDone: false,
  removeIconError: null,

  confirmPasswordLoading: false,
  confirmPasswordDone: false,
  confirmPasswordError: null,

  withDrawalLoading: false,
  withDrawalDone: false,
  withDrawalError: null,

  changePasswordLoading: false,
  changePasswordDone: false,
  changePasswordError: null,
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_IN_CLEAR = "LOG_IN_CLEAR";

export const LOG_IN_GOOGLE_REQUEST = "LOG_IN_GOOGLE_REQUEST";
export const LOG_IN_GOOGLE_SUCCESS = "LOG_IN_GOOGLE_SUCCESS";
export const LOG_IN_GOOGLE_FAILURE = "LOG_IN_GOOGLE_FAILURE";
export const LOG_IN_GOOGLE_CLEAR = "LOG_IN_GOOGLE_CLEAR";

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
export const ADD_ICON_CLEAR = "ADD_ICON_CLEAR";

export const ADD_ICON_URL_REQUEST = "ADD_ICON_URL_REQUEST";
export const ADD_ICON_URL_SUCCESS = "ADD_ICON_URL_SUCCESS";
export const ADD_ICON_URL_FAILURE = "ADD_ICON_URL_FAILURE";
export const ADD_ICON_URL_CLEAR = "ADD_ICON_URL_CLEAR";

export const REMOVE_ICON_REQUEST = "REMOVE_ICON_REQUEST";
export const REMOVE_ICON_SUCCESS = "REMOVE_ICON_SUCCESS";
export const REMOVE_ICON_FAILURE = "REMOVE_ICON_FAILURE";
export const REMOVE_ICON_CLEAR = "REMOVE_ICON_CLEAR";

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";
export const CHANGE_PASSWORD_CLEAR = "CHANGE_PASSWORD_CLEAR";

export const WITHDRWAL_REQUEST = "WITHDRWAL_REQUEST";
export const WITHDRWAL_SUCCESS = "WITHDRWAL_SUCCESS";
export const WITHDRWAL_FAILURE = "WITHDRWAL_FAILURE";
export const WITHDRWAL_CLEAR = "WITHDRWAL_CLEAR";

export const CONFIRM_PASSWORD_REQUEST = "CONFIRM_PASSWORD_REQUEST";
export const CONFIRM_PASSWORD_SUCCESS = "CONFIRM_PASSWORD_SUCCESS";
export const CONFIRM_PASSWORD_FAILURE = "CONFIRM_PASSWORD_FAILURE";
export const CONFIRM_PASSWORD_CLEAR = "CONFIRM_PASSWORD_CLEAR";

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
      case LOG_IN_GOOGLE_REQUEST:
        draft.logInGoogleLoading = true;
        draft.logInGoogleError = null;
        draft.logInGoogleDone = false;
        break;
      case LOG_IN_GOOGLE_SUCCESS:
        draft.logInGoogleLoading = false;
        draft.user = action.data;
        draft.logInGoogleDone = true;
        break;
      case LOG_IN_GOOGLE_FAILURE:
        draft.logInGoogleLoading = false;
        draft.logInGoogleError = action.error;
        break;
      case LOG_IN_GOOGLE_CLEAR:
        draft.logInGoogleError = null;
        draft.logInGoogleDone = false;
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
      case ADD_ICON_CLEAR:
        draft.addIconLoading = false;
        draft.addIconDone = false;
        draft.addIconError = null;
        break;
      case ADD_ICON_URL_REQUEST:
        draft.addIconUrlLoading = true;
        draft.addIconUrlError = null;
        draft.addIconUrlDone = false;
        break;
      case ADD_ICON_URL_SUCCESS:
        draft.addIconUrlLoading = false;
        draft.addIconUrlDone = true;
        draft.user.icon = action.data;
        break;
      case ADD_ICON_URL_FAILURE:
        draft.addIconUrlLoading = false;
        draft.addIconUrlError = action.error;
        break;
      case ADD_ICON_URL_CLEAR:
        draft.addIconUrlLoading = false;
        draft.addIconUrlDone = false;
        draft.addIconUrlError = null;
        break;
      case REMOVE_ICON_REQUEST:
        draft.removeIconLoading = true;
        draft.removeIconError = null;
        draft.removeIconDone = false;
        break;
      case REMOVE_ICON_SUCCESS:
        draft.removeIconLoading = false;
        draft.removeIconDone = true;
        draft.user.icon = "./images/blog/default-user.png";
        break;
      case REMOVE_ICON_FAILURE:
        draft.removeIconLoading = false;
        draft.removeIconError = action.error;
        break;
      case REMOVE_ICON_CLEAR:
        draft.removeIconLoading = false;
        draft.removeIconDone = false;
        draft.removeIconError = null;
        break;
      case CONFIRM_PASSWORD_REQUEST:
        draft.confirmPasswordLoading = true;
        draft.confirmPasswordError = null;
        draft.confirmPasswordDone = false;
        break;
      case CONFIRM_PASSWORD_SUCCESS:
        draft.confirmPasswordLoading = false;
        draft.confirmPasswordDone = true;
        draft.confirmPassword = true;
        break;
      case CONFIRM_PASSWORD_FAILURE:
        draft.confirmPasswordLoading = false;
        draft.confirmPasswordError = action.error;
        break;
      case CONFIRM_PASSWORD_CLEAR:
        draft.confirmPasswordLoading = false;
        draft.confirmPasswordError = null;
        draft.confirmPasswordDone = false;
        break;
      case CHANGE_PASSWORD_REQUEST:
        draft.changePasswordLoading = true;
        draft.changePasswordError = null;
        draft.changePasswordDone = false;
        break;
      case CHANGE_PASSWORD_SUCCESS:
        draft.changePasswordLoading = false;
        draft.changePasswordDone = true;
        break;
      case CHANGE_PASSWORD_FAILURE:
        draft.changePasswordLoading = false;
        draft.changePasswordError = action.error;
        break;
      case CHANGE_PASSWORD_CLEAR:
        draft.changePasswordLoading = false;
        draft.changePasswordDone = false;
        draft.changePasswordError = null;
        break;
      case WITHDRWAL_REQUEST:
        draft.withdrawalLoading = true;
        draft.withdrawalError = null;
        draft.withdrawalDone = false;
        break;
      case WITHDRWAL_SUCCESS:
        draft.withdrawalLoading = false;
        draft.withdrawalDone = true;
        break;
      case WITHDRWAL_FAILURE:
        draft.withdrawalLoading = false;
        draft.withdrawalError = action.error;
        break;
      case WITHDRWAL_CLEAR:
        draft.withdrawalLoading = false;
        draft.withdrawalError = null;
        draft.withdrawalDone = false;
        break;
      default:
        return state;
    }
  });

export default reducer;
