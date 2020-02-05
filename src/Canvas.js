import { Textfit } from "react-textfit";
import React, { Component } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import { getLineBreak } from './utils/getLineBreak.js';

import "./assets/css/Canvas.css";

class Canvas extends Component {
  constructor(props) {
    super(props)

    this.getDesign = this.getDesign.bind(this)
  }

  state = {
    design: null
  }

  componentWillMount() {
    console.log(this.props.contents);
    this.getDesign(this.props.contents);
  }

  getDesign(contents) {
    let title = contents.title.split("\n");
    let subtitle = contents.subtitle.split("\n");
    let body = contents.body.split("/");

    let dt = [];
    let ds = [];
    let db = [];

    title.forEach((t) => {
      if (t.length > 30) {
        alert("제목이 너무 깁니다");
        //TODO: case check
      }
      else {
        let elements = getLineBreak('title', t)
        for (let i = 0; i < elements.length; i++) {
          dt.push(elements[i]);
          if (i < elements.length - 1) {
            dt.push(<br></br>);
          }
        }
      }
    })

    for (let j = 0; j < subtitle.length; j++) {
      ds.push(subtitle[j]);
      if (j < subtitle.length - 1) {
        ds.push(<br></br>);
      }
    }

    for (let k = 0; k < body.length; k++) {
      db.push(
        <Textfit id={`dbody_${k}`} mode="multi" >
          {body[k]}
        </Textfit>
      )
    }

    // var dt = (
    //   <div className="dtitle">
    //     <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
    //       {contents.title}
    //     </Textfit>
    //   </div>
    // )

    // console.log("enter", contents.title.indexOf("\n"))

    // if (contents.title.length > 14 && contents.title.indexOf(" ") > 0) {
    //   var break_idx = contents.title.indexOf(" ", contents.title.length / 2);
    //   var first = contents.title.substring(0, break_idx + 1).trim();
    //   var second = contents.title.substring(break_idx + 1, contents.title.length).trim();
    //   dt = (
    //     <div className="dtitle">
    //       <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
    //         {first}<br/>{second}
    //       </Textfit>
    //     </div>
    //   );
    // }

    // var ds = (
    //   <div className="dsubtitle">
    //     <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
    //       {this.state.s}
    //     </Textfit>
    //   </div>
    // );

    this.setState({
      design: [
        <div className="dtitle">
          <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
            {dt}
          </Textfit>
        </div>,
        <div className="dsubtitle">
          <Textfit mode="multi" style={{ width: "100%", height: "100%" }}>
            {ds}
          </Textfit>
        </div>,
        <div className="dbody">
          {db}
        </div>
      ]
    })
  };
  

  render() {
    return (
        <div className="background-canvas">
            <div className="canvas">
              {this.state.design}
            </div>
        </div>
    );
  }
}

export default Canvas;
