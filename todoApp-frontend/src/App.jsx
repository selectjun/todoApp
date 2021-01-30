import React from "react";

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
import Find from "./pages/Find";

const App = ()=> {
  return(
    <Router>
        <>
          <Switch>
            <Route path="/todo" component={MainContainer} />
            <Route path="/login" component={Login} />
            <Route path="/join" component={Join} />
            <Route path="/user" component={User} />
            <Route path="/find/:target" component={Find} />
            { 
              sessionStorage.getItem("xAuthToken")
              ? <Redirect to="/todo" />
              : <Redirect to="/login" />
            }
          </Switch>
        </>
    </Router>
  )
}

export default App;