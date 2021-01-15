import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./store/modules"

import "./reset.scss";
import "./common.scss";

import App from "./App";

const store = createStore(rootReducer, composeWithDevTools());
console.log(store.getState());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));