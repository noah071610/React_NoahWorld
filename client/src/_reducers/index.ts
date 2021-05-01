import { combineReducers } from "redux";
import user, { UserState } from "./user";
import post, { PostState } from "./post";
import blog, { BlogState } from "./blog";

const rootReducer = combineReducers<{ blog: BlogState; user: UserState; post: PostState }>({
  blog,
  user,
  post,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
