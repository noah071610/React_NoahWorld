import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./scss/style.css";
import App from "./components/App";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./_reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./_saga";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
// compose(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
