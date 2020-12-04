import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import Login from "./pages/Login";

if (sessionStorage.getItem("xAuthToken")) {
  ReactDOM.render(<App />, document.getElementById("root"));
} else {
  ReactDOM.render(<Login />, document.getElementById("root"));
}