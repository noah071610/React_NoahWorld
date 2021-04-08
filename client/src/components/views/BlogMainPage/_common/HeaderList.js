/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  EditFilled,
  HomeFilled,
  RollbackOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import {
  faBars,
  faChevronDown,
  faHome,
  faPaste,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Input, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Scrollspy from "react-scrollspy";
import styled from "styled-components";
import useInput from "../../../../_hooks/useInput";
import useToggle from "../../../../_hooks/useToggle";
import { ON_SLIDE_MENU, POST_EDIT_ON, SEARCH_KEYWORD_REQUEST } from "../../../../_reducers/blog";
import { REMOVE_POST_REQUEST } from "../../../../_reducers/post";
import { LOG_OUT_REQUEST } from "../../../../_reducers/user";

const PostTitle = styled.h4`
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 1.2rem;
  margin-bottom: 0.2rem;
`;

export function BlogHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [keyword, onChangeKeyword, setKeyword] = useInput("");
  const onSearchContent = () => {
    if (keyword.length < 2) {
      message.error("Keyword is required to have more then 1 letter");
      return;
    }
    dispatch({
      type: SEARCH_KEYWORD_REQUEST,
      data: { keyword },
    });
    if (keyword.charAt(0) === "#") {
      history.push(`/search/${keyword.slice(1)}`);
      setKeyword("");
      return;
    }
    history.push(`/search/${keyword}`);
    setKeyword("");
  };
  return (
    <>
      <ul className="blog_header_ul">
        <li className="blog_header_li">
          <Link onClick={() => window.scrollTo({ top: 0 })} to={"/"}>
            Home
          </Link>
        </li>
        <li className="blog_header_li">
          <Link onClick={() => window.scrollTo({ top: 0 })} to={"/aboutme"}>
            About me
          </Link>
        </li>
        <li className="blog_header_li">
          <Link onClick={() => window.scrollTo({ top: 0 })} to={"/tech"}>
            Info Tech
          </Link>
        </li>
        <li className="blog_header_li">
          <Link onClick={() => window.scrollTo({ top: 0 })} to={"/daily"}>
            Daily
          </Link>
        </li>
        <li className="blog_header_li">
          <Link onClick={() => window.scrollTo({ top: 0 })} to={"/class"}>
            Korean Class for &nbsp;
            <img
              style={{ width: "1.5rem" }}
              alt="japan_flag"
              src="https://img.icons8.com/color/48/000000/japan.png"
            />
          </Link>
        </li>
      </ul>
      <Input.Search
        value={keyword}
        onChange={onChangeKeyword}
        style={{ width: "30%", zIndex: "auto", overflow: "hidden" }}
        onSearch={onSearchContent}
      />
    </>
  );
}

export function BlogSmallHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { onSlideMenu, portfolios, portfolio } = useSelector((state) => state.blog);
  const [password, onChangePassword] = useInput();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [keyword, onChangeKeyword, setKeyword] = useInput("");
  const { user } = useSelector((state) => state.user);
  const { post, removePostDone, prevPost, nextPost } = useSelector((state) => state.post);
  const [onSearchForm, onClickSearchForm] = useToggle(false);
  const [slideTitle, onClickSlideTitle, setSlideTitle] = useToggle(false);
  const [headerTitle, setHeaderTitle] = useState(false);
  const [portfolioTitle, setPortfolioTitle] = useState(false);
  useEffect(() => {
    function scrollCallBack() {
      let pathname = window.location.pathname.split("/");
      if (window.scrollY > 200 && pathname[2] === "post") {
        setHeaderTitle(true);
        return;
      }
      if (window.scrollY > 200 && pathname[1] === "portfolio" && !isNaN(parseInt(pathname[2]))) {
        setHeaderTitle(true);
        setPortfolioTitle(true);
        return;
      }
      setHeaderTitle(false);
      setSlideTitle(false);
      setPortfolioTitle(false);
    }
    window.addEventListener("scroll", scrollCallBack);
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchContent = () => {
    if (keyword.length < 2) {
      message.error("Keyword is required to have more then 1 letter");
      return;
    }
    dispatch({
      type: SEARCH_KEYWORD_REQUEST,
      data: { keyword },
    });
    if (keyword.charAt(0) === "#") {
      history.push(`/search/${keyword.slice(1)}`);
      setKeyword("");
      dispatch({
        type: ON_SLIDE_MENU,
      });
      return;
    }
    history.push(`/search/${keyword}`);
    setKeyword("");
    dispatch({
      type: ON_SLIDE_MENU,
    });
  };

  const onClickLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
    dispatch({
      type: ON_SLIDE_MENU,
    });
  }, [dispatch]);

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
    <nav className="blog_header_small">
      <div
        style={
          onSlideMenu || slideTitle
            ? {
                backgroundColor: "white",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderBottom: "none",
                overflow: "inherit",
              }
            : {
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }
        }
        className="blog_header_small_nav"
      >
        <div
          style={
            headerTitle
              ? { transform: "translateY(-100%)", transition: "all 0.5s", width: "70%" }
              : { transform: "translateY(0)", transition: "all 0.5s" }
          }
        >
          <Link style={{ display: "flex", alignItems: "center", height: "70px" }} to={"/"}>
            <img alt="menu_logo" style={{ width: "1.9rem" }} src="/images/blog/logo_icon.png" />
            <span
              style={{
                color: "black",
                marginLeft: "0.5rem",
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
            >
              Noah World
            </span>
          </Link>
          {portfolioTitle ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "70px",
              }}
            >
              {portfolios && (
                <Link
                  onClick={() => {
                    window.scrollTo({ top: 130 });
                  }}
                  to={`/portfolio/${portfolio.id === 1 ? portfolios.length : portfolio.id - 1}`}
                  style={{ display: "flex", alignItems: "center", fontSize: "1rem" }}
                >
                  <DoubleLeftOutlined />
                  <span className="portfolio_nav_btn">이전 포트폴리오</span>
                </Link>
              )}
              <Divider type="vertical" />
              {portfolios && (
                <Link
                  onClick={() => {
                    window.scrollTo({ top: 130 });
                  }}
                  to={`/portfolio/${portfolio.id === portfolios.length ? 1 : portfolio.id + 1}`}
                  style={{ display: "flex", alignItems: "center", fontSize: "1rem" }}
                >
                  <span className="portfolio_nav_btn">다음 포트폴리오</span>
                  <DoubleRightOutlined />
                </Link>
              )}
            </div>
          ) : (
            <a
              onClick={onClickSlideTitle}
              style={{ display: "flex", alignItems: "center", width: "100%", height: "70px" }}
            >
              <PostTitle>{post?.title}</PostTitle>
              <FontAwesomeIcon
                style={{
                  marginLeft: "1rem",
                  transition: "all 0.3s",
                  transform: `rotate(${slideTitle ? "180deg" : "0deg"})`,
                }}
                icon={faChevronDown}
              />
            </a>
          )}
        </div>
        <a
          onClick={() => {
            dispatch({
              type: ON_SLIDE_MENU,
            });
            setSlideTitle(false);
          }}
          style={{ display: "flex", alignItems: "center" }}
        >
          {onSlideMenu ? (
            <FontAwesomeIcon style={{ fontSize: "1.5rem" }} icon={faTimes} />
          ) : (
            <FontAwesomeIcon style={{ fontSize: "1.5rem" }} icon={faBars} />
          )}
        </a>
        {slideTitle && headerTitle ? (
          <ul className="slide_title">
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
              {nextPost[0] ? (
                <Link
                  onClick={() => window.scrollTo({ top: 0 })}
                  to={`/${post.category}/post/${nextPost[0].id}`}
                >
                  <DoubleLeftOutlined />
                </Link>
              ) : (
                <DoubleLeftOutlined style={{ color: "rgba(0,0,0,0.2)" }} />
              )}
            </li>
            <Divider type="vertical" />
            <li style={{ margin: 0 }}>
              {prevPost[0] ? (
                <Link
                  onClick={() => window.scrollTo({ top: 0 })}
                  to={`/${post.category}/post/${prevPost[0].id}`}
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
        ) : null}
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
        <div
          style={
            onSlideMenu
              ? {
                  display: "block",
                  overflow: "hidden",
                }
              : { display: "none" }
          }
          className="slide_menu"
        >
          <Input.Search
            style={
              onSearchForm
                ? { transform: "translateY(0)", transition: "all 0.3s", marginBottom: "1rem" }
                : {
                    transform: "translateY(-200%)",
                    transition: "all 0.3s",
                    position: "absolute",
                    left: 0,
                  }
            }
            value={keyword}
            onChange={onChangeKeyword}
            onSearch={onSearchContent}
          />
          <div style={{ display: "flex", marginTop: "1rem" }}>
            <ul style={{ margin: 0, width: "50%", paddingRight: "1rem" }}>
              <h2>Blog</h2>
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  dispatch({
                    type: ON_SLIDE_MENU,
                  });
                }}
                to={"/"}
              >
                <li> - Home</li>
              </Link>
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  dispatch({
                    type: ON_SLIDE_MENU,
                  });
                }}
                to={"/tech"}
              >
                <li> - Info Tech</li>
              </Link>
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  dispatch({
                    type: ON_SLIDE_MENU,
                  });
                }}
                to={"/daily"}
              >
                <li> - Daily</li>
              </Link>
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  dispatch({
                    type: ON_SLIDE_MENU,
                  });
                }}
                to={"/class"}
              >
                <li>
                  - Korean Class for &nbsp;
                  <img
                    style={{ width: "1.5rem" }}
                    alt="japan_flag"
                    src="https://img.icons8.com/color/48/000000/japan.png"
                  />
                </li>
              </Link>
              <a onClick={onClickSearchForm}>
                <li>
                  {" "}
                  - Search <FontAwesomeIcon style={{ marginLeft: "0.5rem" }} icon={faSearch} />
                </li>
              </a>
            </ul>
            <ul
              style={{
                margin: 0,
                width: "50%",
                paddingLeft: "1rem",
                borderLeft: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <h2>Direct Link</h2>

              <Link
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  dispatch({
                    type: ON_SLIDE_MENU,
                  });
                }}
                to={"/aboutme"}
              >
                <li> - About me</li>
              </Link>
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  dispatch({
                    type: ON_SLIDE_MENU,
                  });
                }}
                to={"/portfolio"}
              >
                <li> - Portfolio</li>
              </Link>
              <a href="https://www.instagram.com/salmonchobab/" target="_blank" rel="noreferrer">
                <li> - Instagram</li>
              </a>
              <a href="https://github.com/noah071610" target="_blank" rel="noreferrer">
                <li> - Git</li>
              </a>
              {user ? (
                <a onClick={onClickLogOut}>
                  <li>
                    - Log out{" "}
                    <FontAwesomeIcon style={{ marginLeft: "0.3rem" }} icon={faSignOutAlt} />
                  </li>
                </a>
              ) : (
                <Link
                  onClick={() =>
                    dispatch({
                      type: ON_SLIDE_MENU,
                    })
                  }
                  to={"/login"}
                >
                  <li>
                    - Log In & Sign Up{" "}
                    <FontAwesomeIcon style={{ marginLeft: "0.3rem" }} icon={faSignInAlt} />
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function PortfolioHeader({ navContents }) {
  return (
    <>
      <Link
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
        className="blog_header_li"
        to={"/"}
      >
        <FontAwesomeIcon style={{ marginRight: "0.8rem" }} icon={faHome} />
        Blog
      </Link>
      <Scrollspy
        items={["aboutme", "skills", "portfolio", "contact"]}
        currentClassName="is-current"
        className="blog_header_ul"
        offset={0}
      >
        {navContents.map((v, i) => (
          <li key={i} className="blog_header_li" style={{ transition: "all 0.3s" }}>
            <a href={`#${v.name}`}>
              <FontAwesomeIcon icon={v.icon} />
              <span style={{ marginLeft: "1rem" }}>{v.explain}</span>
            </a>
          </li>
        ))}
      </Scrollspy>
    </>
  );
}

export function PortfolioPostHeader() {
  const { portfolios, portfolio } = useSelector((state) => state.blog);
  return (
    <>
      <div>
        <Link
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
          className="blog_header_li"
          to={"/"}
        >
          <FontAwesomeIcon style={{ marginRight: "0.8rem" }} icon={faHome} />
          Blog
        </Link>
        <Link className="blog_header_li" to={"/portfolio"}>
          <FontAwesomeIcon style={{ marginRight: "0.8rem" }} icon={faPaste} />
          Portfolio Main
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {portfolios && (
          <Link
            onClick={() => {
              window.scrollTo({ top: 276 });
            }}
            to={`/portfolio/${portfolio.id === 1 ? portfolios.length : portfolio.id - 1}`}
            style={{ display: "flex", alignItems: "center", fontSize: "1rem" }}
          >
            <DoubleLeftOutlined />
            <span style={{ fontSize: "0.8rem", margin: "0 0.5rem" }}>이전 포트폴리오</span>
          </Link>
        )}
        <Divider type="vertical" />
        {portfolios && (
          <Link
            onClick={() => {
              window.scrollTo({ top: 276 });
            }}
            to={`/portfolio/${portfolio.id === portfolios.length ? 1 : portfolio.id + 1}`}
            style={{ display: "flex", alignItems: "center", fontSize: "1rem" }}
          >
            <span style={{ fontSize: "0.8rem", margin: "0 0.5rem" }}>다음 포트폴리오</span>
            <DoubleRightOutlined />
          </Link>
        )}
      </div>
    </>
  );
}
