import React, { useState } from "react";

import tools from "../utils/tools";

import "../assets/css/Checkbox.scss";

function Checkbox({ doc_id, type, is_selected }) {
  const [selected, setSelected] = useState(is_selected || false);

  function handleClick(e) {

    if (e.target.parentNode.className.includes("select") || e.target.parentNode.className.includes("important")) {
      for (let node of document.querySelectorAll(`[class$="${type.split('_')[1]}"][doc_id="${doc_id}"]`)) {
        // console.log(node.innerHTML);

        if (type.includes("select")) {
          if (selected) {
            node.innerHTML = createCheckbox("unselected", "unselected", tools.Unselected);
            // node.innerHTML = <img alt="unselected" className="unselected" src={tools.Unselected} />;
          }
          else {
            node.innerHTML = createCheckbox("selected", "selected", tools.Selected);
            // node.innerHTML = <img alt="selected" className="selected" src={tools.Selected} />;
          }
        } else if (type.includes("important")) {
          if (selected) {
            node.innerHTML = createCheckbox("notImportant", tools.NotImportant);
            // node.innerHTML = <img alt="notImportant" src={tools.NotImportant} />;
          }
          else {
            node.innerHTML = createCheckbox("important", tools.Important);
            // node.innerHTML = <img alt="important" src={tools.Important} />;
          }
        }
      }
    }
    // setSelected(!selected)
  }

  function createCheckbox(alt, className, src) {
    let checkbox = document.createElement("img");
    checkbox.setAttribute("alt", alt);
    checkbox.setAttribute("className", className);
    checkbox.setAttribute("src", src);

    console.log(checkbox);
    return checkbox;
  }

  if (type.includes("select")) {
    return (
      <button className={type} doc_id={doc_id} onClick={(e) => handleClick(e)}>
        {selected ? <img alt="selected" className="selected" src={tools.Selected} /> : <img alt="unselected" className="unselected" src={tools.Unselected} />}
      </button>
    );
  } else if (type.includes("important")) {
    return (
      <button className={type} doc_id={doc_id} onClick={(e) => handleClick(e)}>
        {selected ? (
          <img alt="important" src={tools.Important} />
        ) : (
          <img alt="notImportant" src={tools.NotImportant} />
        )}
      </button>
    );
  } else {
    return (
      <button className="checkbox" onClick={() => setSelected(!selected)}>
        {selected ? <img alt="selected" src={tools.Selected} /> : <img alt="unselected" src={tools.Unselected} />}
      </button>
    );
  }
}

export default Checkbox;
