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
  const contentWithoutHTML =
    article && article.content.replace(/(<([^>]+)>)/gi, "").replace("!#", "#");
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
          <div>
            <h2 className="article_header">{article.title}</h2>
            <ul>
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
            <p
              style={
                article.Hashtags?.length > 0
                  ? null
                  : { height: "5.6rem", WebkitLineClamp: 4, marginBottom: "1.7rem" }
              }
              className="article_desc"
            >
              {contentWithoutHTML}
            </p>
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
