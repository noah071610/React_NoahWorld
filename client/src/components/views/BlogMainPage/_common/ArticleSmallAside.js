/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BLUE_COLOR } from "../../../config";
import styled from "styled-components";
dayjs.extend(relativeTime);
dayjs.locale("kor");

const Article = styled.article`
  transition: all 0.4s;
  &:hover {
    text-decoration: underline;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
function ArticleSmallAside({ article, type }) {
  const history = useHistory();
  const onClickArticle = (e) => {
    if (e.target.className === "hashtag") {
      return;
    }
    window.scrollTo({ top: 0 });
    history.push(`/${article.category}/post/${article.id}`);
  };
  return (
    <>
      {article && (
        <Article
          onClick={onClickArticle}
          style={{ marginLeft: "0.5rem" }}
          className="article article_aside"
        >
          <div>
            <span
              style={{
                color: BLUE_COLOR,
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              IN {article.category.toUpperCase()}
            </span>
            <span className="article_md_footer">
              >&nbsp;&nbsp;
              {type === "comments"
                ? article.Comments.length + " Comments"
                : type === "like"
                ? article.PostLikers.length + " Likes"
                : article.hit + " views"}
            </span>
            <h2 className="article_aside_header">{article.title}</h2>
          </div>
        </Article>
      )}
    </>
  );
}

export default ArticleSmallAside;
