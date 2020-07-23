import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { kakaoLogin } from "../utils/kakaoLogin";
import { googleLogin } from "../utils/googleLogin";

import "../assets/css/Login.css";

function Login({ login, logout }) {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  function handleLogin(provider) {
    if (provider === 'kakao') {
      kakaoLogin(login).then((user) => {
        history.replace(from);
      });
    }
    else if (provider === 'google') {
      googleLogin(login).then((user) => {
        history.replace(from);
      });
    }
  }

  return (
    <div id="login">
      <button className="login_btn" id="kakao_login_btn" onClick={() => {handleLogin('kakao')}}>
        {/* <img className="login_btn" src={kakao_login_btn} alt="kakao_login_btn"></img> */}
        카카오 로그인
      </button>
      <button className="login_btn" id="google_login_btn" onClick={() => {handleLogin('google')}}>
        {/* <img className="login_btn" src={google_login_btn} alt="google_login_btn"></img> */}
        구글 로그인
      </button>
    </div>
  );
}

export default Login;
