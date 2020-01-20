import "firebase/auth";
import "firebase/firestore";
import * as firebase from "firebase/app";
import axios from "axios";
import React, { Component } from "react";

import firebaseConfig from "./FirebaseConfig";

import "./assets/css/Login.css";
import google_login_btn from "./assets/icons/google_login_btn.png";
import kakao_login_btn from "./assets/icons/kakao_login_btn.png";

window.Kakao.init("345e316fada913303239e9e721168000");

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

function Login({ authenticated, login }) {
  function loginWithKakao() {
    // 로그인 창을 띄웁니다.
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
  }

  function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result);
        var user = {
          nickname: result.user.displayName,
          profile_image: result.user.photoURL,
          email: result.user.email
        };
        login(user);
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  return (
    <div>
      <button id="kakao-login-btn" onClick={loginWithKakao}>
        <img src={kakao_login_btn}></img>
      </button>
      <button id="google-login-btn" onClick={loginWithGoogle}>
        <img id="google-login-btn-img" src={google_login_btn}></img>
      </button>
      {/* <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} /> */}
    </div>
  );
}

// class Login extends Component {

//     // function Login({ authenticated, login, location }) {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email : '',
//             setEmail : '',
//             password : '',
//             setPassword : ''
//         };
//         //this.toggle = this.toggle.bind(this);
//     }

//     // const[email, setEmail] = useState('');
//     // const[password, setPassword] = useState('');

//     const handleClick = () => {
//         try {
//             login({ email, password });
//         } catch (e) {
//             alert('Failed to login');
//             setEmail('');
//             setPassword('');
//         }
//     };

//     const { from } = location.state || { from: { pathname: "/" } };
// if (authenticated) return <Redirect to={from} />;

// return (
//     <>
//         <h1>Login</h1>
//         <input
//             value={email}
//             onChange={({ target: { value } }) => setEmail(value)}
//             type="text"
//             placeholder="email"
//         />
//         <input
//             value={password}
//             onChange={({ target: { value } }) => setPassword(value)}
//             type="password"
//             placeholder="password"
//         />
//         <button onClick={handleClick}>Login</button>
//     </>
// );
// }

export default Login;
