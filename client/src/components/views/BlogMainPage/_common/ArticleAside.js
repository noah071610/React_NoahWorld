/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BACKEND_URL, BLUE_COLOR } from "../../../config";
dayjs.extend(relativeTime);
dayjs.locale("kor");

function ArticleAside({ article, type }) {
  const history = useHistory();
  const onClickArticle = (e) => {
    if (e.target.className === "hashtag") {
      return;
    }
    window.scrollTo({ top: 0 });
    history.push(`/${article.category}/post/${article.id}`);
  };
  const handleImgError = (e) => {
    e.target.src = "images/blog/noImage.gif";
  };
  return (
    <>
      {article && (
        <article onClick={onClickArticle} className="article article_aside">
          <div style={{ marginBottom: "0.5rem", width: "100%", overflow: "hidden" }}>
            <img
              className="article_img"
              style={{ width: "100%", height: "150px", border: "0.3px solid rgba(0,0,0,0.1)" }}
              alt={article.title}
              src={
                article.thumbnail
                  ? article.thumbnail
                  : article.imagePath
                  ? `${article.imagePath}`
                  : "images/blog/noImage.gif"
              }
              onError={handleImgError}
            />
          </div>
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
              {type === "comments"
                ? article.Comments.length + " Comments"
                : type === "like"
                ? article.PostLikers.length + " Likes"
                : article.hit + " views"}
            </span>
            <h2 className="article_aside_header">{article.title}</h2>
            <ul className="article_footer">
              <li className="date">
                {dayjs().to(dayjs(article.createdAt), true)}
                &nbsp;ago
              </li>
              <li className="view">
                ·
                <span style={type === "view" ? { color: BLUE_COLOR, fontWeight: "bold" } : null}>
                  &nbsp;{article.hit} views
                </span>
              </li>
              <li className="comments">
                ·
                <span style={type === "view" ? null : { color: BLUE_COLOR, fontWeight: "bold" }}>
                  &nbsp;
                  {type === "comments"
                    ? article.Comments.length + " Comments"
                    : article.PostLikers.length + " Likes"}
                </span>
              </li>
            </ul>
          </div>
        </article>
      )}
    </>
  );
}

export default ArticleAside;
