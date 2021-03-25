import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PortfolioMainPage from "./views/PortfolioMainPage/PortfolioMainPage";
import { createGlobalStyle } from "styled-components";
import PortfolioPostPage from "./views/PortfolioMainPage/PortfolioSection/PortfolioPostPage";
import AOS from "aos";
import "aos/dist/aos.css";
import "antd/dist/antd.css";
import BlogMainPage from "./views/BlogMainPage/BlogMainPage";
import BlogCategoryPage from "./views/BlogMainPage/BlogCategoryPage/BlogCategoryPage";
import BlogPostPage from "./views/BlogMainPage/BlogPostPage/BlogPostPage";
import BlogClassPage from "./views/BlogMainPage/BlogClassPage/BlogClassPage";
import PageWrapper from "./views/BlogMainPage/_common/PageWrapper";
import BlogLoginPage from "./views/BlogMainPage/BlogLoginPage/BlogLoginPage";
import BlogAboutPage from "./views/BlogMainPage/BlogAboutPage";
import Admin from "./views/BlogMainPage/_common/Admin";

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "highlight.js/styles/github.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "tui-color-picker/dist/tui-color-picker.css";
import BlogSearchPage from "./views/BlogMainPage/BlogSearchPage/BlogSearchPage";
import BlogHashtagPage from "./views/BlogMainPage/BlogSearchPage/BlogHashtagPage";

const GlobalStyles = createGlobalStyle`

.ant-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.ant-table-pagination{
  display:none !important;
}

p{
  margin:0.5rem auto;
}
h1,
h2,
h3 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
h2{
  font-size:1.1rem;
}

a {
  color: black;
  text-decoration: none;
}

blockquote {
  border-color:#1187CF !important;
}

.ant-divider{
  background-color:rgba(0,0,0,0.1);
}
.ant-divider-with-text{
  background-color:rgba(0,0,0,0);
  &::before, &::after{
    border-top:1px solid rgba(0,0,0,0.1) !important;
  }
}

`;

const App = () => {
  AOS.init({ offset: 120 });
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Suspense fallback={<div>Loading...</div>}>
          <PageWrapper>
            <Route exact path="/" component={BlogMainPage} />
            <Route exact path="/aboutme" component={BlogAboutPage} />
            <Route exact path="/tech" component={BlogCategoryPage} />
            <Route exact path="/daily" component={BlogCategoryPage} />
            <Route exact path="/class" component={BlogClassPage} />
            <Route exact path="/search/:keyword" component={BlogSearchPage} />
            <Route exact path="/hashtag/:keyword" component={BlogHashtagPage} />
            <Route exact path="/login" component={BlogLoginPage} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/:category/post/:id" component={BlogPostPage} />
            <Route exact path="/portfolio" component={PortfolioMainPage} />
            <Route exact path="/portfolio/:id" component={PortfolioPostPage} />
          </PageWrapper>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
