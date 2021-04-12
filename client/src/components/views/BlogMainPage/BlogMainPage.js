/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Divider } from "antd";
import MetaTags from "react-meta-tags";
import ArticleAside from "./_common/ArticleAside";
import ArticleColumn from "./_common/ArticleColumn";
import ArticleRow from "./_common/ArticleRow";
import Slider from "react-slick";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHAGE_HEADER } from "../../../_reducers/blog";
import Profile from "./_common/Profile";
import { LOAD_POSTS_REQUEST } from "../../../_reducers/post";
import { LOAD_INFO_REQUEST } from "../../../_reducers/user";
import ArticleSmallAside from "./_common/ArticleSmallAside";
import ArticleSmall from "./_common/ArticleSmall";
import CountUp from "react-countup";

function BlogMainPage() {
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const {
    techPosts,
    dailyPosts,
    hashtags,
    mostLikedPost,
    mostViewedPost,
    mostCommentedPost,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const smallSizeSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch({
      type: CHAGE_HEADER,
      header: "blog",
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: LOAD_INFO_REQUEST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <MetaTags>
        <title>Noah World</title>
        <meta name="description" content="Welcome to Noah world!" />
        <meta property="og:title" content="Noah world - Main page." />
        <meta property="og:image" content={"./images/blog/logo_icon.png"} />
        <meta property="og:url" content={`https://noahworld.site`} />
      </MetaTags>
      {user && <Profile />}
      <div className="blog">
        <h2 className="blog_category_header header_small_on">
          HOME
          {techPosts && dailyPosts && (
            <span className="blog_category_count">
              <br className="br_category" />
              +&nbsp;
              <CountUp duration={4} start={0} end={techPosts.concat(dailyPosts).length} />
              &nbsp;posts.&nbsp;+&nbsp;
              <CountUp duration={4} start={0} end={hashtags?.length} />
              &nbsp;hashtags.
            </span>
          )}
        </h2>
        {techPosts && dailyPosts && (
          <section className="blog_main">
            <Divider orientation="left">
              <Link to={"/tech"}>Information Technology</Link>
            </Divider>
            <div className="blog_category_big">
              <ArticleRow article={techPosts[0]} />
            </div>
            <div className="blog_category_medium">
              <ArticleColumn article={techPosts[0]} />
            </div>
            <div className="blog_category_small">
              <Slider {...smallSizeSettings}>
                {techPosts.slice(0, 3).map((techPost, i) => {
                  return <ArticleColumn key={i} article={techPost} />;
                })}
              </Slider>
            </div>
            <div className="blog_main_big">
              <Divider />
              <Slider style={{ marginBottom: "3rem" }} {...settings}>
                {techPosts.slice(1, 8).map((v, i) => (
                  <ArticleColumn key={i} article={v} />
                ))}
              </Slider>
            </div>
            {techPosts.slice(3, 8).map((techPost, i) => {
              return <ArticleSmall key={i} post={techPost} />;
            })}
            <Divider orientation="left">
              <Link to={"/daily"}>Daily</Link>
            </Divider>
            <div className="blog_category_big">
              <ArticleRow article={dailyPosts[0]} />
            </div>
            <div className="blog_category_medium">
              <ArticleColumn article={dailyPosts[0]} />
            </div>
            <div className="blog_category_small">
              <Slider {...smallSizeSettings}>
                {dailyPosts.slice(0, 3).map((dailyPost, i) => {
                  return <ArticleColumn key={i} article={dailyPost} />;
                })}
              </Slider>
            </div>
            <div className="blog_main_big">
              <Divider />
              <Slider style={{ marginBottom: "3rem" }} {...settings}>
                {dailyPosts.slice(1, 8).map((v, i) => (
                  <ArticleColumn key={i} article={v} />
                ))}
              </Slider>
            </div>
            {dailyPosts.slice(3, 8).map((dailyPost, i) => {
              return <ArticleSmall key={i} post={dailyPost} />;
            })}
          </section>
        )}
        {/*Aside Manu*/}
        <aside className="blog_aside">
          <div>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                margin: 0,
                fontSize: "1.2rem",
                padding: "0 1rem",
              }}
            >
              <img
                alt="trophy"
                className="icon"
                src="https://img.icons8.com/doodle/96/000000/trophy--v1.png"
              />
              Most Liked
            </h3>
            <ArticleAside type="like" article={mostLikedPost} />
          </div>
          <div>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                margin: 0,
                fontSize: "1.2rem",
                padding: "0 1rem",
              }}
            >
              <img
                alt="view_log"
                className="icon"
                src="https://img.icons8.com/doodle/96/000000/goal.png"
              />
              Most View
            </h3>
            <ArticleAside type="view" article={mostViewedPost} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                margin: 0,
                fontSize: "1.2rem",
                padding: "0 1rem",
              }}
            >
              <img
                alt="comment_log"
                className="icon"
                src="https://img.icons8.com/doodle/96/000000/speech-bubble-with-dots.png"
              />
              Most Commented
            </h3>
            <ArticleAside type="comments" article={mostCommentedPost} />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                margin: 0,
                fontSize: "1.2rem",
                padding: "0 1rem",
              }}
            >
              <img
                alt="hash_tag"
                className="icon"
                src="https://img.icons8.com/ios/100/000000/hashtag.png"
              />
              Hashtags
            </h3>
            <ul className="blog_aside_tag">
              {hashtags &&
                hashtags.map((v, i) => {
                  return (
                    <li key={i}>
                      <Link to={`/hashtag/${v.name}`}>#{v.name}</Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </aside>
      </div>
      <div className="blog_md_aside">
        <Divider />
        <div>
          <h3 style={{ fontSize: "1.2rem", padding: "0 1rem" }}>
            <img
              alt="trophy"
              className="icon"
              src="https://img.icons8.com/doodle/96/000000/trophy--v1.png"
            />
            Most Liked
          </h3>
          <ArticleSmallAside type="like" article={mostLikedPost} />
        </div>
        <div>
          <h3 style={{ fontSize: "1.2rem", padding: "0 1rem" }}>
            <img
              alt="view_log"
              className="icon"
              src="https://img.icons8.com/doodle/96/000000/goal.png"
            />
            Most View
          </h3>
          <ArticleSmallAside type="view" article={mostViewedPost} />
        </div>
        <div>
          <h3 style={{ fontSize: "1.2rem", padding: "0 1rem" }}>
            <img
              alt="comment_log"
              className="icon"
              src="https://img.icons8.com/doodle/96/000000/speech-bubble-with-dots.png"
            />
            Most Commented
          </h3>
          <ArticleSmallAside type="comments" article={mostCommentedPost} />
        </div>
        <Divider />
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1.2rem", padding: "0 1rem" }}>
            <img
              alt="view_log"
              className="icon"
              src="https://img.icons8.com/ios/100/000000/hashtag.png"
            />
            Hashtags
          </h3>
          <ul style={{ marginLeft: "0.5rem" }} className="blog_aside_tag">
            {hashtags &&
              hashtags.map((v, i) => {
                return (
                  <li key={i}>
                    <Link onClick={() => window.scrollTo({ top: 0 })} to={`/hashtag/${v.name}`}>
                      #{v.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <section style={{ width: "100%", marginRight: "2rem" }}>
        <Divider orientation="left">
          <Link style={{ display: "flex", alignItems: "center" }} to={"/class"}>
            Korean Class for &nbsp;
            <img
              alt="japan_flag"
              style={{ width: "1.5rem" }}
              src="https://img.icons8.com/color/48/000000/japan.png"
            />
          </Link>
        </Divider>

        <div className="blog_bottom">
          <div
            onClick={() => {
              history.push("/class");
              window.scrollTo({ top: 0 });
            }}
            className="blog_bottom_card"
            style={{ gridArea: "hd" }}
          >
            <a className="blog_bottom_cover" />
            <h2 className="blog_bottom_card_title">韓国語基礎</h2>
            <img
              className="blog_bottom_img"
              alt="korean_class_basic"
              src="https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=556&q=80"
            />
          </div>
          <div
            onClick={() => {
              history.push("/class");
              window.scrollTo({ top: 0 });
            }}
            className="blog_bottom_card"
            style={{ gridArea: "sub1" }}
          >
            <a className="blog_bottom_cover" />
            <h2 className="blog_bottom_card_title">文化</h2>
            <img
              className="blog_bottom_img"
              alt="korean_class_culture"
              src="https://images.unsplash.com/photo-1485186667901-c039c19ecac3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=274&q=80"
            />
          </div>
          <div
            onClick={() => {
              history.push("/class");
              window.scrollTo({ top: 0 });
            }}
            className="blog_bottom_card"
            style={{ gridArea: "sub2" }}
          >
            <a className="blog_bottom_cover" />
            <h2 className="blog_bottom_card_title">今どき</h2>
            <img
              className="blog_bottom_img"
              alt="korean_class_hotword"
              src="https://images.unsplash.com/photo-1550177205-89d100b75c34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=274&q=80"
            />
          </div>
          <div
            onClick={() => {
              history.push("/class");
              window.scrollTo({ top: 0 });
            }}
            className="blog_bottom_card"
            style={{ gridArea: "sub3" }}
          >
            <a className="blog_bottom_cover" />
            <h2 className="blog_bottom_card_title">会話</h2>
            <img
              className="blog_bottom_img"
              alt="korean_class_conversation"
              src="https://images.unsplash.com/photo-1531496244015-67bec2b9952b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=274&q=80"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogMainPage;
