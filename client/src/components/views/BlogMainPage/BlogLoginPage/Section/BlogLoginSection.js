import React, { useEffect } from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { LOG_IN_REQUEST } from "../../../../../_reducers/user";
import styled from "styled-components";
import { BLUE_COLOR } from "../../../../config";

const GoogleBtn = styled.button`
  box-sizing: border-box;
  outline: none;
  width: 100%;
  background-color: white;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
  border: none;
  cursor: pointer;
  div {
    width: 360px;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0;
    h3 {
      transition: all 0.3s;
    }
    img {
      width: 30px;
    }
  }
  &:hover {
    h3 {
      color: ${BLUE_COLOR};
    }
  }
  @media only screen and (max-width: 576px) {
    div {
      width: 200px;
      img {
        width: 20px;
      }
      h3 {
        font-size: 0.8rem;
      }
    }
  }
`;

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${name} is required!",
  types: {
    email: "This is not a valid ${name}!",
  },
  number: {
    range: "${name} must be upper the ${min} strings",
  },
};

function BlogLoginSection({ onClickSignUp }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { logInError, logInDone } = useSelector((state) => state.user);

  const onFinish = (values: any) => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email: values.email, password: values.password },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Unexpected Erorr! please try again or feedback to us");
  };

  useEffect(() => {
    if (logInError) {
      message.error(logInError);
    }
  }, [logInError]);

  useEffect(() => {
    if (logInDone) {
      message.success("Log In Success! Have a nice day 😙");
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logInDone]);

  return (
    <>
      <div className="login_title" style={{ margin: "3rem 0" }}>
        <h1>
          Login now!{" "}
          <img
            alt="login_icon"
            src="https://img.icons8.com/cute-clipart/64/000000/login-rounded-right.png"
          />
        </h1>
        <h3>Are you ready for jumping to my world?</h3>
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        validateMessages={validateMessages}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Divider orientation="left">E-mail</Divider>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Divider orientation="left">Password</Divider>
        <Form.Item name="password" rules={[{ required: true, min: 9 }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ width: "50%", marginTop: "1.5rem" }} htmlType="submit">
            Login
          </Button>
          <Button onClick={onClickSignUp} style={{ width: "50%" }}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
      <GoogleBtn>
        <a href="http://localhost:5000/auth/google">
          <div>
            <img alt="google" src="https://img.icons8.com/color/144/000000/google-logo.png" />
            <h3 style={{ margin: "0 0 0 1rem", fontWeight: "normal" }}>Sign in with Google</h3>
          </div>
        </a>
      </GoogleBtn>
    </>
  );
}

export default BlogLoginSection;
