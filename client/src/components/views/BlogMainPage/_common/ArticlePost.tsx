import styled from "styled-components";
import dayjs from "dayjs";
import { useHistory } from "react-router";
import { FC } from "react";
import { ArticleInter } from "../types";
dayjs.locale("kor");

const Wrapper = styled.div`
  padding: 0.5rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    h3 {
      font-weight: bold;
    }
  }
  h3 {
    font-weight: normal;
    font-size: 1rem;
  }
  ul {
    margin: 0;
  }
`;

const Title = styled.h3`
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArticlePost: FC<ArticleInter> = ({ article }) => {
  const history = useHistory();
  return (
    <Wrapper
      onClick={() => {
        history.push(`/${article.category}/post/${article.id}`);
        window.scrollTo({ top: 0 });
      }}
    >
      <Title>{article.title}</Title>
      <ul
        style={{
          display: "flex",
          justifyContent: "flex-start",
          fontSize: "0.8rem",
          color: "rgba(0,0,0,0.2)",
        }}
      >
        <li>{dayjs(article.createdAt).format("YYYY.MM.DD")}</li>
      </ul>
    </Wrapper>
  );
};

export default ArticlePost;
