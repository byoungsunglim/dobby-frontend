import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Checkbox from "./Checkbox";
import Shared from "./Shared";
import FileFunctions from "./FileFunctions";
import tools from "../utils/tools";

import "../assets/css/FileCard.scss";

function FileCard({ doc }) {
  const history = useHistory();
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    let owner = [{
      id: doc.owner,
      role: 'owner'
    }]

    setMembers(owner.concat(doc.shared));
  }, [doc])

  function handleClick(e) {
    // console.log(e.target.className);
    if (e.target.className.includes("doc_click")) {
      history.push(`/doc/${doc.id}`)
    }
  }

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  return (
    <div className="file_card doc_click" onClick={(e) => handleClick(e)}>
      <Checkbox type="card_select" />
      <Checkbox type="card_important" is_checked={doc.is_important}/>
      {doc.thumbnail ? 
        <div className="preview doc_click">
          <img alt="preview thumbnail" className="preview_thumbnail" src={doc.thumbnail}/>
        </div>
      : 
        <div className="preview_default doc_click"/>
      }
      <Shared doc={doc} members={members}/>
      <div className="file_title doc_click">
        <img alt="file type" className="file_type doc_click" src={tools[`${doc.type.capitalize()}`]}/>
        <span className="doc_click">{doc.title}</span>
      </div>
      <FileFunctions />
    </div>
  );
}

export default FileCard;
