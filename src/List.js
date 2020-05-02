import React from "react";

import "./assets/css/List.css";

function List({ type, indent, start, children }) {
  if (type === "ul") {
    return (
      <div className="list">
        <ul indent={indent}>
          {children}
        </ul>
      </div>
    );
  }
  else {
    return (
      <div className="list">
        <ol indent={indent} start={start}>
          {children}
        </ol>
      </div>
    );
  }
}

export default List;