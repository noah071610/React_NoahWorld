/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
dayjs.extend(relativeTime);
dayjs.locale("kor");

function ArticleColumn({ article, nocontent }) {
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
    e.target.src = "/images/blog/noImage.gif";
  };
  return (
    <>
      {article && (
        <article onClick={onClickArticle} className="article article_column">
          <div style={{ marginBottom: "1rem", width: "100%", overflow: "hidden" }}>
            <img
              style={nocontent ? { height: "140px" } : null}
              className="article_img"
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
          <div>
            <h2 style={{ height: "auto" }} className="article_header">
              {article.title}
            </h2>
            {nocontent ? null : (
              <>
                <ul style={{ marginBottom: "1rem" }}>
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
                  style={
                    article.Hashtags?.length > 0
                      ? { margin: 0, WebkitLineClamp: 4, height: "4.8rem", lineHeight: "1.3" }
                      : {
                          height: "6.1rem",
                          WebkitLineClamp: 5,
                          marginBottom: "1.7rem",
                          lineHeight: "1.3",
                        }
                  }
                  className="article_desc"
                >
                  {contentWithoutHTML}
                </p>
              </>
            )}
          </div>
          <ul
            style={article.Hashtags?.length > 0 ? { marginTop: "1rem" } : { marginTop: "1.7rem" }}
            className="article_footer"
          >
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
