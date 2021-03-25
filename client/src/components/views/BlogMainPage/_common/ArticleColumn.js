/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
dayjs.extend(relativeTime);
dayjs.locale("kor");

function ArticleColumn({ article }) {
  const history = useHistory();
  const onClickArticle = (e) => {
    if (e.target.className === "hashtag") {
      return;
    }
    window.scrollTo({ top: 0 });
    history.push(`/${article.category}/post/${article.id}`);
  };
  const contentWithoutHTML = article && article.content.replace(/(<([^>]+)>)/gi, "");
  const handleImgError = (e) => {
    e.target.src = "images/blog/noImage.gif";
  };
  return (
    <>
      {article && (
        <article onClick={onClickArticle} className="article article_column">
          <div style={{ marginBottom: "1rem", width: "100%", overflow: "hidden" }}>
            <img
              className="article_img"
              style={{ width: "100%", height: "250px", border: "0.3px solid rgba(0,0,0,0.1)" }}
              alt={article.title}
              src={
                article.thumbnail
                  ? article.thumbnail
                  : article.imagePath
                  ? `http://localhost:5000/${article.imagePath}`
                  : "images/blog/noImage.gif"
              }
              onError={handleImgError}
            />
          </div>
          <div style={{ height: "180px" }}>
            <h2 style={{ margin: 0 }} className="article_header">
              {article.title}
            </h2>
            <ul style={{ margin: 0 }}>
              {article.Hashtags &&
                article.Hashtags.map((v, i) => {
                  return (
                    <li key={i}>
                      <Link className="hashtag" to={`/hashtag/${v.name}`}>
                        #{v.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <div style={{ height: "80px", overflow: "hidden", marginBottom: "0.7rem" }}>
              <p
                style={{ textOverflow: "ellipsis", overflowY: "hidden", height: "80px" }}
                className="article_desc"
              >
                {contentWithoutHTML}
              </p>
            </div>
          </div>
          <ul className="article_footer">
            <li>
              {dayjs().to(dayjs(article.createdAt), true)}
              &nbsp;ago
            </li>
            <li>·&nbsp;{article.hit} views</li>
            <li>·&nbsp;{article.PostLikers && article.PostLikers.length} Likes</li>
          </ul>
        </article>
      )}
    </>
  );
}

export default ArticleColumn;
