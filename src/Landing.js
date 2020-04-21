import React from "react";

import Login from "./Login.js";
import "./assets/css/Landing.css";

function Landing({ login, logout }) {
  return (
    <div className="landing">
      <Login login={login} logout={logout}/>
    </div>
  );
}

export default Landing;
