import { PostInter } from "src/_reducers/@reducerTypes";

export interface ArticleInter {
  article: PostInter;
  nocontent?: Boolean;
  type?: string;
}
