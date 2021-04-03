import React, { useEffect } from "react";

import { Form, Input, Button, Divider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { LOG_IN_REQUEST } from "../../../../../_reducers/user";

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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Divider orientation="left">E-mail</Divider>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Divider orientation="left">Password</Divider>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
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
    </>
  );
}

export default BlogLoginSection;
