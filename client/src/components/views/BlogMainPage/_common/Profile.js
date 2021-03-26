/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { CameraFilled } from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Col, Divider, Row } from "antd";
import { ADD_ICON_REQUEST } from "../../../../_reducers/user";
import { LOAD_RECENT_POSTS_REQUEST } from "../../../../_reducers/post";
import { BLUE_COLOR } from "../../../config";
import styled from "styled-components";

const RecentTable = styled(Col)`
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    h2 {
      color: ${BLUE_COLOR};
    }
  }
`;
const WelcomeTable = styled.div`
  text-align: center;
  width: 75%;
  margin-left: 3rem;
  position: relative;
`;
function HeaderProfile() {
  const { user } = useSelector((state) => state.user);
  const { recentViewPost, recentCommentPost } = useSelector((state) => state.post);
  const history = useHistory();
  const dispatch = useDispatch();
  const imageInput = useRef();
  const onChangeImages = (e) => {
    const imageFormData = new FormData();
    imageFormData.append("image", e.target.files[0]);
    imageFormData.append("id", user.id);
    dispatch({
      type: ADD_ICON_REQUEST,
      data: imageFormData,
    });
  };
  useEffect(() => {
    dispatch({
      type: LOAD_RECENT_POSTS_REQUEST,
      data: user,
    });
  }, [dispatch, user, history]);

  return (
    <Row className={"blog_header_profile display"}>
      <Col style={{ display: "flex", position: "relative", paddingRight: "1rem" }} span={12}>
        <div
          style={{
            position: "relative",
            width: "200px",
            height: "100%",
          }}
        >
          {user && (
            <img
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                boxShadow: "4px 8px 21px 1px rgba(0, 0, 0, 0.15)",
              }}
              src={user.icon && `http://localhost:5000/${user.icon}`}
              alt="profile_img"
            />
          )}
          <div style={{ position: "absolute", bottom: 0, right: 0 }}>
            <CameraFilled style={{ fontSize: "2rem", float: "right", cursor: "pointer" }} />
            <input
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                opacity: 0,
                filter: "alpha(opacity=0)",
                width: "40px",
              }}
              type="file"
              accept="image/*"
              multiple
              ref={imageInput}
              onChange={onChangeImages}
            />
          </div>
        </div>
        <WelcomeTable>
          <h2 style={{ margin: "1rem 0" }}>Welcome {user && user.name} 😄 </h2>
          <Divider />
          <Row style={{ margin: "2rem 0" }}>
            <Col style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }} span={8}>
              <h4>Comments</h4>
              <h4 style={{ fontSize: "1rem", color: BLUE_COLOR }}>
                {user?.Comments ? user.Comments.length : 0}
              </h4>
            </Col>
            <Col style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }} span={8}>
              <h4>Likes</h4>
              <h4 style={{ fontSize: "1rem", color: BLUE_COLOR }}>
                {user?.PostLiked ? user.PostLiked.length : 0}
              </h4>
            </Col>
            <Col span={8}>
              <h4>Posts</h4>
              <h4 style={{ fontSize: "1rem", color: BLUE_COLOR }}>
                {user?.Posts ? user.Posts.length : 0}
              </h4>
            </Col>
          </Row>
          <Link style={{ padding: "1rem 0" }} to="/admin">
            Administor Here!
          </Link>
        </WelcomeTable>
      </Col>
      <RecentTable style={{ padding: "0 1rem" }} span={6}>
        <h2 style={{ textAlign: "center", margin: "1rem 0" }}>Recent View 👁️‍🗨️ </h2>
        <Divider />
        {recentViewPost ? (
          <div
            onClick={() => history.push(`/${recentViewPost?.category}/post/${recentViewPost?.id}`)}
          >
            <h3>
              · Post Number:{" "}
              <span style={{ color: BLUE_COLOR, marginLeft: "0.3rem" }}>{recentViewPost?.id}</span>
            </h3>
            <h3>
              · Post Title:{" "}
              <span style={{ color: BLUE_COLOR, marginLeft: "0.3rem" }}>
                {recentViewPost?.title}
              </span>
            </h3>
            <h3>
              · Total Post Views:
              <span style={{ color: BLUE_COLOR, marginLeft: "0.3rem" }}>{recentViewPost?.hit}</span>
            </h3>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              opacity: "0.3",
            }}
          >
            <img
              style={{ width: "100px" }}
              alt="noPost"
              src="https://icons.iconarchive.com/icons/iconsmind/outline/256/Inbox-Empty-icon.png"
            />
            <h4>No Post</h4>
          </div>
        )}
      </RecentTable>
      <RecentTable style={{ paddingLeft: "1rem" }} span={6}>
        <h2 style={{ textAlign: "center", margin: "1rem 0" }}>Recent Comment 📝</h2>
        <Divider />
        {recentCommentPost?.Comments.length > 0 ? (
          <div
            onClick={() =>
              history.push(`/${recentCommentPost?.category}/post/${recentCommentPost?.id}`)
            }
          >
            <h3>
              · Post Number:{" "}
              <span style={{ color: BLUE_COLOR, marginLeft: "0.3rem" }}>
                {recentCommentPost?.id}
              </span>
            </h3>
            <h3>
              · Post Title:{" "}
              <span style={{ color: BLUE_COLOR, marginLeft: "0.3rem" }}>
                {recentCommentPost?.title}
              </span>
            </h3>
            <h3>
              · Your comment:{" "}
              <span style={{ color: BLUE_COLOR, marginLeft: "0.3rem" }}>
                {recentCommentPost?.Comments[0].content}
              </span>
            </h3>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              opacity: "0.3",
            }}
          >
            <img
              style={{ width: "100px" }}
              alt="noPost"
              src="https://icons.iconarchive.com/icons/iconsmind/outline/256/Inbox-Empty-icon.png"
            />
            <h4>No Post</h4>
          </div>
        )}
      </RecentTable>
    </Row>
  );
}

export default HeaderProfile;
