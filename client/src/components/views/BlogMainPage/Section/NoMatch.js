/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router";

function NoMatch() {
  const history = useHistory();
  return (
    <div style={{ width: "100%", height: "80vh", paddingTop: "7rem" }}>
      <h1 style={{ fontSize: "2rem", textAlign: "center" }}>
        Oops!! "{history.location.pathname}" which isn't a registered route.{" "}
        <img alt="not_found_img" src="https://img.icons8.com/officel/80/000000/crying-baby.png" />
      </h1>
      <br />
      <h2 style={{ textAlign: "center" }}>
        You can{" "}
        <a style={{ fontSize: "1.5rem", margin: "0 1rem" }} onClick={() => history.goBack()}>
          go back↩️
        </a>{" "}
        to the page wheere you come.
      </h2>
    </div>
  );
}

export default NoMatch;
