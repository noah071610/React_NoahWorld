/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Divider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import hljs from "highlight.js";
import {
  LIKE_POST_REQUEST,
  LOAD_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../../../../_reducers/post";
import dayjs from "dayjs";
import RemoteControl from "./Section/RemoteControl";
import CommentForm from "./Section/CommentForm";
import styled from "styled-components";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { RED_COLOR } from "../../../config";
import { LOAD_INFO_REQUEST } from "../../../../_reducers/user";
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
          return `<iframe title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen width="560" height="315" src="https://www.youtube.com/embed/${v.slice(
            9
          )}"></iframe>`;
        }
        if (v.match(/(#[^\s#+^<]+)/g)) {
          return `<a class="hashtag" href='/hashtag/${v}'>${v}</a>`;
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
  return (
    <>
      {post && (
        <div>
          <h1 className="post_main_title">{post.title}</h1>
          <Divider style={{ width: "850px" }} />
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
            <div className="blog_post_article" style={{ width: "850px" }}>
              <div className="tui-editor-contents" style={{ marginBottom: "3rem" }}>
                <img
                  alt={post.title}
                  style={{ width: "100%" }}
                  src={
                    post.thumbnail
                      ? post.thumbnail
                      : post.imagePath
                      ? `http://localhost:5000/${post.imagePath}`
                      : "images/blog/noImage.gif"
                  }
                />
                <Divider style={{ margin: "3rem 0" }} />
                {Fullcontent && parse(Fullcontent)}
              </div>
              <h4 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
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
            </div>
            <RemoteControl Fullcontent={Fullcontent} />
          </div>
        </div>
      )}
    </>
  );
}

export default BlogPostPage;
