/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Divider, Input, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import ArticleColumn from "../_common/ArticleColumn";
import { ArrowRightOutlined, EnterOutlined } from "@ant-design/icons";
import HeaderProfile from "../_common/Profile";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CLASS_POSTS_REQUEST } from "../../../../_reducers/post";
import useToggle from "../../../../_hooks/useToggle";
import { Link } from "react-router-dom";
import { LOAD_INFO_REQUEST } from "../../../../_reducers/user";
import useInput from "../../../../_hooks/useInput";
import { SmallPoster } from "../_common/SmallSize";
import { MainPoster } from "../_common/Components";

const KakaoContent = styled.div`
  font-size: 0.9rem;
  padding: 0.3rem 0.5rem;
  background-color: ${(props) => (props.whiteType ? "rgb(235, 235, 235)" : "#ffe941")};
  border-radius: 3px;
  margin-bottom: 1rem;
  width: 100%;
  height: 80px;
  position: relative;
  word-break: break-all;
  -ms-overflow-style: none;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ClassLists = styled.div`
  -ms-overflow-style: none;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  height: 330px;
`;
const ContentTailQuestion = styled.div`
  position: absolute;
  left: -5px;
  transform: rotateZ(45deg);
  top: 10px;
  width: 9px;
  height: 9px;
  background-color: #ffe941;
  content: "";
`;
const ContentTailAnswer = styled.div`
  position: absolute;
  right: -0.35rem;
  transform: rotateZ(45deg);
  bottom: 4rem;
  z-index: 1;
  width: 9px;
  height: 9px;
  background-color: rgb(235, 235, 235);
  content: "";
`;
const QuizContent = styled.div`
  width: 250px;
  height: 180px;
  position: absolute;
  right: 4rem;
  bottom: 4.2rem;
`;

const NextBtn = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0.5rem;
  width: 30%;
  background-color: white;
  color: black;
`;

function BlogClassPage() {
  const { user } = useSelector((state) => state.user);
  const { culturePosts, classPosts, quizzes, words } = useSelector((state) => state.post);
  const [wordOpen, onClickWord, setwordOpen] = useToggle(false);
  const [quizAnswer, onChangeQuizAnswer, setQuizAnswer] = useInput("");
  const [viewQuizAnswer, setViewQuizAnswer] = useState(false);
  const [randomWord, setRandomWord] = useState(Math.floor(Math.random() * words?.length));
  const [randomQuiz, setRandomQuiz] = useState(Math.floor(Math.random() * quizzes?.length));
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

  const onClickNextWord = () => {
    let a = Math.floor(Math.random() * words.length);
    if (a === randomWord) {
      if (a === 0) {
        setRandomWord(words.length - 1);
        setwordOpen(false);
        return;
      }
      if (a === words.length - 1) {
        setRandomWord(0);
        setwordOpen(false);
        return;
      }
      let b = a + 1;
      setRandomWord(b);
      setwordOpen(false);
      return;
    }
    setRandomWord(a);
    setwordOpen(false);
  };

  const onClickNextQuiz = () => {
    let myRandNum = Math.floor(Math.random() * quizzes.length);
    if (myRandNum === randomQuiz) {
      if (myRandNum === quizzes.length - 1) {
        setRandomQuiz(0);
        setViewQuizAnswer(false);
        setQuizAnswer("");
        return;
      }
      let myNewRandNum = myRandNum + 1;
      setRandomQuiz(myNewRandNum);
      setViewQuizAnswer(false);
      setQuizAnswer("");
      return;
    }
    setRandomQuiz(myRandNum);
    setViewQuizAnswer(false);
    setQuizAnswer("");
  };

  const onClickQuizSubmit = () => {
    if (quizAnswer === "") {
      message.error("答えを書いてくださいね！");
      return;
    }
    setViewQuizAnswer(true);
  };
  return (
    <>
      {user && <HeaderProfile />}
      <MainPoster />
      <SmallPoster />
      <Row>
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
                  >
                    <div style={{ fontSize: "2rem", marginRight: "1rem" }}>0{i + 1}</div>
                    <span style={{ fontSize: "1.2rem", display: "flex", alignItems: "center" }}>
                      {v.title}
                    </span>
                  </Link>
                  <Divider style={{ margin: "0" }} />
                </div>
              ))}
          </ClassLists>
        </Col>
        <Col style={{ padding: "1rem" }} xs={24} lg={12}>
          <h2 className="blog_class_title">韓国語今どき</h2>
          <div
            style={{
              background: `url('/images/blog/class_memo.jpg') no-repeat top`,
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
        </Col>
        <Col span={24} style={{ marginTop: "2rem" }}>
          <h2 style={{ paddingLeft: "1rem" }} className="blog_class_title">
            日韓の文化
          </h2>
          <Slider style={{ marginBottom: "3rem" }} {...settings}>
            {culturePosts.map((v, i) => (
              <ArticleColumn key={i} article={v} />
            ))}
          </Slider>
        </Col>
        <Col span={24} style={{ marginTop: "2rem" }}>
          <h2 style={{ paddingLeft: "1rem" }} className="blog_class_title">
            韓国語会話
          </h2>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              height: "500px",
              background: `url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80') no-repeat bottom fixed`,
              backgroundSize: "cover",
            }}
          >
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="550"
              style={{
                width: "420px",
                height: "100%",
                position: "absolute",
                right: "1rem",
                bottom: "0",
                background: `url('/images/blog/kakao.png') no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <QuizContent>
                <ContentTailQuestion />
                <KakaoContent whiteType={false}>
                  {viewQuizAnswer ? quizzes[randomQuiz]?.answer : quizzes[randomQuiz]?.question}
                </KakaoContent>
                {viewQuizAnswer ? (
                  <>
                    <ContentTailAnswer />
                    <KakaoContent whiteType={true}>
                      貴方の答え：{quizAnswer}
                      <br />
                      <button
                        className="public_btn"
                        onClick={onClickNextQuiz}
                        style={{
                          marginTop: "0.5rem",
                          fontSize: "0.8rem",
                          padding: "0.2rem 0.8rem",
                          float: "right",
                        }}
                      >
                        次のクイズ
                        <ArrowRightOutlined />
                      </button>
                    </KakaoContent>
                  </>
                ) : null}
              </QuizContent>
              <div
                style={{
                  width: "320px",
                  position: "absolute",
                  right: "3.5rem",
                  bottom: "0.8rem",
                }}
              >
                <Input
                  style={{
                    width: "300px",
                  }}
                  value={quizAnswer}
                  disabled={viewQuizAnswer ? true : false}
                  onChange={onChangeQuizAnswer}
                  placeholder="翻訳してくれ！"
                  bordered={false}
                  onPressEnter={onClickQuizSubmit}
                />
                <a>
                  <EnterOutlined
                    onClick={onClickQuizSubmit}
                    style={{ color: "#CABFCC", fontSize: "1.2rem" }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="space" />
        </Col>
      </Row>
    </>
  );
}

export default BlogClassPage;
