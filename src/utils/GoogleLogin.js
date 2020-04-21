import "firebase/auth";
import "firebase/firestore";
import * as firebase from "firebase/app";

export const GoogleLogin = async (login) => {
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
    // // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // // The email of the user's account used.
    // var email = error.email;
    // // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // // ...
  });
};
  