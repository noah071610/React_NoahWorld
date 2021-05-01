import { combineReducers } from "redux";
import user from "./user";
import post from "./post";
import blog, { BlogState } from "./blog";

const rootReducer = combineReducers<{ blog: BlogState; user: any; post: any }>({
  blog,
  user,
  post,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
