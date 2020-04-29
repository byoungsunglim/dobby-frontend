export const KakaoLogin = (login) => new Promise(function(resolve, reject) {
  window.Kakao.init("345e316fada913303239e9e721168000");
  window.Kakao.Auth.login({
    success: function(authObj) {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: function(result) {
          console.log(JSON.stringify(result));
          var user = {
            nickname: result.properties.nickname,
            profile_image: result.properties.profile_image || "",
            thumbnail_image: result.properties.thumbnail_image || "",
            email: result.kakao_account.email
          }; //TODO: lack of info handling
          login(user);
          resolve(user);
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
})

