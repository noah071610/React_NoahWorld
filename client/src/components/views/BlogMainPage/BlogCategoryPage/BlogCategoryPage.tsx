import { Col, Divider, Row } from "antd";
import { useEffect } from "react";
// @ts-ignore
import { ReactTitle } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import ArticleColumn from "../_common/ArticleColumn";
import ArticleRow from "../_common/ArticleRow";
import Profile from "../_common/Profile";
import { LOAD_CATEGORY_POSTS_REQUEST, LOAD_MORE_POSTS_REQUEST } from "../../../../_reducers/post";
import { useHistory } from "react-router";
import { LOAD_INFO_REQUEST } from "../../../../_reducers/user";
import CountUp from "react-countup";
import { RootState } from "src/_reducers";

function BlogCategoryPage() {
  const {
    techPosts,
    dailyPosts,
    hasMorePosts,
    loadCategoryPostsLoading,
    loadMorePostsLoading,
    countPosts,
  } = useSelector((state: RootState) => state.post);
  const { user } = useSelector((state: RootState) => state.user);
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
        if (hasMorePosts && !loadMorePostsLoading && (techPosts || dailyPosts.length > 7)) {
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
      <ReactTitle title={category === "tech" ? "Noah World - Tech" : "Noah World - Daily"} />
      {user && <Profile />}
      {(techPosts || dailyPosts) && (
        <div>
          <h2 className="blog_category_header">
            {category.toUpperCase() + " POSTS"}
            <br className="br_category" />
            <span className="blog_category_count">
              +&nbsp;
              <CountUp duration={4} start={0} end={countPosts?.length} />
              &nbsp;posts.
            </span>
          </h2>
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
