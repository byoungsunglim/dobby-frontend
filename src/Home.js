import React, { Component } from "react";
import firebase from 'firebase/app';
import { db } from "./Firebase.js";
import Navigation from "./Navigation.js";
import Information from "./Information.js";
import uuid from "uuid";

import "./assets/css/Home.css";

class Home extends Component {
  state = {
    view: "home",
    initialized: false,
    drafts: []
  }

  componentDidMount() {
    console.log("Home Mounted...", this.props.user);
    var users = db.collection("users").doc(this.props.user.email);
    users
      .get()
      .then((user) => {
        if (user.exists) {
          user.collection("drafts").get().then(function(querySnapshot) {
            // if (querySnapshot.empty) {
            //   users.collection("drafts").doc(uuid()).set({
            //     createdAt : firebase.firestore.FieldValue.serverTimestamp()
            //   })
            // }
            // else {
              let drafts = [];
              for (let doc of querySnapshot) {
                let draft = doc.data();
                draft.id = doc.id;
                drafts.push(draft);
              }
              this.setState({
                drafts: drafts
              })
              console.log("Drafts", drafts);
            // }
          })
        } else {
          users.set({
            nickname: this.props.user.nickname,
            profile_image: this.props.user.profile_image
          })
        }
      })
      .catch(function(error) {
        console.log("Error getting user:", error);
      })
  }

  render() {
    return (
      <div id="home">
        <Navigation view={this.state.view}/>
        {this.state.drafts}
        <Information />
      </div>
    );
  }
}

export default Home;
