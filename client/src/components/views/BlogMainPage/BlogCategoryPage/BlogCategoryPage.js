import { Col, Divider, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleColumn from "../_common/ArticleColumn";
import ArticleRow from "../_common/ArticleRow";
import Profile from "../_common/Profile";
import { LOAD_CATEGORY_POSTS_REQUEST, LOAD_MORE_POSTS_REQUEST } from "../../../../_reducers/post";
import { useHistory } from "react-router";
import { LOAD_INFO_REQUEST } from "../../../../_reducers/user";
import { BLUE_COLOR } from "../../../config";
import CountUp from "react-countup";

function BlogCategoryPage() {
  const {
    techPosts,
    dailyPosts,
    hasMorePosts,
    loadCategoryPostsLoading,
    loadMorePostsLoading,
    countPosts,
  } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  let category = history.location.pathname.replace("/", "");
  useEffect(() => {
    dispatch({
      type: LOAD_CATEGORY_POSTS_REQUEST,
      data: category,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname]);

  useEffect(() => {
    dispatch({
      type: LOAD_INFO_REQUEST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadMorePostsLoading && (techPosts || dailyPosts > 7)) {
          const LastId =
            (techPosts || dailyPosts) &&
            (techPosts || dailyPosts)[(techPosts || dailyPosts).length - 1].id;
          dispatch({
            type: LOAD_MORE_POSTS_REQUEST,
            data: {
              LastId,
              category,
            },
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMorePosts, loadCategoryPostsLoading, techPosts, dailyPosts]);

  return (
    <>
      {user && <Profile />}
      {(techPosts || dailyPosts) && (
        <div>
          <h2 className="blog_category_header">
            {category.toUpperCase() + " POSTS"}
            <span className="blog_category_count">
              +&nbsp;
              <CountUp duration={4} start={0} end={countPosts?.length} />
              &nbsp;posts.
            </span>
          </h2>
          <Divider />
          <div className="blog_category_big">
            <ArticleRow article={dailyPosts[0] || techPosts[0]} />
            <Divider />
          </div>
          <div className="blog_category_medium">
            <ArticleColumn article={dailyPosts[0] || techPosts[0]} />
            <Divider />
          </div>
          <div className="blog_category_small">
            <ArticleColumn article={dailyPosts[0] || techPosts[0]} />
          </div>
          <Row>
            {(techPosts || dailyPosts).slice(1).map((v, i) => (
              <Col key={i} xs={24} sm={12} lg={8}>
                <ArticleColumn article={v} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
}

export default BlogCategoryPage;
