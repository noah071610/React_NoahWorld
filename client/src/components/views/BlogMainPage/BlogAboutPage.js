import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactTitle } from "react-meta-tags";
import React from "react";
import { Link } from "react-router-dom";

function BlogAboutPage() {
  return (
    <>
      <ReactTitle title="Noah World - Aboutme" />
      <h1 className="about_intro">Hello stranger! Great to meet you.</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Link className="link_to_port" to="/portfolio">
          Would you like to view my portfolio?
        </Link>
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
      <div className="intro_wrapper">
        <h2 className="intro_me">I'm Jang Hyun Soo, Web-developer who love world 👍 </h2>
        <img
          style={{ width: "50%", margin: "2rem 0" }}
          src="/images/blog/profile_aboutme.jpg"
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
