import React, { useEffect } from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../../../../../_reducers/user";
import { ON_SIGN_UP_PAGE } from "../../../../../_reducers/blog";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${name} is required!",
  types: {
    email: "This is not a valid ${name}!",
  },
  number: {
    range: "${name} must be under the ${max} strings",
  },
};

function BlogSignUpSection({ onClickLogin }) {
  const dispatch = useDispatch();
  const { signUpError, signUpDone } = useSelector((state) => state.user);
  const onFinish = (values: any) => {
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email: values.Email, name: values.Name, password: values.Password },
    });
  };

  useEffect(() => {
    if (signUpError) {
      message.error("Unexpected Erorr! Please try again or feedback to us");
    }
  }, [signUpError]);

  useEffect(() => {
    if (signUpDone) {
      message.success("Log In Success! Enjoy your time.");
      dispatch({
        type: ON_SIGN_UP_PAGE,
        data: false,
      });
    }
  }, [dispatch, signUpDone]);

  return (
    <>
      <div className="login_title" style={{ margin: "3rem 0" }}>
        <h1>
          Sign Up now!{" "}
          <img
            alt="signup_icon"
            src="https://img.icons8.com/bubbles/100/000000/add-user-male.png"
          />
        </h1>
        <h3>Enjoy various Contents for free!</h3>
      </div>
      <Form
        validateMessages={validateMessages}
        name="nest-messages"
        initialValues={{ remember: false }}
        onFinish={onFinish}
      >
        <Divider orientation="left">E-mail</Divider>
        <Form.Item name="Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Divider orientation="left">User name</Divider>
        <Form.Item name="Name" rules={[{ required: true, max: 15 }]}>
          <Input />
        </Form.Item>
        <Divider orientation="left">Password</Divider>
        <Form.Item name="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Divider orientation="left">Confirm Password</Divider>
        <Form.Item
          name="Confirm"
          dependencies={["Password"]}
          hasFeedback
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("Password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ width: "50%", marginTop: "1.5rem" }} htmlType="submit">
            Sign up
          </Button>
          <Button onClick={onClickLogin} style={{ width: "50%" }}>
            Go back login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default BlogSignUpSection;
