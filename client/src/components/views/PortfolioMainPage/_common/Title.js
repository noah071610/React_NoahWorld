import React from "react";
import DividerLeftPoint from "./DividerLeftPoint";

function Title(props) {
  return (
    <>
      <h2 style={{ margin: 0, padding: "1.5rem 0 0.5rem 0" }}>{props.title}</h2>
      <DividerLeftPoint />
      <h2 style={{ margin: "0.5rem 0 3rem 0" }}>{props.sub}</h2>
    </>
  );
}

export default Title;
