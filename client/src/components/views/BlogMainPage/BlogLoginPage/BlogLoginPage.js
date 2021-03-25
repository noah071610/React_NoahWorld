import { Col, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ON_SIGN_UP_PAGE } from "../../../../_reducers/blog";
import BlogLoginSection from "./Section/BlogLoginSection";
import BlogSignUpSection from "./Section/BlogSingUpSection";

function BlogLoginPage() {
  const dispatch = useDispatch();
  const { onSignUpPage } = useSelector((state) => state.blog);

  const onClickSignUp = () => {
    dispatch({
      type: ON_SIGN_UP_PAGE,
      data: true,
    });
  };
  const onClickLogin = () => {
    dispatch({
      type: ON_SIGN_UP_PAGE,
      data: false,
    });
  };

  return (
    <Row>
      <Col span={11}>
        {onSignUpPage ? (
          <BlogSignUpSection onClickLogin={onClickLogin} />
        ) : (
          <BlogLoginSection onClickSignUp={onClickSignUp} />
        )}
      </Col>
      <Col span={2} />
      <Col span={11}>
        <img alt="login_main_poster" style={{ width: "100%" }} src="/images/blog/signup.jpg" />
      </Col>
    </Row>
  );
}

export default BlogLoginPage;
