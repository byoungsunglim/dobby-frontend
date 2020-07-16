import React, { useState } from "react";

import ContentEditable from "react-contenteditable";
import MediaToolbar from "./MediaToolbar";
import { ImageLoader } from "../utils/getLoader";

import "../assets/css/ContentBox.css";

function ContentBox({ content, ...props }) {
  const [loading, setLoading] = useState(true);
  const [showToolbar, setShowToolbar] = useState(false);

  switch (content.type) {
    case 'h':
      return (
        <ContentEditable className="contentbox" key={content.id} id={content.id} html={content.html} type={content.type} level={content.level} disabled={true}/>
      );
    case 'ul':
      return (
        <ul indent={content.indent} level={content.level}>
          <li>
            <ContentEditable className="contentbox" key={content.id} id={content.id} html={content.html} type={content.type} level={content.level} disabled={true}/>
          </li>
        </ul>
      );
    case 'ol':
      return (
        <ol indent={content.indent} level={content.level} start={content.start}>
          <li>
            <ContentEditable className="contentbox" key={content.id} id={content.id} html={content.html} type={content.type} level={content.level} disabled={true}/>
          </li>
        </ol>
      );
    case 'img':
      return (
        <div className="imgholder" onClick={() => setShowToolbar(true)} onMouseLeave={() => setShowToolbar(false)}>
          <ImageLoader loading={loading}/>
          <img alt="contentbox" style={{display: loading ? "none" : "block"}} src={content.src} width={content.width} height={content.height} onLoad={() => setLoading(false)}></img>
          {showToolbar ? <MediaToolbar/> : null}
        </div>
      )
    default:
  }
}

export default ContentBox;
