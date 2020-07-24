import React from "react";

import Registration from "./Registration";
import Login from "./Login";

import brand from "../utils/brand";
import "../assets/css/Landing.css";

function Landing({ login, logout }) {
  return (
    <div id="landing">
      <img id="logo" src={brand.Logo}/>
      <div id="intro">
        <span className="msg" id="line_1">
            문서작업,
        </span>
        <span className="msg" id="line_2">
            이제 빠르고 쉽고 예쁘게
        </span>
        <span className="msg" id="line_3">
            뚝-딱!
        </span>
      </div>
      <img id="character" src={brand.Character}/>
      <Registration />
      {/* <Login login={login} logout={logout}/> */}
    </div>
  );
}

export default Landing;
