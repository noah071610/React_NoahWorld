import React from "react";
import { BLUE_COLOR } from "../../../config";
import CountUp from "react-countup";
import { Divider } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SearchList = styled.li`
  transition: all 0.3s;
  font-size: 1rem;
  cursor: pointer;
  padding: 2rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  width: 100%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

function BlogSearchPage() {
  const { searchedKeyword, searchPosts } = useSelector((state) => state.blog);
  const history = useHistory();
  const searchPostsComponent = () => {
    return searchPosts?.map((v, i) => {
      const contentWithoutHTML = v.content.replace(/(<([^>]+)>)/gi, "");
      return (
        <SearchList onClick={() => history.push(`/${v.category}/post/${v.id}`)} key={i}>
          <span style={{ fontWeight: "bold" }}>Post Number</span> :{" "}
          <span style={{ color: BLUE_COLOR }}>{v.id}</span> <Divider type="vertical" />
          <span style={{ fontWeight: "bold" }}>Title</span> : {v.title} <Divider type="vertical" />
          <span style={{ fontWeight: "bold" }}>Category</span> : {v.category}{" "}
          <Divider type="vertical" />
          <span style={{ fontWeight: "bold" }}>Contents</span> :{contentWithoutHTML.slice(0, 50)}
        </SearchList>
      );
    });
  };
  return (
    <>
      <h2 className="search_title">
        SEARCH POSTS <br className="br_search" />
        <span style={{ color: BLUE_COLOR }}>"{searchedKeyword && searchedKeyword}"</span>
        <span style={{ color: BLUE_COLOR, margin: "0 1rem", fontSize: "1.2rem" }}>
          +&nbsp;
          <CountUp duration={4} start={0} end={searchPosts?.length || 0} />
          &nbsp;posts searched
        </span>
      </h2>
      <Divider style={{ marginBottom: 0 }} />
      <ul style={{ margin: 0 }}>
        {searchPosts?.length > 0 ? (
          searchPostsComponent()
        ) : (
          <div
            style={{
              width: "100%",
              padding: "1rem 0",
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "80px", opacity: "0.3" }}
              alt="noComment"
              src="https://icons.iconarchive.com/icons/iconsmind/outline/256/Inbox-Empty-icon.png"
            />
            <h3>Couldn't find posts with your keyword.</h3>
          </div>
        )}
      </ul>
      <div style={{ height: "22rem" }} />
    </>
  );
}

export default BlogSearchPage;
