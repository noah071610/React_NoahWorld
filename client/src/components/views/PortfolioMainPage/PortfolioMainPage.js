import React, { useEffect } from "react";
import styled from "styled-components";
import { CardContents, SUB_COLOR } from "../../config";
import { ReactTitle } from "react-meta-tags";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import CardContent from "./CardContent";
import Articles from "./_common/Articles";
import PageWrapper from "./_common/PageWrapper";
import Title from "./_common/Title";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SkillSection from "./SkillSection/SkillSection";
import PortfolioSection from "./PortfolioSection/PortfolioSection";
import ContactSection from "./ContactSection/ContactSection";
import Poster from "./Poster";
import { useDispatch } from "react-redux";
import { Divider } from "antd";
import { CHAGE_HEADER, LOAD_PORTFOLIOS, OFF_ABOUT } from "../../../_reducers/blog";

const Img = styled.img`
  width: 170px;
  height: 200px;
  border-radius: 1rem;
  padding: 3px;
  box-shadow: 4px 8px 21px 1px rgba(0, 0, 0, 0.15);
`;

const IntroImg = styled.div`
  width: 50%;
  margin-bottom: 0;
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

const IntroMe = styled.div`
  width: 50%;
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & h3 {
    font-size: 1.1rem;
  }
  & p {
    width: 90%;
    margin-left: 0;
  }
  & ul {
    margin-top: 0.5rem;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    text-align: center;
    p {
      margin: 0 auto;
    }
    ul {
      margin-top: 1rem;
    }
  }
`;

const SocialIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  color: black;
  margin-right: 0.5rem;
  margin-left: 0.1rem;
  transition: all 0.3s;
  &:hover {
    color: ${SUB_COLOR};
  }
`;

const ValueCard = styled(Col)`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: 0.5s;
  margin-bottom: 1.5rem;
`;

const MobileHome = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const PortfolioMainPage = ({ mobileSize }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_PORTFOLIOS,
    });
    dispatch({
      type: CHAGE_HEADER,
      header: "portfolio",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch({
      type: OFF_ABOUT,
    });
  }, [dispatch]);

  const pageComponent = () => {
    return (
      <PageWrapper>
        <ReactTitle title="JANG HYUN SOO - Portfolio" />
        <section id="aboutme">
          <div className="space" />
          <Articles>
            <Title title="Introduce" sub="신뢰를 바탕으로 함께 발전합니다." />
            <Row>
              <IntroImg span={12}>
                <Img data-aos="fade-down" data-aos-duration="800" src="./images/profile.jpg" />
              </IntroImg>
              <IntroMe span={12}>
                <h3>
                  신뢰를 주는 <span className="marker">장현수</span> 입니다.
                </h3>
                <p style={{ lineHeight: "1.5", fontSize: "0.9rem" }}>
                  성급하지 않지만 꾸준히, 누구보다 즐겁고 열정있게 신입 프론트엔드 개발자라는
                  목표를향해 나아가고 있습니다.
                </p>
                <ul>
                  <li>
                    <a href="https://github.com/noah071610" target="_blank" rel="noreferrer">
                      <SocialIcon className="social_icon" icon={faGithub} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/salmonchobab/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SocialIcon className="social_icon" icon={faInstagram} />
                    </a>
                  </li>
                  <li>
                    <a href="mailto:noah071610@naver.com">
                      <SocialIcon className="social_icon" icon={faEnvelope} />
                    </a>
                  </li>
                </ul>
              </IntroMe>
            </Row>
            <Divider style={{ margin: "6rem 0" }} orientation="left">
              Main Value
            </Divider>
            <Row>
              <ValueCard xs={24} md={8}>
                <CardContent contents={CardContents[0]} />
              </ValueCard>
              <ValueCard xs={24} md={8}>
                <CardContent contents={CardContents[1]} />
              </ValueCard>
              <ValueCard xs={24} md={8}>
                <CardContent contents={CardContents[2]} />
              </ValueCard>
            </Row>
          </Articles>
        </section>
        <SkillSection id="skills" />
        <PortfolioSection id="portfolio" />
        <ContactSection id="contact" />
      </PageWrapper>
    );
  };
  return (
    <MobileHome>
      <Poster />
      {pageComponent()}
    </MobileHome>
  );
};

export default PortfolioMainPage;
