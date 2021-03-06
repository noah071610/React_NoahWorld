import { Col, Divider, Row } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "src/_reducers";
import styled from "styled-components";
import { BLUE_COLOR } from "../../../config";

const ClassMainPoster = styled.section`
  box-shadow: 4px 8px 10px 0px rgba(0, 0, 0, 0.15);
  background: linear-gradient(180deg, rgba(251, 255, 253, 1) 15%, rgba(226, 150, 153, 0.8) 100%);
  width: 100%;
  paddingtop: 3rem;
  margin: 3rem 0;
  height: 100%;
`;

const RecentTable = styled(Col)`
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    h2 {
      color: ${BLUE_COLOR};
    }
  }
`;
const WelcomeTableWrapper = styled(Col)`
  text-align: center;
  padding-right: 1rem;
  position: relative;
`;

interface VisibleProps {
  visible: Boolean;
}

export function MainPoster() {
  return (
    <ClassMainPoster className="blog_class_poster">
      <img
        data-aos="fade-right"
        alt="class_poster_girl"
        src="/images/blog/class_study.png"
        className="blog_class_poster_girl"
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <h2
          style={{ paddingLeft: "0.5rem", display: "flex", alignItems: "center" }}
          className="blog_class_poster_title"
        >
          楽しく始まる韓国語教室
          <img
            alt="class_poster_flag"
            style={{ width: "3rem", marginLeft: "0.5rem" }}
            src="https://img.icons8.com/plasticine/100/000000/south-korea.png"
          />
        </h2>
        <img
          className="blog_class_poster_cha"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="500"
          alt="class_intro_cha"
          src="./images/blog/logo_cha.png"
        />
        <img
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="700"
          alt="class_intro_text"
          style={{ width: "70%" }}
          src="./images/blog/kankokugo.png"
        />
      </div>
    </ClassMainPoster>
  );
}

export const RecentTableComment: FC<VisibleProps> = ({ visible }) => {
  const history = useHistory();
  const { recentCommentPost } = useSelector((state: RootState) => state.post);
  return (
    <RecentTable style={{ paddingLeft: "1rem" }} xs={visible ? 24 : 0} sm={8} lg={6}>
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>Recent Comment 📝</h2>
      <Divider />
      {/* length Check */}
      {recentCommentPost?.Comments ? (
        <div
          onClick={() =>
            history.push(`/${recentCommentPost?.category}/post/${recentCommentPost?.id}`)
          }
        >
          <h3 style={{ margin: "1rem 0" }}>
            · Post Number:{" "}
            <span style={{ color: BLUE_COLOR, marginLeft: "0.3rem" }}>{recentCommentPost?.id}</span>{" "}
          </h3>
          <h3 style={{ margin: "1rem 0" }}>
            · Post Title: <br />
          </h3>
          <span
            style={{
              whiteSpace: "nowrap",
              display: "inline-block",
              marginLeft: "0.5rem",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {recentCommentPost?.title}
          </span>
          <h3 style={{ margin: "1rem 0" }}>
            · Your comment:
            <br />
          </h3>
          <span
            style={{
              whiteSpace: "nowrap",
              display: "inline-block",
              marginLeft: "0.5rem",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {recentCommentPost?.Comments[0]?.content}
          </span>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            opacity: "0.3",
          }}
        >
          <img
            style={{ width: "100px" }}
            alt="noPost"
            src="https://icons.iconarchive.com/icons/iconsmind/outline/256/Inbox-Empty-icon.png"
          />
          <h4>No Post</h4>
        </div>
      )}
    </RecentTable>
  );
};

export const RecentTableView: FC<VisibleProps> = ({ visible }) => {
  const history = useHistory();
  const { recentViewPost } = useSelector((state: RootState) => state.post);
  return (
    <RecentTable style={{ padding: "0 1rem" }} xs={visible ? 24 : 0} sm={8} lg={6}>
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>Recent View 👁️‍🗨️ </h2>
      <Divider />
      {recentViewPost ? (
        <div
          onClick={() => history.push(`/${recentViewPost?.category}/post/${recentViewPost?.id}`)}
        >
          <h3 style={{ margin: "1rem 0" }}>
            · Post Number:{" "}
            <span style={{ color: BLUE_COLOR, marginLeft: "0.3rem" }}>{recentViewPost?.id}</span>
          </h3>
          <h3 style={{ margin: "1rem 0" }}>
            · Post Title: <br />
          </h3>
          <span
            style={{
              whiteSpace: "nowrap",
              display: "inline-block",
              marginLeft: "0.5rem",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {recentViewPost?.title}
          </span>
          <h3 style={{ margin: "1rem 0" }}>
            · Total Post Views:
            <span style={{ color: BLUE_COLOR, marginLeft: "0.3rem" }}>{recentViewPost?.hit}</span>
          </h3>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            opacity: "0.3",
          }}
        >
          <img
            style={{ width: "100px" }}
            alt="noPost"
            src="https://icons.iconarchive.com/icons/iconsmind/outline/256/Inbox-Empty-icon.png"
          />
          <h4>No Post</h4>
        </div>
      )}
    </RecentTable>
  );
};

export const WelcomeTable: FC<VisibleProps> = ({ visible }) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <WelcomeTableWrapper xs={visible ? 24 : 0} sm={8} lg={6}>
      <h2 style={{ margin: "1rem 0" }}>
        Welcome&nbsp;
        {user && user.name}&nbsp;😄
      </h2>
      <Divider />
      <Row style={{ margin: "2rem 0" }}>
        <Col style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }} span={8}>
          <h4 style={{ fontSize: "0.85rem" }}>Comments</h4>
          <h4 style={{ margin: "0.5rem 0", fontSize: "1rem", color: BLUE_COLOR }}>
            {user?.Comments ? user.Comments.length : 0}
          </h4>
        </Col>
        <Col style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }} span={8}>
          <h4 style={{ fontSize: "0.85rem" }}>Likes</h4>
          <h4 style={{ margin: "0.5rem 0", fontSize: "1rem", color: BLUE_COLOR }}>
            {user?.PostLiked ? user.PostLiked.length : 0}
          </h4>
        </Col>
        <Col span={8}>
          <h4 style={{ fontSize: "0.85rem" }}>Posts</h4>
          <h4 style={{ margin: "0.5rem 0", fontSize: "1rem", color: BLUE_COLOR }}>
            {user?.Posts ? user.Posts.length : 0}
          </h4>
        </Col>
      </Row>
      {user?.id === 1 && user.admin && (
        <Link style={{ padding: "1rem 0" }} to="/admin">
          Administor Here!
        </Link>
      )}
    </WelcomeTableWrapper>
  );
};
