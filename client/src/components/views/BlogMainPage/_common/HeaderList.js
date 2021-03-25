/* eslint-disable jsx-a11y/anchor-is-valid */
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { faHome, faPaste } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Input, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Scrollspy from "react-scrollspy";
import useInput from "../../../../_hooks/useInput";
import { SEARCH_KEYWORD_REQUEST } from "../../../../_reducers/blog";
export function BlogHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchKeywordDone } = useSelector((state) => state.blog);
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
  };
  useEffect(() => {
    if (searchKeywordDone) {
      if (keyword.charAt(0) === "#") {
        history.push(`/search/${keyword.slice(1)}`);
        setKeyword("");
        return;
      }
      history.push(`/search/${keyword}`);
      setKeyword("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeywordDone]);
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
