import { FC, useEffect, useRef } from "react";
import Articles from "../_common/Articles";
import Title from "../_common/Title";
// @ts-ignore
import { Carousel } from "3d-react-carousal";
import styled from "styled-components";
import VanillaTilt from "vanilla-tilt";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PORTFOLIOS } from "../../../../_reducers/blog";
import { Portfolio_SectionId } from "src/types";
import { RootState } from "src/_reducers";

const options = {
  scale: 1.1,
  speed: 700,
  max: 10,
};

const Tilt = (props: any) => {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current!, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={tilt} {...rest} />;
};

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
    height: 120px;
  }
`;

const PortfolioSmall = styled.div`
  display: none;
  @media only screen and (max-width: 550px) {
    display: block;
    width: 100%;
    height: 200px;
    position: relative;
    margin-bottom: 5rem;
    cursor: pointer;
  }
`;

const PortfolioDesc = styled.div`
  display: block;
  text-align: end;
  position: absolute;
  background-color: white;
  bottom: -2rem;
  right: -0.5rem;
  padding: 1.5rem;
  box-shadow: 4px 8px 21px 1px rgba(0, 0, 0, 0.15);
  h2 {
    margin: 0;
  }
`;

const PortfolioSection: FC<Portfolio_SectionId> = ({ id }) => {
  const { portfolios } = useSelector((state: RootState) => state.blog);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_PORTFOLIOS,
    });
  }, [dispatch]);

  let slides = [
    <PortfolioCard options={options}>
      <Link style={{ cursor: "unset" }} to="/portfolio/1">
        <CardImg src="images/portfolio/portfolio1_main.png" alt="portfolio" />
        <CardTitle className="card_title">
          {portfolios && (
            <>
              <h2 style={{ marginBottom: "1rem 0", color: "black" }}>
                {portfolios[1].name}{" "}
                <FontAwesomeIcon className="portfolio_search" icon={faSearch} />{" "}
              </h2>
              <p>
                {portfolios[1].date}
                <br />
                {portfolios[1].tags.map((tag: string, i: number) => {
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
      <Link style={{ cursor: "unset" }} to="/portfolio/1">
        <CardImg src="/images/blog/logo_poster.png" alt="portfolio2" />
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
                {portfolios[0].tags.map((tag: string, i: number) => {
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
      <Link style={{ cursor: "unset" }} to="/portfolio/3">
        <CardImg src="/images/portfolio/portfolio_movie.jpg" alt="portfolio3" />
        <CardTitle className="card_title">
          {portfolios && (
            <>
              <h2 style={{ marginBottom: "1rem 0", color: "black" }}>
                {portfolios[2].name}{" "}
                <FontAwesomeIcon className="portfolio_search" icon={faSearch} />{" "}
              </h2>
              <p>
                {portfolios[2].date}
                <br />
                {portfolios[2].tags.map((tag: string, i: number) => {
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
  ];
  return (
    <section id={id}>
      <div className="space" />
      <Articles>
        <Title title="Portfolio" sub="최고가 아니더라도 항상 최선을 다합니다." />
        <div className="carousel_wrapper">
          <Carousel slides={slides} autoplay={false} />
        </div>
        {portfolios?.map((v, i: number) => {
          return (
            <PortfolioSmall
              key={i}
              onClick={() => {
                history.push(`/portfolio/${v.id}`);
                window.scrollTo({ top: 0 });
              }}
            >
              <img
                style={{ width: "100%", height: "200px", border: "1px solid rgba(0,0,0,0.1)" }}
                src={v.src}
                alt="portfolio_image"
              />
              <PortfolioDesc>
                <Link
                  to={`/portfolio/${v.id}`}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                    });
                  }}
                >
                  <h2
                    style={{ fontSize: "1rem", marginBottom: "0.5rem" }}
                    className="mobile_port_title"
                  >
                    {v.name}
                  </h2>
                </Link>
                {v.tags.map((tag: string, i: number) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </PortfolioDesc>
            </PortfolioSmall>
          );
        })}
      </Articles>
    </section>
  );
};

export default PortfolioSection;
