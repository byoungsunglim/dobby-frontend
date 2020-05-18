import React from 'react';

import "./assets/css/Resizer.css";

function Resizer({}) {
  const handleDrag = (e) => {
    const window_width = window.innerWidth;
    const navigation_width = document.getElementById("navigation").clientWidth;
    if (e.pageX >= navigation_width && e.pageX <= window_width) {
      document.getElementById("draft").style.width = `${e.pageX - navigation_width}px`;
      document.getElementById("canvas").style.width = `${window_width - e.pageX}px`;
    }
  }

  return (
      <div id="resizer" onDrag={(e) => handleDrag(e)}>
        <div id="handle"></div>
      </div>
  );
}

export default Resizer;