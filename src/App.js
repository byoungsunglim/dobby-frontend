import React, { userState, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Landing from "./Landing.js";
import Home from "./Home.js";

import "./assets/css/App.css";

function App() {
  const [cookies, setCookie] = useCookies(['user', 'authenticated', 'lastUpdate']);
  const [user, setUser] = useState(cookies.user || null);

  useEffect(() => {
    console.log(new Date(), cookies);
    let delta = new Date() - new Date(cookies.lastUpdate);
    if (cookies.authenticated && cookies.user && delta / 1000 < 86400) {
      setCookie('authenticated', true);
    }
  }, [])

  function login(user) {
    setUser(user);
    setCookie('user', user);
    setCookie('authenticated', true);
    setCookie('lastUpdate', new Date());
  }

  function logout() {
    setCookie('authenticated', false);
  }

  // render() {
    return (
      <div id="docgabi">
        {cookies.authenticated ? <Home user={user}/> : <Landing login={login} logout={logout}/>}
      </div>
    );
  // }
}

export default App;
