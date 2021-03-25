/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider } from "antd";
import React from "react";
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
      {user && <Profile />}
      <div style={{ marginTop: "2rem", display: "flex" }} className="main">
        {techPosts && dailyPosts && (
          <section id="main_tech" style={{ width: "70%", marginRight: "2rem" }}>
            <Divider orientation="left">
              <Link to={"/tech"}>Information Technology</Link>
            </Divider>
            <ArticleRow article={techPosts[0]} />
            <Divider />
            <Slider style={{ marginBottom: "3rem" }} {...settings}>
              {techPosts.slice(1).map((v, i) => (
                <ArticleColumn key={i} article={v} />
              ))}
            </Slider>
            <Divider orientation="left">
              <Link to={"/daily"}>Daily</Link>
            </Divider>
            <ArticleRow article={dailyPosts[0]} />
            <Divider />
            <Slider style={{ marginBottom: "3rem" }} {...settings}>
              {dailyPosts.slice(1).map((v, i) => (
                <ArticleColumn key={i} article={v} />
              ))}
            </Slider>
          </section>
        )}
        {/*Aside Manu*/}
        <section className="blog_aside">
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem", padding: "0 1rem" }}>
              <img
                alt="trophy"
                className="icon"
                src="https://img.icons8.com/doodle/96/000000/trophy--v1.png"
              />
              Most Liked
            </h3>
            <ArticleAside type="like" article={mostLikedPost} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem", padding: "0 1rem" }}>
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
            <h3 style={{ fontSize: "1.2rem", padding: "0 1rem" }}>
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
            <h3 style={{ fontSize: "1.2rem", padding: "0 1rem" }}>
              <img
                alt="view_log"
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
        </section>
      </div>
      <section style={{ width: "100%", marginRight: "2rem" }}>
        <Divider orientation="left">
          <Link to={"/class"}>
            Korean Class for &nbsp;
            <img
              alt="japan_flag"
              style={{ width: "1.5rem" }}
              src="https://img.icons8.com/color/48/000000/japan.png"
            />
          </Link>
        </Divider>
        <div className="blog_bottom">
          <div className="blog_bottom_card" style={{ gridArea: "hd" }}>
            <h2 className="blog_bottom_card_title">韓国語基礎</h2>
            <a
              onClick={() => {
                history.push("/class");
                window.scrollTo({ top: 0 });
              }}
              className="blog_bottom_cover"
            />
            <img
              className="blog_bottom_img"
              alt="korean_class_basic"
              src="https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=556&q=80"
            />
          </div>
          <div className="blog_bottom_card" style={{ gridArea: "sub1" }}>
            <h2 className="blog_bottom_card_title">文化</h2>
            <a
              onClick={() => {
                history.push("/class");
                window.scrollTo({ top: 0 });
              }}
              className="blog_bottom_cover"
            />
            <img
              className="blog_bottom_img"
              alt="korean_class_culture"
              src="https://images.unsplash.com/photo-1485186667901-c039c19ecac3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=274&q=80"
            />
          </div>
          <div className="blog_bottom_card" style={{ gridArea: "sub2" }}>
            <h2 className="blog_bottom_card_title">今どき</h2>
            <a
              onClick={() => {
                history.push("/class");
                window.scrollTo({ top: 0 });
              }}
              className="blog_bottom_cover"
            />
            <img
              className="blog_bottom_img"
              alt="korean_class_hotword"
              src="https://images.unsplash.com/photo-1550177205-89d100b75c34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=274&q=80"
            />
          </div>
          <div className="blog_bottom_card" style={{ gridArea: "sub3" }}>
            <h2 className="blog_bottom_card_title">会話</h2>
            <a
              onClick={() => {
                history.push("/class");
                window.scrollTo({ top: 0 });
              }}
              className="blog_bottom_cover"
            />
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
