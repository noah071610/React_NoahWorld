/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { CameraFilled } from "@ant-design/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Input, message, Row } from "antd";
import { ADD_ICON_REQUEST, REMOVE_ICON_REQUEST } from "../../../../_reducers/user";
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
  const [url, onChangeUrl, setUrl] = useInput("");
  const [upImg, setUpImg] = useState("");
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [blob, setBlob] = useState(null);
  const [crop, setCrop] = useState({ unit: "px", width: 200, aspect: 1 / 1 });

  useEffect(() => {
    if (addIconDone || addIconUrlDone) {
      message.success("Successfully added your own icon 👍");
    }
    if (removeIconDone) {
      message.success("Successfully removed your icon.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addIconDone, addIconUrlDone, removeIconDone]);
  const handleOk = () => {
    const dd = new FormData();
    dd.append("image", blob);
    dd.append("id", user.id);
    dispatch({
      type: ADD_ICON_REQUEST,
      data: dd,
    });
    // if (imageForm) {
    //   dispatch({
    //     type: ADD_ICON_REQUEST,
    //     data: imageForm,
    //   });
    // } else if (url && !imageForm) {
    //   dispatch({
    //     type: ADD_ICON_URL_REQUEST,
    //     data: { url, UserId: user.id },
    //   });
    // }
    setIsModalVisible(false);
    setUrl("");
    setUpImg(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUrl("");
    setUpImg(null);
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
    e.target.src = "/images/blog/default-user.png";
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          setBlob(blob);
        },
        "image/png",
        1
      );
    });
  }, [completedCrop]);

  return (
    <>
      {user && (
        <>
          <Row className={"blog_header_profile"}>
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
                {user?.icon === "/images/blog/default-user.png" ? (
                  <Camera onClick={() => setIsModalVisible(true)} />
                ) : (
                  <Close
                    onClick={() =>
                      dispatch({
                        type: REMOVE_ICON_REQUEST,
                        data: user.id,
                      })
                    }
                    icon={faTrashAlt}
                  />
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
        </>
      )}

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
          disabled={url ? true : false}
          onChange={onSelectFile}
        />
        <h3>Set icon by using URL</h3>
        <Input
          disabled={upImg ? true : false}
          value={url}
          onChange={onChangeUrl}
          placeholder="https://"
        />

        {(url || upImg) && (
          <>
            <h3>Crop the image for icon size.</h3>
            <ReactCrop
              crossorigin="anonymous"
              style={{ width: "100%" }}
              imageStyle={{ width: "100%" }}
              src={upImg || url}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <canvas
                ref={previewCanvasRef}
                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                style={{
                  width: "50%",
                  height: "50%",
                  borderRadius: "50%",
                }}
              />
            </div>
            <h2 style={{ textAlign: "center" }}>{user?.name}</h2>
          </>
        )}
      </Modal>
    </>
  );
}

export default HeaderProfile;
