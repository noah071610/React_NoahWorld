export interface portfolioInter {
  id: number;
  name: string;
  date: string;
  tags: string[];
  desc: string;
  src: string;
  git: string;
}

export interface SearchPostInter {
  id: number;
  hit: number;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  Hashtags?: Array<HashtagsInter>;
}

export interface AsideHashtags {
  name: string;
}

export interface QuizzesInter {
  id: number;
  type: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
}

export interface PostHashtagInter {
  createdAt: string;
  updatedAt: string;
  UserId: number;
  HashtagId: number;
}

export interface PostLikeInter {
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
}

export interface HashtagsInter {
  name: string;
  PostHashtag: PostHashtagInter;
}

export interface UserInfoInter {
  id: number;
  name: string;
  icon?: string;
}

export interface PostLikersInter {
  id: number;
  PostLikers: PostLikeInter;
}

export interface PostInter {
  id: number;
  hit: number;
  category: string;
  thumbnail?: string;
  imagePath?: string;
  title: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  User?: UserInfoInter;
  HashTags?: Array<HashtagsInter>;
  PostLikers?: Array<PostLikersInter>;
  Comments?: Array<CommentsInter>;
}

export interface CommentsInter {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  User?: UserInfoInter;
  CommentLikers?: Array<CommentLikersInter>;
  SubComments?: Array<SubCommentsInter>;
}

export interface CommentLikersInter {
  id: number;
  CommentLike: CommentLikeInter;
}

export interface CommentLikeInter {
  createdAt: string;
  updatedAt: string;
  UserId: number;
  CommentId: number;
}

export interface SubCommentsInter {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  CommentId: number;
  User: UserInfoInter;
}

export interface RecentPostInter {
  id: number;
  category: string;
  title: string;
  Comments?: Array<CommentsInter>;
  hit?: number;
}

export interface UserInter {
  id: number;
  googleId: BigInt | null;
  email: string;
  name: string;
  icon: string;
  recentView: number;
  recentComment: number;
  admin: number | null;
  createdAt: string;
  updatedAt: string;
  Comments: Array<CommentsInter>;
  Posts: Array<PostInter>;
  PostLiked: Array<PostLikersInter>;
}
