import { Popover } from "antd";
import Col from "antd/lib/col";
import React from "react";
import styled from "styled-components";
import { BG_COLOR } from "../../../config";

const Img = styled.img`
  transition: 0.3s;
  border-radius: 50%;
  padding: 0.5rem;
  background-color: ${BG_COLOR};
  &:hover {
    transform: scale(1.1);
  }
`;

const TdImg = styled.div`
  width: 100%;
  margin: auto 0;
  position: relative;
`;
const Signal = styled.div`
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  bottom: 0rem;
  right: 0rem;
  background-color: green;
  &:before {
    content: "";
    position: absolute;
    height: 0.3rem;
    top: 0;
    right: 1.5px;
    border-right: 3px solid rgba(255, 255, 255, 0.5);
    border-top-right-radius: 10px;
  }
`;

const Title = styled.h4`
  margin-top: 0.5rem;
  fontsize: 0.8rem;
  @media only screen and (max-width: 532px) {
    display: none;
  }
`;

function SkillImageBox(props) {
  return (
    <Col xs={6} md={4} lg={3} style={{ display: "flex", padding: "1rem" }}>
      {props.popup ? (
        <Popover
          placement="topLeft"
          content={props.content}
          title={`${props.licenseKor} 통역안내사자격증 보유🔖`}
          className="focus"
        >
          <TdImg>
            <Img style={{ width: "100%" }} alt={props.name} src={props.src} />
            <Title>{props.name}</Title>
            {props.level ? <Signal /> : null}
          </TdImg>
        </Popover>
      ) : (
        <TdImg>
          <div style={{ margin: "0 auto", width: "100%", position: "relative" }}>
            <Img style={{ width: "100%" }} alt={props.name} src={props.src} />
            {props.level ? <Signal /> : null}
          </div>
          <h4 style={{ marginTop: "0.5rem" }}>{props.name}</h4>
        </TdImg>
      )}
    </Col>
  );
}

export default SkillImageBox;
