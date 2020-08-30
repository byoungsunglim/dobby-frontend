import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

import Checkbox from "./Checkbox";
import tools from "../utils/tools";

import { kakaoLogin } from "../utils/kakaoLogin";
import { googleLogin } from "../utils/googleLogin";

import "../assets/css/Login.scss";

function Login({ login, logout, setView }) {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  function handleLogin(provider) {
    if (provider === "kakao") {
      kakaoLogin(login).then((user) => {
        history.replace(from);
      });
    } else if (provider === "google") {
      googleLogin(login).then((user) => {
        history.replace(from);
      });
    }
  }

  return (
    <div id="login">
      <div id="login_container">
        <span id="login_title">로그인</span>
        <Link id="to_registration" onClick={() => setView("registration")}>
          신규계정으로 가입
        </Link>
        <div id="login_form">
          <div className="login_input_container">
            <input id="email" placeholder="이메일" />
          </div>
          <div className="login_input_container">
            <input id="password" placeholder="비밀번호" />
          </div>
          <div id="login_terms">
            <Checkbox />
            <span>
              향후&nbsp;
              <Link id="autologin" to="/autologin">
                자동로그인
              </Link>
              합니다.
            </span>
            <Link id="forgot" to="/forgot">
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <button className="submit">로그인</button>
        </div>
        <div id="login_with_others">
          <button id="google_login_btn" onClick={() => handleLogin("google")}>
            <div>
              <img src={tools.Google} />
              <span>구글로 로그인</span>
            </div>
          </button>
          <button id="kakao_login_btn" onClick={() => handleLogin("kakao")}>
            <div>
              <img src={tools.Kakao} />
              <span>카카오톡으로 로그인</span>
            </div>
          </button>
        </div>
        <span className="rights">© Docabi Co.,Ltd. All rights reserved</span>
      </div>
    </div>
  );
}

export default Login;
