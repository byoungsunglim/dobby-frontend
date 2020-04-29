import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Landing from "./Landing";
import Login from "./Login";
import Home from "./Home";
import Document from "./Document";

import "./assets/css/App.css";
import { queryDB } from "./utils/queryDB";

function App() {
  const [cookies, setCookie] = useCookies(['auth', 'user']);
  const [auth, setAuth] = useState(cookies.user && cookies.auth);
  const [user, setUser] = useState(cookies.user);

  useEffect(() => {
    console.log("App Mounted...", cookies, auth, user);
    if (user) {
      const { nickname, profile_image, email, loggedIn } = user;
      let delta = new Date() - new Date(loggedIn);
      if (delta / 1000 < 86400) {
        if (nickname.length > 0 && profile_image.length > 0 && email.length > 0) {
          user.loggedIn = new Date();
          queryDB("set", "user", email, user);
          setCookie('auth', true);
          setCookie('user', user);
          setAuth(true);
        }
      }
      else {
        setCookie('auth', false);
        setAuth(false);
      }
    }
    else {
      setCookie('auth', false);
      setAuth(false);
    }
  }, [user])

  function login(user) {
    user.loggedIn = new Date();
    setUser(user);
  }

  function logout() {
    setAuth(false);
  }

  function PrivateRoute({ path, component, location, ...rest }) {
    if (auth) {
      return <Route to={path} component={component} {...rest}/>
    }
    else {
      return <Redirect to={{pathname: "/login", state: { from: location }}}/>
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {auth ? <Home user={user}/> 
          : <Landing login={login} logout={logout}/>}
        </Route>
        <Route exact path="/login">
          <Login login={login} logout={logout}/>
        </Route>
        <PrivateRoute path="/doc/:id" component={Document}>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
