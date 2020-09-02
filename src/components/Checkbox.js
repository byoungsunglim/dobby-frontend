import React, { useState } from "react";

import tools from "../utils/tools";

import "../assets/css/Checkbox.scss";

function Checkbox({ type, is_checked }) {
  const [checked, setChecked] = useState(is_checked || false);

  if (type.includes("select")) {
    return (
      <button className={type} onClick={() => setChecked(!checked)}>
        {checked ? <img src={tools.Checked} /> : <img src={tools.Unselected} />}
      </button>
    );
  } else if (type.includes("important")) {
    return (
      <button className={type} onClick={() => setChecked(!checked)}>
        {checked ? (
          <img src={tools.Important} />
        ) : (
          <img src={tools.NotImportant} />
        )}
      </button>
    );
  } else {
    return (
      <button className="checkbox" onClick={() => setChecked(!checked)}>
        {checked ? <img src={tools.Checked} /> : <img src={tools.Unselected} />}
      </button>
    );
  }
}

export default Checkbox;
