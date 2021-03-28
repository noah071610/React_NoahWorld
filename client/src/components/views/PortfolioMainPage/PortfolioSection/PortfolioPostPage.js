import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PageWrapper from "../_common/PageWrapper";
import Articles from "../_common/Articles";
import Title from "../_common/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { SUB_COLOR } from "../../../config";
import parse from "html-react-parser";
import { CHAGE_HEADER, LOAD_PORTFOLIO, OFF_ABOUT } from "../../../../_reducers/blog";

const MobileHome = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  &:hover {
    color: ${SUB_COLOR};
  }
`;

const GitLink = styled.a`
  margin-left: 1rem;
`;

const PortfolioPostPage = ({ mobileSize }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    let id = history.location.pathname.slice(-1) - 1;
    dispatch({
      type: LOAD_PORTFOLIO,
      id,
    });
    dispatch({
      type: CHAGE_HEADER,
      header: "portfolioPost",
    });
  }, [dispatch, history.location.pathname]);
  useEffect(() => {
    dispatch({
      type: OFF_ABOUT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { portfolio } = useSelector((state) => state.blog);

  const pageComponent = () => {
    return (
      <PageWrapper>
        <Articles>
          <Title title="Project" />
          {portfolio.src && (
            <img
              data-aos="fade-in"
              data-aos-duration="1000"
              style={{ width: "100%" }}
              src={portfolio.src}
              alt={portfolio.src}
            />
          )}
          <h2 data-aos="fade-down" data-aos-duration="500" style={{ marginTop: "2rem" }}>
            반응형 웹 포트폴리오
            {portfolio.git && (
              <GitLink href={portfolio.git} target="_blank" rel="noreferrer">
                <Icon icon={faGithub} />
              </GitLink>
            )}
          </h2>
          <p data-aos="fade-down" data-aos-duration="500" data-aos-delay="300">
            {portfolio.date && portfolio.date}
          </p>
          {portfolio.tags &&
            portfolio.tags.map((tag, i) => {
              let delay = 300 + i * 150;
              return (
                <span
                  data-aos="fade-down"
                  data-aos-duration="500"
                  data-aos-delay={delay}
                  key={i}
                  className="tag"
                >
                  {tag}
                </span>
              );
            })}
        </Articles>
        <Articles>
          <Title title="Summary" />
          <p data-aos="fade-in" data-aos-duration="1000" className="portfolio_summary">
            {portfolio.desc && parse(portfolio.desc)}
          </p>
        </Articles>
      </PageWrapper>
    );
  };
  return (
    <>
      <MobileHome>
        <div className="space" />
        {portfolio && pageComponent()}
      </MobileHome>
    </>
  );
};

export default PortfolioPostPage;
