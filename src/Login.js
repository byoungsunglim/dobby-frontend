import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { KakaoLogin } from "./utils/KakaoLogin";
import { GoogleLogin } from "./utils/GoogleLogin";

import "./assets/css/Login.css";
import google_login_btn from "./assets/icons/google_login_btn.png";
import kakao_login_btn from "./assets/icons/kakao_login_btn.png";

function Login({ login, logout }) {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  function handleLogin(provider) {
    if (provider === 'kakao') {
      KakaoLogin(login).then((user) => {
        history.replace(from);
      });
    }
    else if (provider === 'google') {
      GoogleLogin(login).then((user) => {
        history.replace(from);
      });
    }
  }

  return (
    <div id="login">
      <button id="kakao_login_btn" onClick={() => {handleLogin('kakao')}}>
        <img className="login_btn" src={kakao_login_btn} alt="kakao_login_btn"></img>
      </button>
      <button id="google_login_btn" onClick={() => {handleLogin('google')}}>
        <img className="login_btn" src={google_login_btn} alt="google_login_btn"></img>
      </button>
    </div>
  );
}

export default Login;
