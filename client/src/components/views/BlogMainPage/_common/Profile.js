/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { CameraFilled } from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Row } from "antd";
import { ADD_ICON_REQUEST } from "../../../../_reducers/user";
import { LOAD_RECENT_POSTS_REQUEST } from "../../../../_reducers/post";
import { RecentTableComment, RecentTableView, WelcomeTable } from "./Components";
import Slider from "react-slick";

function HeaderProfile() {
  const { user } = useSelector((state) => state.user);
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Row className={"blog_header_profile display"}>
        <Col style={{ paddingRight: "1rem", marginBottom: "1.5rem" }} xs={24} lg={6}>
          <div
            style={{
              position: "relative",
              width: "200px",
              height: "100%",
              margin: "0 auto",
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
        </Col>
        <WelcomeTable />
        <RecentTableView />
        <RecentTableComment />
      </Row>
      <Slider className="profile_table" {...settings}>
        <WelcomeTable visible={true} />
        <RecentTableView visible={true} />
        <RecentTableComment visible={true} />
      </Slider>
    </>
  );
}

export default HeaderProfile;
