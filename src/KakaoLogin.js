const KakaoLogin = () => {
  window.Kakao.init("345e316fada913303239e9e721168000");
  // 카카오 로그인 버튼을 생성합니다.
  window.Kakao.Auth.createLoginButton({
    container: "#kakao-login-btn",
    success: function(authObj) {
      console.log(JSON.stringify(authObj));
    },
    fail: function(err) {
      console.log(JSON.stringify(err));
    }
  });
};
