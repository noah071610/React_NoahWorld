/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { BLUE_COLOR } from "../../../config";
dayjs.extend(relativeTime);
dayjs.locale("kor");

function ArticleRow({ article }) {
  const history = useHistory();
  const onClickArticle = (e) => {
    if (e.target.className === "hashtag") {
      return;
    }
    window.scrollTo({ top: 0 });
    history.push(`/${article.category}/post/${article.id}`);
  };
  const contentWithoutHTML =
    article &&
    article.content
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/(#youtube:.*)/g, "(Youtube Video Link)")
      .replace(/&.*;/gi, "");
  const handleImgError = (e) => {
    e.target.src = "images/blog/noImage.gif";
  };
  return (
    <>
      {article && (
        <article onClick={onClickArticle} className="article article_row">
          <div style={{ width: "60%", marginRight: "3rem", overflow: "hidden" }}>
            <img
              className="article_img"
              style={{ width: "100%", height: "300px", border: "0.3px solid rgba(0,0,0,0.1)" }}
              alt={article.title}
              src={
                article?.thumbnail
                  ? article.thumbnail
                  : article.imagePath
                  ? article.imagePath.replace(/\/thumb\//, "/original/")
                  : "/images/blog/noImage.gif"
              }
              onError={handleImgError}
            />
          </div>
          <div className="article_contents">
            <h2 style={{ height: "auto" }} className="article_header">
              {article.title}
            </h2>
            <ul style={{ marginBottom: "1rem" }} className="article_tag">
              {article.Hashtags &&
                article.Hashtags.map((v, i) => {
                  return (
                    <li key={i}>
                      <Link
                        className="hashtag"
                        onClick={() => window.scrollTo({ top: 0 })}
                        to={`/hashtag/${v.name}`}
                      >
                        #{v.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <p
              style={{
                width: "100%",
                height: "7.6rem",
                overflow: "hidden",
                lineHeight: "1.3",
                margin: 0,
                WebkitLineClamp: 6,
              }}
              className="article_desc"
            >
              {contentWithoutHTML}
            </p>
            <ul style={{ marginTop: "1rem" }} className="article_footer">
              <li style={{ color: BLUE_COLOR, fontWeight: "bold" }}>
                {dayjs().to(dayjs(article.createdAt), true)}
                &nbsp;ago
              </li>
              <li>·&nbsp;{article.hit} views</li>
              <li>·&nbsp;{article.PostLikers && article.PostLikers.length} Likes</li>
            </ul>
          </div>
        </article>
      )}
    </>
  );
}

export default ArticleRow;
