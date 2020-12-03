import React from "react";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import Main from "./pages/Main";

const App = ()=> {
  return(
    <Router>
      <Switch>
        <Route path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App;