import React, { useEffect, useRef, useState } from "react";
import Articles from "../_common/Articles";
import Title from "../_common/Title";
import { Carousel } from "3d-react-carousal";
import styled from "styled-components";
import VanillaTilt from "vanilla-tilt";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PORTFOLIOS } from "../../../../_reducers/blog";

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={tilt} {...rest} />;
}

const PortfolioCard = styled(Tilt)`
  transform-style: preserve-3d;
  position: relative;
  &:hover {
    .card_title {
      transform: translate(-50%) translateZ(30px) scaleY(1);
    }
    
  }
  @media only screen and (max-width: 765px) {
    &:hover {
      .card_title {
        transform: translate(-50%) translateZ(10px) scaleY(1);
      }
  }
`;
const CardTitle = styled.div`
  cursor: pointer;
  color: black;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%) translateZ(0) scaleY(0);
  transition: all 0.3s;
  background-color: white;
  width: 80%;
  box-shadow: 4px 8px 21px 1px rgba(0, 0, 0, 0.15);
  padding: 1rem 0;
  transition: all 0.3;
  &:hover {
    .portfolio_search {
      color: rgba(0, 0, 0, 0.4);
    }
  }
  @media only screen and (max-width: 765px) {
    width: 90%;
    h2 {
      font-size: 0.7rem;
    }
    p {
      font-size: 0.5rem;
    }
  }
`;

const CardImg = styled.img`
  height: 380px;
  border-radius: 10px;
  padding: 0.1rem;
  box-shadow: 4px 8px 21px 1px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 992px) {
    height: 300px;
  }
  @media only screen and (max-width: 650px) {
    height: 200px;
  }
  @media only screen and (max-width: 460px) {
    height: 170px;
  }
`;

const PortfolioDesc = styled.div`
  display: none;
  margin-bottom: 1rem;
  @media only screen and (max-width: 650px) {
    padding-right: 2.3rem;
    display: block;
    text-align: end;
  }
`;

function PortfolioSection({ id }) {
  const [PortfolioNumber, setPortfolioNumber] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_PORTFOLIOS,
    });
  }, [dispatch]);
  const { portfolios } = useSelector((state) => state.blog);
  const options = {
    scale: 1.1,
    speed: 700,
    max: 10,
  };
  let slides = [
    <PortfolioCard options={options}>
      <Link style={{ cursor: "unset" }} to="/portfolio/1">
        <CardImg src="images/portfolio/portfolio1_main.png" alt="game" />
        <CardTitle className="card_title">
          {portfolios && (
            <>
              <h2 style={{ marginBottom: "1rem 0", color: "black" }}>
                {portfolios[0].name}{" "}
                <FontAwesomeIcon className="portfolio_search" icon={faSearch} />{" "}
              </h2>
              <p>
                {portfolios[0].date}
                <br />
                {portfolios[0].tags.map((tag, i) => {
                  return (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  );
                })}
              </p>
            </>
          )}
        </CardTitle>
      </Link>
    </PortfolioCard>,
    <PortfolioCard options={options}>
      <CardImg src="images/game.jpg" alt="game" />
    </PortfolioCard>,
    <PortfolioCard options={options}>
      <CardImg src="images/game.jpg" alt="game" />
    </PortfolioCard>,
    <PortfolioCard options={options}>
      <CardImg src="images/game.jpg" alt="game" />
    </PortfolioCard>,
    <PortfolioCard options={options}>
      <CardImg src="images/game.jpg" alt="game" />
    </PortfolioCard>,
  ];
  const portfolioDescComponent = (PortfolioNumber) => {
    switch (PortfolioNumber) {
      case 0:
        return (
          <PortfolioDesc>
            <Link
              to="/portfolio/1"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
              }}
            >
              <h2 className="mobile_port_title">반응형 웹 포트폴리오 사이트 </h2>
            </Link>
            <span className="tag">#Html</span>
            <span className="tag">#Css</span>
            <span className="tag">#React</span>
          </PortfolioDesc>
        );
      case 1:
        return <h2>ss </h2>;

      default:
        break;
    }
  };
  const onClickCardHandler = (selected) => {
    if (selected === "slider-right") {
      setPortfolioNumber(PortfolioNumber + 1);
      return;
    }
    if (selected === "slider-left") {
      setPortfolioNumber(PortfolioNumber - 1);
      return;
    }
  };
  if (PortfolioNumber === -1) {
    setPortfolioNumber(slides.length - 1);
  }
  if (PortfolioNumber === slides.length) {
    setPortfolioNumber(0);
  }
  return (
    <section id={id}>
      <div className="space" />
      <Articles>
        <Title title="Portfolio" sub="최고가 아니더라도 항상 최선을 다합니다." />
        <div
          style={{ padding: "2rem 0 3rem  0" }}
          onClick={(e) => onClickCardHandler(e.target.className)}
        >
          <Carousel slides={slides} autoplay={false} />
        </div>
        {portfolioDescComponent(PortfolioNumber)}
      </Articles>
    </section>
  );
}

export default PortfolioSection;
