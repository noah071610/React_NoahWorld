/* eslint-disable jsx-a11y/anchor-is-valid */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { navContents } from "../../config";
import {
  BlogHeader,
  PortfolioHeader,
  PortfolioPostHeader,
  BlogSmallHeader,
} from "./_common/HeaderList";
import { useDispatch, useSelector } from "react-redux";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import { LOG_OUT_REQUEST } from "../../../_reducers/user";
const LogoMain = styled.img`
  &:hover {
    -webkit-animation: pulse 0.5s;
    animation: pulse 0.5s;
  }
`;

function Header() {
  const [FixedNavbar, setFixedNavbar] = useState(false);
  const { header, onSlideMenu } = useSelector((state) => state.blog);
  const { user, logOutDone, logOutError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    function scrollCallBack() {
      if (window.scrollY >= 275) {
        if (
          document.documentElement.clientHeight > 703 &&
          document.documentElement.clientHeight < 776
        ) {
          setFixedNavbar(false);
          return;
        }
        setFixedNavbar(true);
      } else {
        setFixedNavbar(false);
      }
    }
    window.addEventListener("scroll", scrollCallBack);
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  const onClickLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    if (logOutDone) {
      message.success("Log out is done, Thank you for visiting.");
      history.push("/");
    }
    if (logOutError) {
      message.error("Unexpected Erorr! please try again or feedback to us");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logOutDone, logOutError]);

  return (
    <header
      style={{
        position: "relative",
        width: "100%",
        margin: "0 auto",
      }}
      className="header"
    >
      <div
        style={{
          height: "180px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "3rem",
          position: "relative",
          zIndex: 2,
          backgroundColor: "white",
        }}
      >
        <Link onClick={() => window.scrollTo({ top: 0 })} to={"/"}>
          <LogoMain className="logo" src="/images/blog/logo_main.png" />
        </Link>
        {user ? (
          <a className="blog_header_loginout" onClick={onClickLogOut}>
            Log out <FontAwesomeIcon style={{ marginLeft: "0.3rem" }} icon={faSignOutAlt} />
          </a>
        ) : (
          <Link className="blog_header_loginout" to={"/login"}>
            Log In & Sign Up <FontAwesomeIcon style={{ marginLeft: "0.3rem" }} icon={faSignInAlt} />
          </Link>
        )}
      </div>
      <div className={FixedNavbar ? "blog_header_nav fixed" : "blog_header_nav static"}>
        {header === "blog" ? (
          <BlogHeader />
        ) : header === "portfolio" ? (
          <PortfolioHeader navContents={navContents} />
        ) : (
          <PortfolioPostHeader />
        )}
      </div>
      <div className={FixedNavbar ? " fixed" : "relative"}>
        <BlogSmallHeader />
      </div>
      {FixedNavbar ? <div style={{ height: "70px" }} /> : null}
    </header>
  );
}

export default Header;
