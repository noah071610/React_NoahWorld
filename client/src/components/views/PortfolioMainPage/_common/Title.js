import React from "react";
import styled from "styled-components";
import DividerLeftPoint from "./DividerLeftPoint";

const TitleSub = styled.h2`
  margin: 0.5rem 0 3rem 0;
  @media only screen and (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

function Title(props) {
  return (
    <>
      <h2 style={{ margin: 0, padding: "1.5rem 0 0.5rem 0" }}>{props.title}</h2>
      <DividerLeftPoint />
      <TitleSub>{props.sub}</TitleSub>
    </>
  );
}

export default Title;
