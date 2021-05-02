import { CommentsInter, PostInter, SubCommentsInter } from "src/_reducers/@reducerTypes";

export interface ArticleInter {
  article: PostInter;
  nocontent?: Boolean;
  type?: string;
}

export interface CommentProps {
  comment: CommentsInter;
}

export interface SubCommentProps {
  subComment?: SubCommentsInter;
  CommentId: number;
}
