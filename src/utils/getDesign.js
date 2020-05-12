import React from "react";
import ContentEditable from "react-contenteditable";
import { Textfit } from "react-textfit";

import TextBox from "./TextBox";
import { getLineBreak } from "./getLineBreak";
import { parseContent } from "./parseContent";
import { groupTexts } from "./groupTexts";
import { getStyle } from "./getStyle";
import { addLineBreak } from "./addLineBreak";
import { getFontSize } from "./getFontSize";
import { getTextHeights } from "./getTextHeight";

export const getDesign = (blocks) => {
  var design = [];
  var blocks = getStyle(blocks);
  
  design.push(<ContentEditable key={blocks[0].id} id={blocks[0].id} html={blocks[0].html} level={blocks[0].level} style={blocks[0].style}/>)
  for (let block of blocks.slice(1)) {
    let part = [];
    for (let content of block) {
      part.push(
        <ContentEditable key={content.id} id={content.id} html={content.html} level={content.level} style={content.style}/>
      )
    }
    design.push(part);
  }

  return design;
}
