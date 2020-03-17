import React, { Component } from "react";
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server';

import ContentEditable from "react-contenteditable";
import uuid from "uuid";

import TextToolbar from "./TextToolbar.js";

import "./assets/css/Contents.css";

class Contents extends Component {
  state = {
    content: [],
    showToolbar: false,
    cur_id: null,
    x: 0,
    y: 0,
  }

  componentDidMount() {
    let content = [];

    if (this.props.contents.content === null) {
      if (this.props.page === 0) {
        content.push(this.addContent(null, "문서 제목을 적어볼까요?", "", "title", true, null, false));
      }
      else {
        content.push(this.addContent(null, "내용을 입력해주세요.", "", "h1", true, null, false));
      }
    }
    else {
      for (let idx = 0; idx < this.props.contents.content.length; idx++) {
        content.push(this.addContent(this.props.contents.content[idx].props.id, this.props.contents.content[idx].props.placeholder, this.props.contents.content[idx].props.html, this.props.contents.content[idx].props.type, true, null, false));
      }
    }

    this.setState({
      content: content
    })
  }

  addContent = (id, placeholder, html, type, init, insert, disabled) => {
    const new_id = id || "body_" + uuid();
    // const id = this.state.content.length;
    let new_div = <ContentEditable id={new_id} key={new_id} placeholder={placeholder} html={html} type={type} disabled={disabled} onBlur={(e) => this.handleBlur(e)} onChange={(e) => this.handleChange(e)} onClick={(e) => this.handleClick(e)} onPaste={(e) => this.handlePaste(e)} onSelect={(e) => this.handleSelect(e)} onKeyDown={(e) => this.handleKeyDown(e)}/>;
    if (init) {
      console.log("init")
      return new_div;
    }
    else if (insert) {
      console.log("insert")
      let idx = 0;
      for (let i = 0; i < this.state.content.length; i++) {
        if (this.state.content[i].props.id === insert.id) {
          break;
        }
        else {
          idx++;
        }
      }

      this.setState({
        content: this.state.content.slice(0, idx).concat(new_div).concat(this.state.content.slice(idx))
      }, () => {
        document.getElementById(new_id).focus();
        this.props.setContents('update', this.props.page, {
          [new_id]: html,
          content: this.state.content
        })
      }); //TODO: list type insert before removes list tag... debug needed
    }
    else {
      console.log("else")
      this.setState({
        content: this.state.content.concat(new_div)
      }, () => {
        document.getElementById(new_id).focus();
        this.props.setContents('update', this.props.page, {
          [new_id]: html,
          content: this.state.content
        })
      });
    }
  }

  handleBlur = (e) => {
    console.log("blur")
  }

  handleChange = (e) => {
    // console.log("handleChange", e.currentTarget)
    this.setState({
      content: this.state.content.map(
        div => div.props.id === e.currentTarget.id ?
        <ContentEditable id={e.currentTarget.id} key={e.currentTarget.id} placeholder={e.currentTarget.getAttribute('placeholder')} html={e.currentTarget.innerHTML} type={e.currentTarget.getAttribute('type')} disabled={false} onBlur={(e) => this.handleBlur(e)} onChange={(e) => this.handleChange(e)} onClick={(e) => this.handleClick(e)} onPaste={(e) => this.handlePaste(e)} onSelect={(e) => this.handleSelect(e)} onKeyDown={(e) => this.handleKeyDown(e)}/>
        : div
      )
    }, () => {
      // console.log("double change", e.currentTarget)
      let data = {
        [e.currentTarget.id]: e.currentTarget.innerHTML,
        content: this.state.content
      }

      this.props.setContents('update', this.props.page, data);
      this.props.setPage(this.props.page);
    })
  } //TODO: after text toolbar edited text, triggering handleChange needed!

  handleClick = (e) => {
    console.log("handleClick", e.currentTarget);
    let imgholders = document.getElementsByClassName("imgholder");
    for (let i = 0; i < imgholders.length; i++) {
      imgholders[i].style.border = '';
    }

    if (e.currentTarget.innerHTML.includes("imgholder")) {
      e.currentTarget.firstChild.style.border = '2px solid blue';
      e.currentTarget.firstChild.style.borderRadius = '5px';
    }
  }

  handleKeyDown = (e) => {
    const id = e.currentTarget.id;
    const target = document.getElementById(id);
    const value = target.innerHTML;
    const selection = window.getSelection();

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        
        let default_html = "";

        if (selection.anchorOffset === 0 && selection.focusOffset === 0 && value.length > 0 && target.getAttribute('type') !== "title") {
          if (value.includes("<li>")) {
            if (value.split("<li>")[1].split("</li>")[0].length > 0) {
              default_html = value.split("<li>")[0] + "<li>";
              let start_idx = parseInt(target.firstChild.getAttribute('start'));
              let reorder = false;
              for (let node of target.parentNode.childNodes) {
                if (!node.innerHTML.includes("<li>")) {
                  break;
                }
                if (node.id === id) {
                  reorder = true;
                }
                if (reorder) {
                  node.firstChild.setAttribute('start', ++start_idx);
                }
              };
              // target.firstChild.setAttribute('start', parseInt(target.firstChild.getAttribute('start')) + 1);
      
              console.log("parent", target.parentNode);
              console.log("front", default_html);
            }
          }

          this.addContent(null, target.getAttribute('placeholder'), default_html, target.getAttribute('type'), false, {id:id}, false);
        }
        else {
          if (value.includes("<li>")) {
            let div = target.cloneNode(true);
            div.firstChild.setAttribute('start', parseInt(div.firstChild.getAttribute('start')) + 1);
            default_html = div.innerHTML.split("<li>")[0] + "<li>"; //TODO: updating all the orderedlist behind in order
            console.log("back", default_html);
            div.remove();

            if (target.nextElementSibling) {
              let start_idx = parseInt(target.firstChild.getAttribute('start')) + 1;
              let reorder = false;
              for (let node of target.parentNode.childNodes) {
                if (!node.innerHTML.includes("<li>")) {
                  break;
                }
                if (reorder) {
                  node.firstChild.setAttribute('start', ++start_idx);
                }
                if (node.id === id) {
                  reorder = true;
                }
              }
            }
            // default_html = value.split("<li>")[0] + "<li>";
          }

          console.log("back", default_html);
          this.addContent(null, "", default_html, target.getAttribute('type') === 'title' ? 'h1' : target.getAttribute('type'), false, target.nextElementSibling, false)
        }
        break;
      case 'Tab':
        e.preventDefault();
        if (value.includes("<li>")) {
          let dent = parseInt(target.firstChild.getAttribute('indent'));
          if (e.shiftKey) {
            if (dent > 1) {
              target.firstChild.setAttribute('indent', dent - 1);
              target.firstChild.setAttribute('start', 1);
            }
          }
          else {
            if (dent < 6) {
              target.firstChild.setAttribute('indent', dent + 1);
              target.firstChild.setAttribute('start', 1);
            }
          }
        }
        else {
          if (e.shiftKey) {
            document.execCommand('outdent');
          }
          else {
            document.execCommand('indent');
          }
        }
        break;
      case 'Backspace':
        if (target.getAttribute('type') !== 'title' && value.length === 0 && this.state.content.length > 1) {
          try {
            e.preventDefault();
            let new_content = this.props.contents;
            delete new_content[id];
            this.props.setContents('update', this.props.page, new_content);
            this.setState({
              content: this.state.content.filter(item => item.props.id !== id)
            });
            this.setEndOfContenteditable(target.previousSibling);
          }
          catch {
            //TODO: error handling
          }
        }
        break;

      default:
    }
  }

  handleSelect = (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const bodyRect = range.getBoundingClientRect();
    const refRect = document.getElementById(`contents_${this.props.page}`).getBoundingClientRect();
    const x = `${bodyRect.x}px - ${refRect.x}px`;
    const y = `${bodyRect.bottom}px - ${refRect.y}px`;

    if (selection.toString().length > 0) {
      this.setState({
        showToolbar: true,
        cur_id: e.target.id,
        x: x,
        y: y,
      })
    }
    else {
      this.setState({
        showToolbar: false,
        cur_id: e.target.id,
        x: x,
        y: y,
      })
    }
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

  handlePaste = (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    var items = e.clipboardData.items;

    if(items === undefined){
      if(typeof(callback) == "function"){
        alert("NO ITEM")
      }
    };

    var text = e.clipboardData.getData('Text');
    if (text.length > 0) {
      document.execCommand('insertText', true, text);
    }
    else {
      if (e.currentTarget.getAttribute('type') === 'title') {
        alert("문서 제목 입력란입니다.");
      }
      else {
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") === -1) continue;
          // Retrieve image on clipboard as blob
          var blob = items[i].getAsFile();
          var reader = new FileReader();
          reader.onload = (event) =>
          {
            // var img = document.createElement("img");
            // img.id = 'img_' + uuid();
            // img.src = event.target.result
            var img = React.createElement('img', {id: `img_${uuid()}`, src: event.target.result})

            // var div = document.createElement("div");
            // div.className = 'imgholder'
            // div.onclick = function () {
            //   this.handleImage(div);
            //   console.log("style")
            //   div.style.padding = '3px';
            //   div.style.border = 'lightsteelblue 2px solid';
            //   div.style.borderRadius = '5px';
            // }

            var div = React.createElement('div', {className: 'imgholder'}, img)

            // var body = document.createElement("div");
            // body.id = 'body_' + uuid();
            // var body = React.createElement('div', null, div);

            // div.appendChild(img);
            // body.appendChild(div);

            // console.log(img, div, body);

            // ReactDOM.createPortal(body, this.container.appendChild(body))
            // console.log(ReactDOMServer.renderToString(img));
            // console.log(div);
            // const new_id = `body_${uuid()}`
            this.addContent(null, null, ReactDOMServer.renderToStaticMarkup(div), null, false, {id:id}, true);
            // ReactDOM.hydrate(div, document.getElementById(new_id));
            // document.getElementById(id).parentNode.appendChild(body);
          }; // data url  
          reader.readAsDataURL(blob);
        }
      }
    }
  }

  render() {
    return (
      <div id={`contents_${this.props.page}`}>
        {this.state.content}
        {this.state.showToolbar ? <TextToolbar {...this.state} {...this.props}/> : null}
      </div>
    );
  }
}

export default Contents;
