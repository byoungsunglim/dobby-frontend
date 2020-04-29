import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

import Navigation from "./Navigation";
import Information from "./Information";
import Documents from "./Documents";

import "./assets/css/Home.css";
import { queryDB } from "./utils/queryDB";

class Home extends Component {
  constructor(props) {
    super(props);

    this.setView = this.setView.bind(this);

    this.state = {
      view: "home",
      main: <Documents user={this.props.user} setView={this.setView}/>,
    }
  }

  setView = (view, doc_id) => {
    switch (view) {
      case 'home':
        this.setState({
          view: 'home',
          main: <Documents user={this.props.user} setView={this.setView}/>
        })
        break;
      // case 'doc':
      //   const doc = doc_id ? queryDB("get", "doc", this.props.user.email, doc_id) : this.state.doc;
      //   this.setState({
      //     view: 'doc',
      //     main: <Document doc={doc}/>
      //   })
      //   break;
      default:
    }
  }

  render() {
    return (
      <div id="home">
        <Navigation user={this.props.user} view={this.state.view} setView={this.setView}/>
        <div id="main">
          <Documents user={this.props.user} setView={this.setView}/>
        </div>
        <Information/>
      </div>
    );
  }
}

export default Home;
