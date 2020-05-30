import React, { Component } from "react";

import { queryDrive } from "../utils/queryDrive";

import "../assets/css/AuthRoute.css";

class AuthRoute extends Component {
  componentDidMount() {
    console.log(this.props);
    queryDrive('auth', this.props.match.params.type, this.props.user.email).then(result => {
      console.log(result);
      if (result) {
        document.getElementById('userName').innerText = result.name;
        document.getElementById('userEmail').innerText = result.email;
        window.opener.location.reload();
        window.close();
      }
      else {
        alert("Sync Error... Try Again Later");
      }
    });
  }

  render() {
    return (
      <div id="redirect">
        <span id="userName"></span>
        <span id="userEmail"></span>
      </div>
    );
  }
}

export default AuthRoute;