import { renderToString } from 'react-dom/server'
import ContentEditable from 'react-contenteditable'
import parse from 'html-react-parser';
import React, { Component } from "react";
import uuid from "uuid";

import TextToolbar from './TextToolbar.js';

import "./assets/css/Contents.css";

class Contents extends Component {
  state = {
    content: [],
    showToolbar: false,
    preText: null,
    postText: null,
    selText: null,
    cur_id: null,
    x: 0,
    y: 0,
  }

  componentWillMount() {
    if (this.props.contents.content === null) {
      this.addContent("h1", "내용을 입력해주세요.", true)
    }
    else {
      let content = [];
      let html = parse(this.props.contents.content);
      console.log(html);
      for (let i = 0; i < Object.keys(this.props.contents).length - 2; i++) {
        if (html.length === 1) {
          content.push(
            <ContentEditable id={`body_${i}`} placeholder={html.props.placeholder} html={this.props.contents[`body_${i}`]} type={html.props.type} disabled={false} onChange={(e) => this.handleChange(e)} onPaste={(e) => this.handlePaste(e)} onSelect={(e) => this.handleSelect(e)} onKeyDown={(e) => this.handleKeyDown(e)}/>
          )
        }
        else {
          content.push(
            <ContentEditable id={`body_${i}`} placeholder={html[i].props.placeholder} html={this.props.contents[`body_${i}`]} type={html[i].props.type} disabled={false} onChange={(e) => this.handleChange(e)} onPaste={(e) => this.handlePaste(e)} onSelect={(e) => this.handleSelect(e)} onKeyDown={(e) => this.handleKeyDown(e)}/>
          )
        }
      }

      this.setState({
        content: content
      })
    } 
  }

  addContent = (type, placeholder, init) => {
    // const id = uuid();
    const id = this.state.content.length;
    this.setState({
      content: this.state.content.concat(
        <ContentEditable id={`body_${id}`} placeholder={placeholder} html={this.props.contents[`body_${id}`]} type={type} disabled={false} onChange={(e) => this.handleChange(e)} onPaste={(e) => this.handlePaste(e)} onSelect={(e) => this.handleSelect(e)} onKeyDown={(e) => this.handleKeyDown(e)}/>
      )
    }, () => init ? {} :  document.getElementById(`body_${id}`).focus());
    this.props.setContents('update', this.props.page, {
      [`body_${id}`]: ""
    })
  }

  handleChange = (e) => {
    if (e.target.value) {
      let data = {
        [e.currentTarget.id]: e.target.value,
        content: document.getElementsByClassName(`contents_${this.props.page}`)[0].innerHTML
      }
      // console.log(e.target.value);

      this.props.setContents('update', this.props.page, data);
      this.props.setPage(this.props.page);
    }
  }

  handleKeyDown = (e) => {
    const id = e.target.id;
    const target = document.getElementById(id);
    const value = target.innerHTML;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        try {
          this.setEndOfContenteditable(document.getElementById(id).nextElementSibling);
        }
        catch {
          this.addContent("p", "", false);
        }
        
        break;
      case 'Tab':
        let values = value.split("\n");
        console.log(values[values.length - 1])
        if (values[values.length - 1].includes('\u2022')) {
          console.log("##")
          e.target.value += '\t';
        }
        else {
          e.target.value += `&#9679`;
        }
        break;
      case 'Backspace':
        if (value.length === 0 && this.state.content.length > 1) {
          try {
            e.preventDefault();
            let new_content = this.props.contents;
            delete new_content[id];
            this.props.setContents('update', this.props.page, new_content);
            this.setState({
              content: this.state.content.filter(item => item.props.id !== id)
            });
            this.setEndOfContenteditable(document.getElementById(id).previousSibling);
          }
          catch {
            //TODO: error handling
          }
        }
        break;

      default:
    }
  }

  handlePaste = (e) => {
    const id = e.currentTarget.id;
    var items = e.clipboardData.items;

    if(items === undefined){
      if(typeof(callback) == "function"){
        alert("NO ITEM")
      }
    };

    for (var i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") === -1) continue;
        // Retrieve image on clipboard as blob
        var blob = items[i].getAsFile();
        var reader = new FileReader();
        reader.onload = function(event)
        {
            console.log(id);
            console.log(event.target.result)
            var img=document.createElement("img");
            img.src=event.target.result
            document.getElementById(id).appendChild(img);
        }; // data url  
        reader.readAsDataURL(blob);
    }
  }

  handleSelect = (e) => {
    const [range, preText, postText, selText] = this.getSelection(e.target); 
    const bodyRect = range.getBoundingClientRect();
    const refRect = document.getElementsByClassName(`contents_${this.props.page}`)[0].getBoundingClientRect();
    const x = `${bodyRect.x}px - ${refRect.x}px`;
    const y = `${bodyRect.bottom}px - ${refRect.y}px`;

    if (selText.length > 0) {
      this.setState({
        showToolbar: true,
        preText: preText,
        postText: postText,
        selText: selText,
        cur_id: e.target.id,
        x: x,
        y: y,
      })
    }
    else {
      this.setState({
        showToolbar: false
      })
    }
  }

  getHTMLOfSelection () {
    var range;
    if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      return range.htmlText;
    }
    else if (window.getSelection) {
      var selection = window.getSelection();
      if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
        var clonedSelection = range.cloneContents();
        var div = document.createElement('div');
        div.appendChild(clonedSelection);
        return div.innerHTML;
      }
      else {
        return '';
      }
    }
    else {
      return '';
    }
  }

  getSelection(element) {
    var range = window.getSelection().getRangeAt(0);
    var preCaretRange = range.cloneRange();
    var postCaretRange = range.cloneRange();
    var selCaretRange = range.cloneRange();
    var selText = "";
    var inDiv = false;

    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    postCaretRange.selectNodeContents(element);
    postCaretRange.setStart(range.endContainer, range.endOffset);
    selCaretRange.selectNodeContents(element);
    // selCaretRange.setStart(range.startContainer, range.startOffset);
    selCaretRange.setEnd(range.endContainer, range.endOffset);

    var preDiv = document.createElement('div');
    preDiv.appendChild(preCaretRange.cloneContents());
    preDiv.childNodes.forEach((child) => {
      if (!child.textContent) {
        preDiv.removeChild(child);
        inDiv = true;
      }
    })

    var postDiv = document.createElement('div');
    postDiv.appendChild(postCaretRange.cloneContents());
    postDiv.childNodes.forEach((child) => {
      if (!child.textContent) {
        postDiv.removeChild(child);
      }
    })

    var selDiv = document.createElement('div');
    if (inDiv) {
      selDiv.appendChild(selCaretRange.cloneContents());
      selText = selDiv.innerHTML.replace(preDiv.innerHTML, "");
    }
    else {
      selCaretRange.setStart(range.startContainer, range.startOffset);
      selDiv.appendChild(selCaretRange.cloneContents());
      selText = selDiv.innerHTML;
    }
  
    // console.log("preDiv", preDiv.innerHTML);
    // console.log("postDiv", postDiv.innerHTML);
    // console.log("selDiv", selText);

    return [range, preDiv.innerHTML || "", postDiv.innerHTML || "", selText];
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
    return (
        <div className={`contents_${this.props.page}`}>
          {this.state.content}
          {this.state.showToolbar ? <TextToolbar {...this.state} {...this.props}/> : null}
        </div>
    );
  }
}

export default Contents;
