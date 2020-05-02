import React, { useState } from "react";

import ContentEditable from "react-contenteditable";
import { ImageLoader } from "./utils/getLoader";

import "./assets/css/Content.css";

function Content({ content, ...props }) {
  const [loading, setLoading] = useState(true);

  switch (content.type) {
    case 'h':
      return (
        <ContentEditable key={content.id} id={content.id} placeholder={content.placeholder} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => props.handleChange(e)} onFocus={(e) => props.handleFocus(e)} onKeyDown={(e) => props.handleKeyDown(e)} onPaste={(e) => props.handlePaste(e)} onSelect={(e) => props.handleSelect(e)}/>
      );
    case 'ul':
      return (
        <ul indent={content.indent} level={content.level}>
          <li>
            <ContentEditable key={content.id} id={content.id} placeholder={content.placeholder} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => props.handleChange(e)} onFocus={(e) => props.handleFocus(e)} onKeyDown={(e) => props.handleKeyDown(e)} onPaste={(e) => props.handlePaste(e)} onSelect={(e) => props.handleSelect(e)}/>
          </li>
        </ul>
      );
    case 'ol':
      return (
        <ol indent={content.indent} level={content.level} start={content.start}>
          <li>
            <ContentEditable key={content.id} id={content.id} placeholder={content.placeholder} html={content.html} type={content.type} level={content.level} disabled={content.disabled} onChange={(e) => props.handleChange(e)} onFocus={(e) => props.handleFocus(e)} onKeyDown={(e) => props.handleKeyDown(e)} onPaste={(e) => props.handlePaste(e)} onSelect={(e) => props.handleSelect(e)}/>
          </li>
        </ol>
      );
    case 'img':
      if (content.src) {
        return (
          <div key={content.id} id={content.id}>
            <div className="imgholder">
              <ImageLoader loading={loading}/>
              <img style={{display: loading ? "none" : "block"}} src={content.src} width={content.width} height={content.height} onLoad={() => setLoading(false)}></img>
            </div>
          </div>
        )
      }
      else {
        return (
          <div key={content.id} id={content.id}>
            <ImageLoader loading={loading}/>
          </div>
        )
      }
      
    default:
  }
}

export default Content;
