/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  EditFilled,
  HomeFilled,
  RollbackOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Input, message, Popover, Timeline } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Scrollspy from "react-scrollspy";
import useInput from "../../../../../_hooks/useInput";
import { POST_EDIT_ON } from "../../../../../_reducers/blog";
import { REMOVE_POST_REQUEST } from "../../../../../_reducers/post";

function RemoteControl({ Fullcontent }) {
  const dispatch = useDispatch();
  const { post, prevPost, nextPost, removePostDone } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars
  const [password, onChangePassword, setPassword] = useInput();
  const [FixedRemote, setFixedRemote] = useState(false);
  const [headers, setHeaders] = useState([]);
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    function scrollCallBack() {
      if (window.scrollY > 400) {
        setFixedRemote(true);
      } else {
        setFixedRemote(false);
      }
    }
    window.addEventListener("scroll", scrollCallBack);
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  useEffect(() => {
    let contentHeaders = document.querySelectorAll(".tui-editor-contents h2");
    let arr = [];
    contentHeaders.forEach((v, i) => {
      v.setAttribute("id", v.innerHTML);
      v.style = "padding-top: 5rem;";
      arr.push(v.innerHTML);
    });
    setHeaders(arr);
  }, [Fullcontent]);

  const timelineLists = () => {
    return headers.map((v, i) => {
      return (
        <Timeline.Item color="gray" key={i} style={{ width: "100%" }}>
          <a href={`#${v}`}>{v}</a>
        </Timeline.Item>
      );
    });
  };

  const nextPostContent = <h3 style={{ margin: 0 }}>{nextPost?.title}</h3>;
  const prevPostContent = <h3 style={{ margin: 0 }}>{prevPost?.title}</h3>;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: { PostId: post.id, password, tags: post.Hashtags },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (removePostDone) {
      message.success("Removed Post Successfully");
      history.push("/");
    }
  }, [dispatch, history, removePostDone]);

  return (
    <div
      className="remocontrol"
      style={{
        width: "270px",
        paddingLeft: "2rem",
        flexDirection: "column",
        height: "100%",
        position: FixedRemote ? "sticky" : "static",
        top: "5.375rem",
      }}
    >
      <h2 style={{ fontSize: "1rem" }}>{post.title}</h2>
      <ul style={{ overflow: "hidden" }}>
        <li style={{ margin: 0 }}>
          <Link to={"/"}>
            <HomeFilled />
          </Link>
        </li>
        <Divider type="vertical" />
        <li style={{ margin: 0 }}>
          <a
            onClick={() =>
              history.push(`/${post.category === "culture" ? "class" : post.category}`)
            }
          >
            <RollbackOutlined />
          </a>
        </li>
        <Divider type="vertical" />
        <li style={{ margin: 0 }}>
          {nextPost ? (
            <Popover content={nextPostContent} title="👈 Next Post ">
              <Link
                onClick={() => window.scrollTo({ top: 0 })}
                to={`/${post.category}/post/${nextPost.id}`}
              >
                <DoubleLeftOutlined />
              </Link>
            </Popover>
          ) : (
            <DoubleLeftOutlined style={{ color: "rgba(0,0,0,0.2)" }} />
          )}
        </li>
        <Divider type="vertical" />
        <li style={{ margin: 0 }}>
          {prevPost ? (
            <Popover content={prevPostContent} title="Previous Post 👉">
              <Link
                onClick={() => window.scrollTo({ top: 0 })}
                to={`/${post.category}/post/${prevPost.id}`}
              >
                <DoubleRightOutlined />
              </Link>
            </Popover>
          ) : (
            <DoubleRightOutlined style={{ color: "rgba(0,0,0,0.2)" }} />
          )}
        </li>
        <Divider type="vertical" />
        <li style={{ margin: 0 }}>
          <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <VerticalAlignTopOutlined />
          </a>
        </li>
        {user && user.admin && (
          <>
            <Divider type="vertical" />
            <li style={{ margin: 0 }}>
              <a
                onClick={() => {
                  dispatch({
                    type: POST_EDIT_ON,
                  });
                  history.push("/admin");
                }}
              >
                <EditFilled />
              </a>
            </li>
            <Divider type="vertical" />
            <li style={{ margin: 0 }}>
              <a onClick={() => showModal()}>
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </li>
          </>
        )}
      </ul>
      <Divider style={{ margin: "0.5rem 0 3rem 0" }} />
      <Scrollspy
        style={{ margin: 0 }}
        items={headers}
        currentClassName="blog_post_selected"
        offset={300}
      >
        {timelineLists()}
        <Timeline.Item
          style={{ width: "100%", paddingBottom: 0 }}
          className="ant-timeline-item-last"
        >
          <a href={`#comment`}>Comments</a>
        </Timeline.Item>
      </Scrollspy>
      <Modal
        title="Please Enter Admin password"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          This fucntion is for ADMIN only. If you are not a administrator, please go back and
          feedback to us. Thank you for your cooperation.
        </p>
        <p>
          이 기능은 관리자 전용이며 관리자용 비밀번호가 필요합니다. 예상치 못하게 접근하셨을 경우
          피드백 주시면 정말 감사하겠습니다. 협력해주셔서 감사합니다.
        </p>
        <p>
          この機能は管理者専用でございます、何が問題が発生した場合は管理者にご連絡して頂ければ幸いだと思います。
        </p>
        <br />
        <Input.Password value={password} onChange={onChangePassword} />
      </Modal>
    </div>
  );
}

export default RemoteControl;
