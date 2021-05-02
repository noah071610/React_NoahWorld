/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Divider, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
// @ts-ignore
import { ReactTitle } from "react-meta-tags";
import Slider from "react-slick";
import styled from "styled-components";
import ArticleColumn from "../_common/ArticleColumn";
import { ArrowRightOutlined } from "@ant-design/icons";
import HeaderProfile from "../_common/Profile";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CLASS_POSTS_REQUEST } from "../../../../_reducers/post";
import useToggle from "../../../../_hooks/useToggle";
import { Link } from "react-router-dom";
import { LOAD_INFO_REQUEST } from "../../../../_reducers/user";
import { SmallPoster } from "../_common/SmallSize";
import { MainPoster } from "../_common/Components";
import QuizComponent from "./Section/QuizComponent";
import QuizComponentSmall from "./Section/QuizComponentSmall";
import { RootState } from "src/_reducers";

const ClassLists = styled.div`
  -ms-overflow-style: none;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  height: 330px;
`;

const NextBtn = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0.5rem;
  padding: 0.5rem 0;
  width: 30%;
  background-color: white;
  color: black;
`;

function BlogClassPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const { culturePosts, classPosts, words } = useSelector((state: RootState) => state.post);
  const [wordOpen, onClickWord, setwordOpen] = useToggle(false);
  const [randomWord, setRandomWord] = useState(Math.floor(Math.random() * words?.length));
  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    dispatch({
      type: LOAD_CLASS_POSTS_REQUEST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch({
      type: LOAD_INFO_REQUEST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickNextWord = useCallback(() => {
    let myRandNum = Math.floor(Math.random() * words.length);
    if (myRandNum === randomWord) {
      if (myRandNum === 0) {
        setRandomWord(words.length - 1);
        setwordOpen(false);
        return;
      }
      if (myRandNum === words.length - 1) {
        setRandomWord(0);
        setwordOpen(false);
        return;
      }
      let myNewRandNum = myRandNum + 1;
      setRandomWord(myNewRandNum);
      setwordOpen(false);
      return;
    }
    setRandomWord(myRandNum);
    setwordOpen(false);
  }, [randomWord, setwordOpen, words.length]);

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <ReactTitle title="Noah World - Korean Class" />
      {user && (
        <div style={{ width: "100%", overflowX: "hidden" }}>
          <HeaderProfile />
        </div>
      )}
      <MainPoster />
      <SmallPoster />
      <Row style={{ overflow: "hidden" }}>
        <Col style={{ padding: "1rem" }} md={24} lg={12}>
          <h2 className="blog_class_title">韓国語基礎</h2>
          <ClassLists>
            {classPosts &&
              classPosts.map((v, i) => (
                <div className="blog_class_card" key={i}>
                  <Link
                    onClick={() => window.scrollTo({ top: 0 })}
                    to={`/class/post/${v.id}`}
                    className="blog_class_list"
                    style={{ alignItems: "center" }}
                  >
                    <div style={{ fontSize: "2rem", marginRight: "1rem" }}>0{i + 1}</div>
                    <span
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        height: "0.9rem",
                        WebkitLineClamp: 1,
                        lineHeight: 1.1,
                        wordWrap: "break-word",
                        overflow: "hidden",
                        fontSize: "0.9rem",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {v.title}
                    </span>
                  </Link>
                  <Divider style={{ margin: "0" }} />
                </div>
              ))}
          </ClassLists>
        </Col>
        <Col style={{ padding: "1rem" }} xs={24} lg={12}>
          <h2 className="blog_class_title">韓国語単語</h2>
          <div
            style={{
              background: `url('/images/blog/class_memo.jpg') no-repeat center`,
              width: "100%",
            }}
            className="blog_word_div"
          >
            <h3 style={{ fontSize: "1.2rem", textAlign: "center", marginBottom: "2rem" }}>
              {words[randomWord]?.question}
            </h3>
            <h4
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                textAlign: "center",
                lineHeight: "2.3",
                width: "400px",
              }}
            >
              <span
                style={{
                  backgroundColor: wordOpen ? "none" : "#cccccc",
                  color: wordOpen ? "black" : "#cccccc",
                }}
                onClick={onClickWord}
                className="blog_class_imadoki_contents"
              >
                {words[randomWord]?.answer}
              </span>
            </h4>
            <NextBtn onClick={onClickNextWord} className="public_btn">
              次の単語 <ArrowRightOutlined />
            </NextBtn>
          </div>
          <div className="word_small">
            <h3>{words[randomWord]?.question}</h3>
            <div>
              <span
                style={{
                  backgroundColor: wordOpen ? "none" : "#cccccc",
                  color: wordOpen ? "black" : "#cccccc",
                }}
                onClick={onClickWord}
                className="blog_class_imadoki_contents"
              >
                {words[randomWord]?.answer}
              </span>
            </div>
            <button
              style={{ width: "50%", marginTop: "1.5rem" }}
              onClick={onClickNextWord}
              className="public_btn"
            >
              次の単語 <ArrowRightOutlined />
            </button>
          </div>
        </Col>
        <Col span={24} style={{ marginTop: "2rem" }}>
          <h2 style={{ paddingLeft: "1rem" }} className="blog_class_title">
            日韓の文化
          </h2>
          <div style={{ marginBottom: "3rem" }}>
            <Slider {...settings}>
              {culturePosts.map((v, i) => (
                <ArticleColumn key={i} article={v} />
              ))}
            </Slider>
          </div>
        </Col>
        <Col span={24} style={{ marginTop: "2rem" }}>
          <h2 style={{ paddingLeft: "1rem" }} className="blog_class_title">
            韓国語会話
          </h2>
          <QuizComponent />
          <QuizComponentSmall />
        </Col>
      </Row>
    </div>
  );
}

export default BlogClassPage;
