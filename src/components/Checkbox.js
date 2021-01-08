import React, { useState } from "react";

import tools from "../utils/tools";

import "../assets/css/Checkbox.scss";

function Checkbox({ type, is_checked }) {
  const [checked, setChecked] = useState(is_checked || false);

  if (type.includes("select")) {
    return (
      <button className={type} onClick={() => setChecked(!checked)}>
        {checked ? <img alt="checked" src={tools.Checked} /> : <img alt="unselected" src={tools.Unselected} />}
      </button>
    );
  } else if (type.includes("important")) {
    return (
      <button className={type} onClick={() => setChecked(!checked)}>
        {checked ? (
          <img alt="important" src={tools.Important} />
        ) : (
          <img alt="notImportant" src={tools.NotImportant} />
        )}
      </button>
    );
  } else {
    return (
      <button className="checkbox" onClick={() => setChecked(!checked)}>
        {checked ? <img alt="checked" src={tools.Checked} /> : <img alt="unselected" src={tools.Unselected} />}
      </button>
    );
  }
}

export default Checkbox;
