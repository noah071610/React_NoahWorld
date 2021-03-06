import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import { ReactTitle } from "react-meta-tags";
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
        <h2 className="intro_me">I'm Jang Hyun Soo, Web-developer who love world 馃憤 </h2>
        <img
          style={{ width: "50%", margin: "2rem 0" }}
          src="/images/blog/profile_aboutme.jpg"
          alt="image_profile"
        />
        <ul className="blog_about_ul">
          <li>
            <span>路 Gender</span> : Male 馃懆
          </li>
          <li>
            <span>路 Stay</span> : Living in Seoul 馃彔
          </li>
          <li>
            <span>路 Language</span> : Korean, English, Japanese
          </li>
          <li>
            <span>路 Work History</span> Travel Company MD in Tokyo, Japan. Hotel GM in Seoul, South
            Korea.
          </li>
          <li>
            <span>路 Occupation</span> : None 馃槩{" "}
          </li>
          <li>
            <span>路 Hobby</span> : Coding , Foodie , Learning Language, Work out, Travel (Especially
            Japan 馃椌)
          </li>

          <li>
            <span>路 Social Media</span> :
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
