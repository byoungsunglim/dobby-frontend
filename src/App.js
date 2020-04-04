import React, { Component } from "react";
import Landing from "./Landing.js";
import Home from "./Home.js";

import "./assets/css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  state = {
    authenticated: true,
    nickname: "",
    profile_image: "",
    email: ""
  };

  login(user) {
    this.setState({
      authenticated: true,
      user: {
        nickname: user.nickname,
        profile_image: user.profile_image,
        email: user.email
      }
    });
  }

  logout() {
    this.setState({
      authenticated: false
    });
  }

  render() {
    return (
      <div id="docgabi">
        {this.state.authenticated ? <Home /> : <Landing />}
      </div>
    );
  }
}

export default App;
