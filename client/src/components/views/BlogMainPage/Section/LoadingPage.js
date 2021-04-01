import React from "react";

function LoadingPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        paddingTop: "7rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="bouncer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingPage;
