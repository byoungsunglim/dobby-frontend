export const KakaoLogin = async (login) => {
  window.Kakao.init("345e316fada913303239e9e721168000");
  window.Kakao.Auth.login({
    success: function(authObj) {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: function(result) {
          console.log(JSON.stringify(result));
          var user = {
            nickname: result.kakao_account.profile.nickname,
            profile_image: result.kakao_account.profile.profile_image_url,
            email: result.kakao_account.email
          };
          login(user);
        },
        fail: function(error) {
          alert(JSON.stringify(error));
        }
      });
    },
    fail: function(err) {
      alert(JSON.stringify(err));
    }
  });
};
