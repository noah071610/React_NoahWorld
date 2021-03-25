// import { useDispatch, useSelector } from "react-redux";
import React from "react";
import styled, { keyframes } from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import Slider from "react-slick";

const rotatingRight = keyframes`
 to {
   transform: rotateZ(360deg);
 }
`;

const rotatingLeft = keyframes`
 to {
   transform: rotateZ(-360deg);
 }
`;

const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 992px) {
    h2 {
      font-size: 1.1rem;
    }
  }
`;

const PosterImg = styled.div`
  display: flex;
  justify-content: center;
  max-width: 450px;
  position: relative;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: default;
  display: inline-block;
`;

const Gear = styled.img`
  position: absolute;
  width: 8%;
  top: 20%;
  left: 20%;
  animation: ${rotatingRight} 3s infinite linear;
`;
const GearRight = styled.img`
  position: absolute;
  width: 5%;
  top: 25%;
  left: 25.8%;
  animation: ${rotatingLeft} 2.6s infinite linear;
`;

// const LightModeIcon = styled(FontAwesomeIcon)`
//   cursor: pointer;
//   margin-left: 0.5rem;
//   font-size: 1.2rem;
//   transition: all 0.3s;
//   &:hover {
//     transform: rotateZ(360deg);
//     color: orange;
//   }
// `;

// const NightModeIcon = styled(FontAwesomeIcon)`
//   cursor: pointer;
//   margin-left: 0.5rem;
//   font-size: 1.2rem;
//   transition: all 0.3s;
//   &:hover {
//     transform: rotateY(360deg);
//     color: #aab6fe;
//   }
// `;

const Poster = () => {
  const history = useHistory();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    vertical: true,
    verticalSwiping: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <PosterWrapper>
      <PosterImg>
        <img style={{ width: "80%" }} src={`/images/poster/skills.png`} alt="poster" />
        <Gear src="/images/poster/skills_decoration.png" />
        <GearRight src="/images/poster/skills_decoration.png" />
      </PosterImg>
      <Title>
        <div className="portfolio_poster_name">
          <h2 style={{ fontSize: "2rem" }}>Jang Hyun Soo</h2>
          {/* {theme === "light" ? (
            <NightModeIcon onClick={onClickDarkMode} icon={faMoon} />
          ) : (
            <LightModeIcon onClick={onClickLightMode} icon={faSun} />
          )} */}
        </div>
        <div>
          <Slider
            className="poster_slider"
            style={{ width: "50%", margin: "0 auto" }}
            {...settings}
          >
            <div>
              <h4 style={{ margin: "1rem 0", textAlign: "center" }}>Hi! I'm a Web-developer 💻</h4>
            </div>
            <div>
              <h4 style={{ margin: "1rem 0", textAlign: "center" }}>Step up every second 👨‍💻</h4>
            </div>
            <div>
              <h4 style={{ margin: "1rem 0", textAlign: "center" }}>
                Ability , Passion and "Faith" 🤝
              </h4>
            </div>
          </Slider>
        </div>
        {history.location.pathname === "/" ? null : (
          <p className="portfolio_intro">
            노력은 성공과 비례하지 않습니다. <br /> 하지만 성공한 사람중에 노력하지않는 사람은
            없다고 생각합니다. <br /> 저또한 최고가 아니더라도 최선을 다하며 즐겁게 코딩중입니다. 😸
          </p>
        )}
      </Title>
    </PosterWrapper>
  );
};

export default Poster;
