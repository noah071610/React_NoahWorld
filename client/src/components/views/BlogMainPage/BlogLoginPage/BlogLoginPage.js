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
    <div className="login">
      <div className="login_form">
        {onSignUpPage ? (
          <BlogSignUpSection onClickLogin={onClickLogin} />
        ) : (
          <BlogLoginSection onClickSignUp={onClickSignUp} />
        )}
      </div>
      <div className="login_image">
        <img alt="login_main_poster" style={{ width: "100%" }} src="/images/blog/signup.jpg" />
      </div>
    </div>
  );
}

export default BlogLoginPage;
