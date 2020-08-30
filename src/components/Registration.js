import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

import { kakaoLogin } from "../utils/kakaoLogin";
import { googleLogin } from "../utils/googleLogin";

import Checkbox from "./Checkbox";

import tools from "../utils/tools";

import "../assets/css/Registration.scss";

function Registration({ login, logout, setView }) {
  const [selected, setSelected] = useState(false);

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
    <div id="registration">
      <div id="registration_container">
        <span id="registration_title">계정생성</span>
        <Link id="to_login" onClick={() => setView("login")}>
          기존계정으로 로그인
        </Link>
        <div id="registration_form">
          <div className="registration_input_container">
            <input id="last_name" placeholder="성" />
          </div>
          <div className="registration_input_container">
            <input id="first_name" placeholder="이름" />
          </div>
          <div className="registration_input_container">
            <input id="email" placeholder="이메일" />
          </div>
          <div className="registration_input_container">
            <input id="password" placeholder="비밀번호" />
          </div>
          <span id="recaptcha">
            해당페이지는 reCAPTCHA 시스템에 의해 보안되고 있으며, 구글의
            개인정보보호 원칙을 준수합니다.
          </span>
          <div id="registration_terms">
            <Checkbox />
            <span>
              Docgabi의{" "}
              <Link id="to_terms" to="/terms">
                이용조건
              </Link>
              에 동의합니다
            </span>
          </div>
          <button className="submit">회원가입</button>
        </div>
        <div id="signin_with_others">
          <button id="google_register_btn" onClick={() => handleLogin("google")}>
            <div>
              <img src={tools.Google} />
              <span>구글로 회원가입</span>
            </div>
          </button>
          <button id="kakao_register_btn" onClick={() => handleLogin("kakao")}>
            <div>
              <img src={tools.Kakao} />
              <span>카카오톡으로 회원가입</span>
            </div>
          </button>
        </div>
        <span className="rights">© Docabi Co.,Ltd. All rights reserved</span>
      </div>
    </div>
  );
}

export default Registration;
