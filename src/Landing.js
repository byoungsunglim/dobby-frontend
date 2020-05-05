import React from "react";

import Login from "./Login";
import brand from "./utils/brand";
import "./assets/css/Landing.css";

function Landing({ login, logout }) {
  return (
    <div id="landing">
      <div id="intro">
        <div id="logo">
          <brand.Logo style={{width: '100%'}}/>
        </div>
        <div className="msg">
          <div id="lead_msg">
            문서작업,<br/>
            이제는 쉽고 빠르고 예쁘게<br/>
            <b>뚝-딱!</b>
          </div>
          <div id="sub_msg">
            프리젠테이션에 들어갈 자료와 내용만 입력하세요.<br/>
            그 외의 귀찮은 작업은 모두 Docgabi가 하겠습니다 :)
          </div>
        </div>
        <div id="character">
          <brand.Character/>
        </div>
      </div>
      <Login login={login} logout={logout}/>
    </div>
  );
}

export default Landing;
