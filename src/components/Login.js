import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

import Checkbox from "./Checkbox";
import tools from "../utils/tools";

import { kakaoLogin } from "../utils/kakaoLogin";
import { googleLogin } from "../utils/googleLogin";

import "../assets/css/Login.css";

function Login({ login, logout, setView }) {
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
      <span id="title">로그인</span>
      <Link id="to_registration" onClick={() => setView("registration")}>신규계정으로 가입</Link>
      <div className="login_form" id="email">
        <input placeholder="이메일"></input>
      </div>
      <div className="login_form" id="password">
        <input placeholder="비밀번호"></input>
      </div>
      <div id="terms">
        <Checkbox/>
        <span style={{marginLeft: '34px'}}>향후 </span>
        <Link id="autologin" to="/autologin">자동로그인</Link>
        <span>합니다.</span>
        <Link id="forgot" to="/forgot">비밀번호를 잊으셨나요?</Link>
      </div>
      <button id="submit">로그인</button>
      <div id="others">
        <button id="google_login_btn" onClick={() => {handleLogin('google')}}>
          <div style={{width: '200px', height: '50px', display: 'flex', alignItems: 'center'}}>
            <img src={tools.Google}/>
            <span>구글로 로그인</span>
          </div>
        </button>
        <button id="kakao_login_btn" onClick={() => {handleLogin('kakao')}}>
          <div style={{width: '200px', height: '50px', display: 'flex', alignItems: 'center'}}>
            <img src={tools.Kakao}/>
            <span>카카오톡으로 로그인</span>
          </div>
        </button>
      </div>
      <span id="rights">© Docabi Co.,Ltd. All rights reserved</span>
    </div>
  );
}

export default Login;
