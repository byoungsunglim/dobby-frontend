import React, { useState } from "react";

import Registration from "./Registration";
import Login from "./Login";

import brand from "../utils/brand";
import "../assets/css/Landing.scss";

function Landing({ login, logout }) {
  const [view, setView] = useState("registration");

  return (
    <div id="landing">
      <div id="landing_container">
        <img id="logo" src={brand.Logo} />
        <span id="line_1">
          문서작업,
        </span>
        <span id="line_2">
          이제 빠르고 쉽고 예쁘게
        </span>
        <span id="line_3">
          뚝-딱!
        </span>
        <img id="character" src={brand.Character} />
      </div>
      {view === "registration" ? (
        <Registration login={login} logout={logout} setView={setView} />
      ) : (
        <Login login={login} logout={logout} setView={setView} />
      )}
    </div>
  );
}

export default Landing;
