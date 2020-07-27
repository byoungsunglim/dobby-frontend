import React, { useState } from "react";
import { Link } from "react-router-dom";

import Checkbox from "./Checkbox";

import tools from "../utils/tools";

import "../assets/css/Registration.css";

function Registration({ login, logout, setView }) {
  const [selected, setSelected] = useState(false);

  return (
    <div id="registration">
      <span id="title">계정생성</span>
      <Link id="to_login" onClick={() => setView("login")}>기존계정으로 로그인</Link>
      <div className="registration_form" id="last_name">
        <input placeholder="성"></input>
      </div>
      <div className="registration_form" id="first_name">
        <input placeholder="이름"></input>
      </div>
      <div className="registration_form" id="email">
        <input placeholder="이메일"></input>
      </div>
      <div className="registration_form" id="password">
        <input placeholder="비밀번호"></input>
      </div>
      <span id="recaptcha">해당페이지는 reCAPTCHA 시스템에 의해 보안되고 있으며, 구글의 개인정보보호 원칙을 준수합니다.</span>
      <div id="terms">
        <Checkbox/>
        <span style={{marginLeft: '34px'}}>Docgabi의 </span>
        <Link id="to_terms" to="/terms">이용조건</Link>
        <span>에 동의합니다.</span>
      </div>
      <button id="submit">회원가입</button>
      <div id="others">
        <div id="google_register_btn">
          <img src={tools.Google}/>
          <span>구글로 회원가입</span>
        </div>
        <div id="kakao_register_btn">
          <img src={tools.Kakao}/>
          <span>카카오톡으로 회원가입</span>
        </div>
      </div>
      <span id="rights">© Docabi Co.,Ltd. All rights reserved</span>
    </div>
  );
}

export default Registration;
