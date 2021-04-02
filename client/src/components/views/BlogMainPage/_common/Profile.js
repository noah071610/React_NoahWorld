/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { CameraFilled } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Input, message, Row } from "antd";
import {
  ADD_ICON_REQUEST,
  ADD_ICON_URL_REQUEST,
  REMOVE_ICON_REQUEST,
} from "../../../../_reducers/user";
import { LOAD_RECENT_POSTS_REQUEST } from "../../../../_reducers/post";
import { RecentTableComment, RecentTableView, WelcomeTable } from "./Components";
import Slider from "react-slick";
import Modal from "antd/lib/modal/Modal";
import styled from "styled-components";
import { BLUE_COLOR } from "../../../config";
import useInput from "../../../../_hooks/useInput";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Camera = styled(CameraFilled)`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 2rem;
  float: right;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
    color: ${BLUE_COLOR};
  }
`;
const Close = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 2rem;
  float: right;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
    color: ${BLUE_COLOR};
  }
`;

function HeaderProfile() {
  const { user, addIconDone, addIconUrlDone, removeIconDone } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageForm, setImageForm] = useState(null);
  const [imageInputValue, setImageInputValue] = useState(null);
  const [url, onChangeUrl, setUrl] = useInput("");

  useEffect(() => {
    if (url) {
      setImageForm(null);
    }
  }, [url]);

  useEffect(() => {
    if (addIconDone || addIconUrlDone) {
      message.success("Successfully added your own icon 👍");
    }
    if (removeIconDone) {
      message.success("Successfully removed your icon.");
    }
    setUrl("");
    setImageInputValue(null);
    setImageForm(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addIconDone, addIconUrlDone, removeIconDone]);
  const handleOk = () => {
    if (imageForm) {
      dispatch({
        type: ADD_ICON_REQUEST,
        data: imageForm,
      });
    } else if (url) {
      dispatch({
        type: ADD_ICON_URL_REQUEST,
        data: { url, UserId: user.id },
      });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setImageForm(null);
    setImageInputValue(null);
    setUrl("");
  };

  const imageInput = useRef();
  const onChangeImages = (e) => {
    const imageFormData = new FormData();
    imageFormData.append("image", e.target.files[0]);
    imageFormData.append("id", user.id);
    setImageForm(imageFormData);
    setUrl("");
  };
  useEffect(() => {
    if (!user) {
      return;
    }
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

  const handleImgError = (e) => {
    e.target.src = "./images/blog/default-user.png";
  };
  return (
    <>
      <Row className={"blog_header_profile display"}>
        <Col style={{ paddingRight: "1rem", marginBottom: "1.5rem" }} xs={24} lg={6}>
          <div
            style={{
              position: "relative",
              width: "200px",
              height: "200px",
              margin: "0 auto",
            }}
          >
            <img
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                boxShadow: "4px 8px 21px 1px rgba(0, 0, 0, 0.15)",
              }}
              src={user?.icon.replace(/\/thumb\//, "/original/")}
              onError={handleImgError}
              alt="profile_img"
            />
            {user?.icon !== "./images/blog/default-user.png" ? (
              <Close
                onClick={() =>
                  dispatch({
                    type: REMOVE_ICON_REQUEST,
                    data: user.id,
                  })
                }
                icon={faTrashAlt}
              />
            ) : (
              <Camera onClick={() => setIsModalVisible(true)} />
            )}
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

      <Modal
        title="Icon Upload 🖼️"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Set icon from Local storage</h3>
        <input
          style={{ marginBottom: "1.5rem" }}
          type="file"
          accept="image/*"
          multiple
          value={imageInputValue}
          disabled={url ? true : false}
          ref={imageInput}
          onChange={onChangeImages}
        />
        <h3>Set icon by using URL</h3>
        <Input
          disabled={imageForm ? true : false}
          value={url}
          onChange={onChangeUrl}
          placeholder="https://"
        />
      </Modal>
    </>
  );
}

export default HeaderProfile;
