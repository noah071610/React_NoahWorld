/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Divider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import hljs from "highlight.js";
import {
  LIKE_POST_REQUEST,
  LOAD_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../../../../_reducers/post";
import RemoteControl from "./Section/RemoteControl";
import CommentForm from "./Section/CommentForm";
import styled from "styled-components";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { RED_COLOR } from "../../../config";
import { LOAD_INFO_REQUEST } from "../../../../_reducers/user";
import ArticlePost from "../_common/ArticlePost";
import dayjs from "dayjs";
dayjs.locale("kor");

const Heart = styled.a`
  display: inline-block;
  margin: 0 0.5rem 0 1rem;
  &:hover {
    color: ${RED_COLOR};
    span {
      color: ${RED_COLOR};
      -webkit-animation: heartbeat 0.5s;
      animation: heartbeat 0.5s;
    }
  }
`;

const HeartLiked = styled.a`
  display: inline-block;
  margin: 0 0.5rem 0 1rem;
  color: ${RED_COLOR};
  &:hover {
    color: ${RED_COLOR};
    span {
      color: ${RED_COLOR};
    }
  }
`;

function BlogPostPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    post,
    unlikePostDone,
    likePostDone,
    addCommentDone,
    editCommentDone,
    removeCommentDone,
    likeCommentDone,
    unlikeCommentDone,
    addSubCommentDone,
    removeSubCommentDone,
    editSubCommentDone,
    prevPost,
    nextPost,
  } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const [Fullcontent, setFullcontent] = useState("");

  useEffect(() => {
    const tagContent =
      post &&
      post.content.split(/(#[^\s#+^<]+)/g).map((v, i) => {
        if (v.match(/(#.*")/g)) {
          return v;
        }
        if (v.match(/(#youtube:)/g)) {
          return `<iframe class="youtube" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src="https://www.youtube.com/embed/${v.slice(
            9
          )}"></iframe>`;
        }
        if (v.match(/(#[^\s#+^<]+)/g)) {
          return `<a class="hashtag">${v}</a>`;
        }
        return v;
      });
    const fullContentRemoveComma = post && tagContent.join("");
    setFullcontent(fullContentRemoveComma);
  }, [post]);
  useEffect(() => {
    const postId = history.location.pathname.replace(/[^0-9]/g, "");
    if (!postId) {
      history.push("");
    }
    dispatch({
      type: LOAD_POST_REQUEST,
      data: { postId, UserId: user?.id },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    history.location.pathname,
    likePostDone,
    unlikePostDone,
    addCommentDone,
    editCommentDone,
    removeCommentDone,
    likeCommentDone,
    unlikeCommentDone,
    addSubCommentDone,
    removeSubCommentDone,
    editSubCommentDone,
  ]);

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [Fullcontent]);

  useEffect(() => {
    if (addCommentDone) {
      message.success("Added comment 🥰");
    }
  }, [addCommentDone]);

  const onClickLike = () => {
    if (!user) {
      message.error("You can thumbs up when you are logged in 😿");
      return;
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: { PostId: post.id, UserId: user.id },
    });
  };

  const liked = post && user && post.PostLikers.find((v) => v.id === user.id);

  const onClickUnlike = () => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: { PostId: post.id, UserId: user.id },
    });
  };
  useEffect(() => {
    dispatch({
      type: LOAD_INFO_REQUEST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImgError = (e) => {
    e.target.src = "/images/blog/noImage.gif";
  };

  return (
    <>
      {post && (
        <div>
          <MetaTags>
            <title>{"Noah World - " + post?.title.slice(0, 7) + "..."}</title>
            <meta name="description" content="Welcome to Noah world!" />
            <meta property="og:title" content={post?.title.slice(0, 10)} />
            <meta
              property="og:image"
              content={
                post.thumbnail ? post.thumbnail : post.imagePath || "/images/blog/logo_icon.png"
              }
            />
            <meta property="og:url" content={`https://noahworld.site/${post?.id}`} />
          </MetaTags>
          <h1 style={{ lineHeight: "1.5" }} className="post_main_title">
            {post.title}
          </h1>
          <Divider className="blog_post_divier" />
          <ul
            style={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "1.1rem",
              marginBottom: "5rem",
              color: "rgba(0,0,0,0.2)",
            }}
          >
            <li>{dayjs(post.createdAt).format("YYYY.MM.DD")}</li>
            <li>·&nbsp;{post.hit} views</li>
            <li>·&nbsp;{post.PostLikers.length} likes</li>
          </ul>
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
            <div className="blog_post_article">
              <div className="tui-editor-contents" style={{ marginBottom: "3rem" }}>
                {post?.thumbnail || post?.imagePath ? (
                  <>
                    <img
                      alt={post.title}
                      style={{ width: "100%", marginBottom: "6rem" }}
                      src={post?.thumbnail ? post.thumbnail : post.imagePath}
                      onError={handleImgError}
                    />
                  </>
                ) : null}
                {Fullcontent && parse(Fullcontent)}
              </div>
              <h4 style={{ margin: "5rem 0 1rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>
                Do you like this Post?{" "}
                {liked ? (
                  <HeartLiked onClick={onClickUnlike}>
                    <HeartFilled />
                  </HeartLiked>
                ) : (
                  <Heart onClick={onClickLike}>
                    <HeartOutlined />
                  </Heart>
                )}
                <span style={{ fontSize: "1rem" }}>{post.PostLikers.length}</span>
              </h4>
              <CommentForm />
              <h4 style={{ margin: "5rem 0 1rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>
                More posts
              </h4>
              <div
                style={{
                  overflow: "auto",
                  height: "280px",
                  marginTop: "1rem",
                  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    padding: "1rem 0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span>Title</span>
                  <span>Date</span>
                </div>
                {prevPost?.map((v, i) => (
                  <ArticlePost key={i} post={v} />
                ))}
                {nextPost?.map((v, i) => (
                  <ArticlePost key={i} post={v} />
                ))}
              </div>
            </div>
            <RemoteControl Fullcontent={Fullcontent} />
          </div>
        </div>
      )}
    </>
  );
}

export default BlogPostPage;
