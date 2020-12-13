import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./store/modules"

import "./reset.scss";
import "./common.scss";

import App from "./App";
import Login from "./pages/Login";

const store = createStore(rootReducer);
console.log(store.getState());

if (sessionStorage.getItem("xAuthToken")) {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
} else {
  ReactDOM.render(<Provider store={store}><Login /></Provider>, document.getElementById("root"));
}