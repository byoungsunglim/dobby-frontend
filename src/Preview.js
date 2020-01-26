import React, { Component } from "react";

import "./assets/css/Preview.css";

class Preview extends Component {
  handleChange = () => {
    // if (this.props.view === "document") {
    //   const t = document.querySelectorAll('[id^=title]');
    //   const s = document.querySelectorAll('[id^=subtitle]');
    //   const b = document.querySelectorAll('[id^=body]');

    //   var contents = [];

    //   for (let page = 0; page < t.length; page++) {
    //     contents.push({
    //       page: page,
    //       title: t[page].value,
    //       subtitle: s[page].value,
    //       body: b[page].value
    //     })
    //   }

    //   // console.log(t, s, b);
    //   this.props.setContents(contents);
    // }
    this.props.setView();
  }

  contentsBtn = (<button id="contentsBtn" onClick={this.handleChange}>CONTENTS</button>);
  designBtn = (<button id="designBtn" onClick={this.handleChange}>DESIGN</button>);

  render() {
    return (
      <div className="preview">
      {this.props.view === "document" ? this.designBtn : this.contentsBtn}
      </div>
    );
  }
}

export default Preview;
