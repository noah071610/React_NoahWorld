import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkToPort = styled(Link)`
  transition: all 0.3s;
  background-color: #3b2a25;
  padding: 2rem;
  border-radius: 20px;
  font-size: 1.5rem;
  color: white;
  margin-top: 2rem;
  position: relative;
  &:hover {
    transform: scale(1.2);
    color: white;
  }
  &:before {
    content: "";
    width: 40px;
    height: 40px;
    background-color: #3b2a25;
    position: absolute;
    bottom: -20px;
    transform: translateX(50%) rotateZ(45deg);
    right: 50%;
  }
`;

function BlogAboutPage() {
  return (
    <>
      <h1 style={{ margin: "3rem 0", textAlign: "center" }}>Hello stranger! Great to meet you.</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <LinkToPort to="/portfolio">Would you like to view my portfolio?</LinkToPort>
        <img
          style={{
            width: "30%",
            WebkitAnimation: "fadeInUpBig 1.5s",
            animation: "fadeInUpBig 1.5s",
            zIndex: -1,
          }}
          src="/images/blog/logo_cha.png"
          alt="profile"
        />
      </div>
      <div
        style={{
          margin: "0 auto",
          position: "relative",
          padding: "4rem",
          boxShadow: "4px 8px 21px 1px rgba(0, 0, 0, 0.15)",
          backgroundColor: "white",
        }}
      >
        <h2 style={{ fontSize: "2rem" }}>I'm Jang Hyun Soo, Web-developer who love world 👍 </h2>
        <img
          style={{ width: "50%", margin: "2rem 0" }}
          src="/images/blog/profile_travel.jpg"
          alt="image_profile"
        />
        <ul className="blog_about_ul">
          <li>
            <span>· Gender</span> : Male 👨
          </li>
          <li>
            <span>· Stay</span> : Living in Seoul 🏠
          </li>
          <li>
            <span>· Language</span> : Korean, English, Japanese
          </li>
          <li>
            <span>· Work History</span> Travel Company MD in Tokyo, Japan. Hotel GM in Seoul, South
            Korea.
          </li>
          <li>
            <span>· Occupation</span> : None 😢{" "}
          </li>
          <li>
            <span>· Hobby</span> : Coding , Foodie , Learning Language, Work out, Travel (Especially
            Japan 🗾)
          </li>

          <li>
            <span>· Social Media</span> :
            <a href="https://github.com/noah071610" target="_blank" rel="noreferrer">
              <FontAwesomeIcon style={{ fontSize: "1.2rem", margin: "0 0.5rem" }} icon={faGithub} />
            </a>
            <a href="https://www.instagram.com/salmonchobab/" target="_blank" rel="noreferrer">
              <FontAwesomeIcon
                style={{ fontSize: "1.2rem", margin: "0 0.5rem" }}
                icon={faInstagram}
              />
            </a>
            <Link style={{ fontSize: "1rem", margin: "0 0.5rem" }} to={"/portfolio"}>
              Portfolio
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default BlogAboutPage;
