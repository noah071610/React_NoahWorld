import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useHistory } from "react-router";
dayjs.extend(relativeTime);
dayjs.locale("kor");

const Article = styled.article`
  width: 100%;
  padding: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  img {
    transition: all 0.3s;
  }
  p {
    color: black;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    img {
      transform: scale(1.05);
    }
    p {
      color: black;
      text-decoration: underline;
    }
  }
`;

function ArticleSmall({ post }) {
  const history = useHistory();
  return (
    <Article
      onClick={() => {
        history.push(`/${post.category}/post/${post.id}`);
        window.scrollTo({ top: 0 });
      }}
      className="blog_main_small"
    >
      <img
        style={{ width: "110px", height: "80px" }}
        src={post?.thumbnail ? post.thumbnail : post.imagePath?.replace(/\/thumb\//, "/original/")}
        alt="ss"
      />
      <div>
        <p style={{ margin: "0 0 0.5rem 1rem", height: "100%" }}>{post.title} </p>
        <ul style={{ margin: "0 0 0 1rem" }} className="article_footer">
          <li>
            {dayjs().to(dayjs(post.createdAt), true)}
            &nbsp;ago
          </li>
          <li>·&nbsp;{post.hit} views</li>
          <li>·&nbsp;{post.PostLikers && post.PostLikers.length} Likes</li>
        </ul>
      </div>
    </Article>
  );
}

export default ArticleSmall;
