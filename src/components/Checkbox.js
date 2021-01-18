import React, { useState } from "react";

import tools from "../utils/tools";

import "../assets/css/Checkbox.scss";

function Checkbox({ type, is_selected }) {
  if (type.includes("select")) {
    return (
      <button className={type}>
        {is_selected ? <img alt="selected" className="selected" src={tools.Selected} /> : <img alt="unselected" className="unselected" src={tools.Unselected} />}
      </button>
    );
  } else if (type.includes("important")) {
    return (
      <button className={type}>
        {is_selected ? (
          <img alt="important" src={tools.Important} />
        ) : (
          <img alt="notImportant" src={tools.NotImportant} />
        )}
      </button>
    );
  } else {
    return (
      <button className="checkbox">
        {is_selected ? <img alt="selected" src={tools.Selected} /> : <img alt="unselected" src={tools.Unselected} />}
      </button>
    );
  }
}

export default Checkbox;
