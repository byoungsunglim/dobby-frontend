import React, { useState } from "react";

import tools from "../utils/tools";

import "../assets/css/Checkbox.css";

function Checkbox() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="checkbox">
      {selected ? (
        <tools.Selected onClick={() => setSelected(false)} />
      ) : (
        <button onClick={() => setSelected(true)}></button>
      )}
    </div>
  );
}

export default Checkbox;
