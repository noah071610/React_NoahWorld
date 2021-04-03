import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./scss/style.css";
import App from "./components/App";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./_reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./_saga";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
