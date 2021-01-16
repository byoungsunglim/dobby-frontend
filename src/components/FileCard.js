import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Checkbox from "./Checkbox";
import Shared from "./Shared";
import FileFunctions from "./FileFunctions";
import tools from "../utils/tools";
import { queryDB } from "../utils/queryDB";

import "../assets/css/FileCard.scss";

function FileCard({ doc }) {
  const history = useHistory();
  const [members, setMembers] = useState([]);
  const [is_selected, setSelected] = useState(false);
  const [is_important, setImportant] = useState(doc.is_important);

  useEffect(() => {
    let owner = [
      {
        id: doc.owner,
        role: "owner",
      },
    ];

    setMembers(owner.concat(doc.shared));
  }, [doc]);

  function handleClick(e) {
    // console.log(e.target.parentNode);
    if (e.target.className.includes("doc_click")) {
      history.push(`/doc/${doc.id}`);
    }

    if (e.target.className === "card_select") {
      history.push(`/doc/${doc.id}`);
    }

    if (e.target.parentNode.className.includes("select")) {

    }
    else if (e.target.parentNode.className.includes("important")) {
      setImportant(!is_important);

      queryDB("set", "doc", doc.id, {
        is_important: !is_important,
      }).then((result) => {
        
      });
    } //TODO: handle multiple requests at a short period
  }

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  return (
    <div className="file_card doc_click" onClick={(e) => handleClick(e)}>
      <Checkbox doc_id={doc.id} type="card_select" />
      <Checkbox doc_id={doc.id} type="card_important" is_selected={is_important} />
      {doc.thumbnail ? (
        <div className="preview doc_click">
          <img
            alt="preview thumbnail"
            className="preview_thumbnail"
            src={doc.thumbnail}
          />
        </div>
      ) : (
        <div className="preview_default doc_click" />
      )}
      <Shared doc={doc} members={members} />
      <div className="file_title doc_click">
        <img
          alt="file type"
          className="file_type doc_click"
          src={tools[`${doc.type.capitalize()}`]}
        />
        <span className="doc_click">{doc.title}</span>
      </div>
      <FileFunctions />
    </div>
  );
}

export default FileCard;
