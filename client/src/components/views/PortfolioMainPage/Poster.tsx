import styled, { keyframes } from "styled-components";
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
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`;

const PosterImg = styled.div`
  display: flex;
  justify-content: center;
  max-width: 450px;
  position: relative;
  .poster_img {
    width: 80%;
    @media only screen and (max-width: 400px) {
      height: 250px;
    }
  }
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
        <img className="poster_img" src="/images/poster/Skills.png" alt="poster" />
        <Gear src="/images/poster/skills_decoration.png" />
        <GearRight src="/images/poster/skills_decoration.png" />
      </PosterImg>
      <Title>
        <div className="portfolio_poster_name">
          <h2 style={{ fontSize: "2rem" }}>Jang Hyun Soo</h2>
        </div>
        <div>
          <Slider className="poster_slider" {...settings}>
            <div>
              <h4 style={{ margin: "1rem 0", textAlign: "center" }}>Hi! I'm a Web-developer ????</h4>
            </div>
            <div>
              <h4 style={{ margin: "1rem 0", textAlign: "center" }}>Step up every second ???????????</h4>
            </div>
            <div>
              <h4 style={{ margin: "1rem 0", textAlign: "center" }}>
                Ability , Passion and "Faith" ????
              </h4>
            </div>
          </Slider>
        </div>
        {history.location.pathname === "/" ? null : (
          <p className="portfolio_intro">
            ????????? ????????? ???????????? ????????????. <br /> ????????? ????????? ???????????? ?????????????????? ?????????
            ????????? ???????????????. <br /> ????????? ????????? ??????????????? ????????? ????????? ????????? ??????????????????. ????
          </p>
        )}
      </Title>
    </PosterWrapper>
  );
};

export default Poster;
