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

export const getDesign = (blocks, props) => {
  var design = [];
  var blocks = getStyle(blocks);
  
  for (let block of blocks) {
    let part = [];
    for (let content of block) {
      part.push(
        <TextBox content={content} {...props}/>
      )
    }
    design.push(part);
  }

  return design;
}
