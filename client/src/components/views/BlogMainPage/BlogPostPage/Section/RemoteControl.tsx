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
import { Divider, Input, message, Timeline } from "antd";
import Modal from "antd/lib/modal/Modal";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Scrollspy from "react-scrollspy";
import { RootState } from "src/_reducers";
import useInput from "../../../../../_hooks/useInput";
import { POST_EDIT_ON } from "../../../../../_reducers/blog";
import { REMOVE_POST_REQUEST } from "../../../../../_reducers/post";

interface RemoteProps {
  Fullcontent: string;
}

const RemoteControl: FC<RemoteProps> = ({ Fullcontent }) => {
  const dispatch = useDispatch();
  const { post, prevPost, nextPost, removePostDone } = useSelector(
    (state: RootState) => state.post
  );
  const { user } = useSelector((state: RootState) => state.user);
  // eslint-disable-next-line no-unused-vars
  const [password, onChangePassword] = useInput("");
  const [FixedRemote, setFixedRemote] = useState(false);
  const [headers, setHeaders] = useState<string[]>([]);
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
    let contentHeaders = document.querySelectorAll(
      ".tui-editor-contents h1, .tui-editor-contents h2"
    );
    let arr: string[] = [];
    contentHeaders.forEach((v, i) => {
      v.setAttribute("id", String(i));
      arr.push(v.innerHTML);
    });
    setHeaders(arr);
  }, [Fullcontent]);

  const timelineLists = useCallback(() => {
    return headers.map((v, i) => (
      <Timeline.Item color="gray" key={i} style={{ width: "100%" }}>
        <a href={`#${i}`}>{v}</a>
      </Timeline.Item>
    ));
  }, [headers]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: { PostId: post?.id, password, tags: post?.HashTags },
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
      <h2 style={{ fontSize: "1rem", marginBottom: "1rem", lineHeight: "1.5" }}>{post?.title}</h2>
      <ul style={{ overflow: "hidden" }}>
        <li style={{ margin: 0 }}>
          <Link to={"/"}>
            <HomeFilled />
          </Link>
        </li>
        <Divider type="vertical" />
        <li style={{ margin: "0 0 1rem 0" }}>
          <a
            onClick={() =>
              history.push(`/${post?.category === "culture" ? "class" : post?.category}`)
            }
          >
            <RollbackOutlined />
          </a>
        </li>
        <Divider type="vertical" />
        <li style={{ margin: 0 }}>
          {prevPost[0] ? (
            <Link
              onClick={() => window.scrollTo({ top: 0 })}
              to={`/${post?.category}/post/${prevPost[0].id}`}
            >
              <DoubleLeftOutlined />
            </Link>
          ) : (
            <DoubleLeftOutlined style={{ color: "rgba(0,0,0,0.2)" }} />
          )}
        </li>
        <Divider type="vertical" />
        <li style={{ margin: 0 }}>
          {nextPost[0] ? (
            <Link
              onClick={() => window.scrollTo({ top: 0 })}
              to={`/${post?.category}/post/${nextPost[0].id}`}
            >
              <DoubleRightOutlined />
            </Link>
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
        {user?.id === 1 && user.admin && (
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
        items={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
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
          ??? ????????? ????????? ???????????? ???????????? ??????????????? ???????????????. ????????? ????????? ??????????????? ??????
          ????????? ????????? ?????? ?????????????????????. ?????????????????? ???????????????.
        </p>
        <p>
          ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        </p>
        <br />
        <Input.Password value={password} onChange={onChangePassword} />
      </Modal>
    </div>
  );
};

export default RemoteControl;
