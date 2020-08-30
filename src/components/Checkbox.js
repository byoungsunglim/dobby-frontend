import React, { useState } from "react";

import tools from "../utils/tools";

import "../assets/css/Checkbox.scss";

function Checkbox({ type, is_checked }) {
  const [checked, setChecked] = useState(is_checked || false);

  switch (type) {
    case "select":
      return (
        <button className="select" onClick={() => setChecked(!checked)}>
          {checked ? (
            <img src={tools.Checked} />
          ) : (
            <img src={tools.Unselected} />
          )}
        </button>
      );
      break;
    case "important":
      return (
        <button className="important" onClick={() => setChecked(!checked)}>
          {checked ? (
            <img src={tools.Important} />
          ) : (
            <img src={tools.NotImportant} />
          )}
        </button>
      );
      break;
    default:
      return (
        <button className="checkbox" onClick={() => setChecked(!checked)}>
          {checked ? (
            <img src={tools.Checked} />
          ) : (
            <img src={tools.Unselected} />
          )}
        </button>
      );
  }
}

export default Checkbox;
