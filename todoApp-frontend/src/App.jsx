import React from "react";

import {
  BrowserRouter as Router
  , Redirect
  , Route
  , Switch
} from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
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
          <Route path="/" component={Main} exact />
          <Route path="/login" component={Login} />
          <Route path="/user" component={User} />
          <Redirect to="/" />
        </Switch>
      </>
    </Router>
  )
}

export default App;