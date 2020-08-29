import React from "react";

import tools from "../utils/tools";

import "../assets/css/FileCard.css";

function FileCard({ doc }) {
  function handleClick(e) {}

  return (
    <div className="fileCard" onClick={(e) => handleClick(e)}>
      <div className="preview">
        <img alt="preview thumbnail" src={doc.thumbnail} />
      </div>
      <button className="importantBtn">
        {doc.is_important ? (
          <img alt="important" src={tools.Important} />
        ) : (
          <img alt="not important" src={tools.NotImportant} />
        )}
      </button>
      <div className="shared_profiles"></div>
      <div className="title">
        <img className="type" src />
        <span>{doc.title}</span>
      </div>
      <button className="download"></button>
      <button className="share"></button>
      <button className="etc"></button>
    </div>
  );
}

export default FileCard;
