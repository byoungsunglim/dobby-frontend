import React from "react";
import { KakaoLogin } from "./utils/KakaoLogin.js";
import { GoogleLogin } from "./utils/GoogleLogin.js";

import "./assets/css/Login.css";
import google_login_btn from "./assets/icons/google_login_btn.png";
import kakao_login_btn from "./assets/icons/kakao_login_btn.png";

function Login({ login }) {
  return (
    <div id="login">
      <button id="kakao_login_btn" onClick={() => KakaoLogin(login)}>
        <img className="login_btn" src={kakao_login_btn} alt="kakao_login_btn"></img>
      </button>
      <button id="google_login_btn" onClick={() => GoogleLogin(login)}>
        <img className="login_btn" src={google_login_btn} alt="google_login_btn"></img>
      </button>
    </div>
  );
}

export default Login;
