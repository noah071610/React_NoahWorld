import { combineReducers } from "redux";
import user from "./user";
import post from "./post";
import blog from "./blog";

const rootReducer = combineReducers({
  blog,
  user,
  post,
});

export default rootReducer;
