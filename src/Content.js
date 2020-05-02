import React, { useEffect } from "react";

import ContentEditable from "react-contenteditable";

import "./assets/css/Content.css";

function Content({ content, ...props }) {
  switch (content.type) {
    case 'h':
      return (
        <ContentEditable key={content.id} id={content.id} placeholder={content.placeholder} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => props.handleChange(e)} onFocus={(e) => props.handleFocus(e)} onKeyDown={(e) => props.handleKeyDown(e)} onPaste={(e) => props.handlePaste(e)} onSelect={(e) => props.handleSelect(e)}/>
      );
    case 'ul':
      return (
        <ul indent={content.indent}>
          <li>
            <ContentEditable key={content.id} id={content.id} placeholder={content.placeholder} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => props.handleChange(e)} onFocus={(e) => props.handleFocus(e)} onKeyDown={(e) => props.handleKeyDown(e)} onPaste={(e) => props.handlePaste(e)} onSelect={(e) => props.handleSelect(e)}/>
          </li>
        </ul>
      );
    case 'ol':
      return (
        <ol indent={content.indent} start={content.start}>
          <li>
            <ContentEditable key={content.id} id={content.id} placeholder={content.placeholder} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => props.handleChange(e)} onFocus={(e) => props.handleFocus(e)} onKeyDown={(e) => props.handleKeyDown(e)} onPaste={(e) => props.handlePaste(e)} onSelect={(e) => props.handleSelect(e)}/>
          </li>
        </ol>
      );
    case 'img':
    default:
  }
}

export default Content;
