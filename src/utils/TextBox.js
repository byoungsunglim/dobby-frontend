import React, { Component } from "react";
import ReactDOMServer from 'react-dom/server';
import Draggable from "react-draggable";
import textFit from "textfit";
import { Textfit } from "react-textfit";
import ContentEditable from "react-contenteditable";
import uuid from "uuid";

class TextBox extends Component {
  state = {
    id: 'text_' + uuid(),
    html: this.props.text.html,
    disabled: false,
    config: {alignVert: true, multiLine: true, detectMultiLine: true, minFontSize:10, maxFontSize: 300, reProcess: true, widthOnly: false}
    // activeDrags: 0,
  };

  componentDidMount() {
    var target = document.getElementById(this.props.text.id);
    for (let styleName in this.props.style) {
      target.style[styleName] = this.props.style[styleName];
    }
    textFit(document.getElementsByClassName('text'), this.state.config);
    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate() {
    console.log("textbox updated...");
    textFit(document.getElementsByClassName('text'), this.state.config);
  }

  shouldComponentUpdate() {
    if (this.state.disabled) {
      return false;
    }

    return true;
  }

  onStart = (e) => {
    // const canvas = document.getElementById('canvas');
    var target = document.getElementById(this.props.text.id);
    console.log(target);
    // target.style.transform = `translate(${canvas.clientWidth * parseFloat(target.style.left) / 100}, ${canvas.clientHeight * parseFloat(target.style.top) / 100})`
    // target.style.left = 0;
    // target.style.top = 0;
    // target.style.transform = "translate(0px, 0px)"
    // target.style.border = "3px solid black";
    // this.setState({activeDrags: ++this.state.activeDrags});
  };

  onStop = (e) => {
    const canvas = document.getElementById('canvas');
    var target = document.getElementById(this.props.text.id);
    console.log(target);
    try {
      var style = window.getComputedStyle(target);
      console.log(style.transform);
   
      var matrix = style.transform.split('(')[1].split(')')[0].split(',');
      console.log(matrix, parseFloat(target.style.left), parseFloat(target.style.top));

      // target.style.left = `${parseFloat(target.style.left) || 0 + matrix[4] * 100 / canvas.clientWidth}%`
      // target.style.top = `${parseFloat(target.style.top) || 0 + matrix[5] * 100 / canvas.clientHeight}%`
      // target.style.transform = "translate(0px, 0px)"
    }
    catch {
      console.log("no style transform")
    }
    // target.style.border = "3px solid black";
    console.log(e.target);
    console.log(canvas.clientWidth, canvas.clientHeight)
    // this.setState({activeDrags: --this.state.activeDrags});
  };

  onBlur = (e) => {
    console.log("onBlur")
    let nodes = document.querySelectorAll("[id^=body]")
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].style.border = "none";
    }
    this.setState({
      disabled: false
    })
  }

  onClick = (e) => {
    console.log(e.target);
    const target = e.target;
    if (target.className.includes("textFitted")) {
      this.setState({
        disabled: true
      }, () => {
        this.setEndOfContenteditable(document.getElementById(this.state.id));
      })
    }
    
    // if (!this.state.disabled) {
    document.getElementById(this.props.text.id).style.border = "1px solid black";
    //   this.setState({
    //     disabled: true
    //   })
    // }
    // textFit(document.getElementsByClassName('text'), this.state.config);
  }

  onChange = (e) => {
    // console.log("onChange", e.target.value);
    let html = e.target.value.substring(e.target.value.indexOf(">") + 1).split("</span>")[0];
    console.log(html);
    this.setState({
      html: html
    }, () => {
      this.props.setDraft('update', this.props.page, {content: this.props.content.map(body => body.id === this.props.text.id ? {...body, html: html} : body)})
    })
    textFit(document.getElementsByClassName('text'), this.state.config);
  }

  onKeyDown = (e) => {
    // console.log(e.target);
    // if (e.target.className === "text") {
    //   this.setState({
    //     disabled: true
    //   })
    // }
  }

  // onMouseDown= (e) => {
  //   this.setState({
  //     disabled: false
  //   })
  // }

  // onMouseMove = () => {
  //   console.log("mousemove")
  //   this.setState({
  //     disabled: false
  //   })
  // }

  onResize = (e) => {
    // console.log(window.innerWidth, window.innerHeight)
    textFit(document.getElementsByClassName('text'), this.state.config);
  }

  setEndOfContenteditable = (contentEditableElement) => {
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
  }

  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop, onMouseDown:this.onMouseDown};    
    return (
      <Draggable disabled={this.state.disabled} {...dragHandlers}>
        <div id={this.props.text.id} onClick={this.onClick}>
          <ContentEditable id={this.state.id} className="text" html={this.state.html} style={{}} disabled={this.props.text.disabled} onBlur={this.onBlur} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
        </div>
      </Draggable>
    );
  }
}

export default TextBox;
