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

const App = ()=> {
  return(
    <Router>
        <>
          <Switch>
            <Route path="/todo" component={MainContainer} />
            <Route path="/login" component={Login} />
            <Route path="/join" component={Join} />
            <Route path="/user" component={User} />
          </Switch>
        </>
    </Router>
  )
}

export default App;