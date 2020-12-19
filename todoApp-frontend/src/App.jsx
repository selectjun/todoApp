import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router
  , Redirect
  , Route
  , Switch
} from "react-router-dom";

import MainContainer from "./containers/MainContainer";
import Login from "./pages/Login";
import Join from "./pages/Join";
import User from "./pages/User";

import Header from "./components/Header"

const App = ()=> {
  const renderRoute = (Component) => {
    return (props) => {
      const newProps = {
        ...props,
      };
      return <Component {...newProps} />;
    };
  };

  return(
    <Router>
        <Header />
        <>
          <Switch>
            <Route path="/" component={MainContainer} exact />
            <Route path="/login" component={Login} />
            <Route path="/join" component={Join} />
            <Route path="/user" component={User} />
          </Switch>
        </>
    </Router>
  )
}

export default App;