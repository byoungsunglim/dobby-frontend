import React from "react";
import ContentEditable from "react-contenteditable";
import { Textfit } from "react-textfit";

import Content from "../components/Content";
import ContentBox from "../components/ContentBox";
import { getLineBreak } from "./getLineBreak";
import { parseContent } from "./parseContent";
import { groupTexts } from "./groupTexts";
import { getStyles } from "./getStyles";
import { addLineBreak } from "./addLineBreak";
import { getFontSize } from "./getFontSize";
import { getTextHeights } from "./getTextHeight";

export const getDesign = (blocks, props) => {
  var design = [];
  let styles = getStyles(blocks);
  // console.log(styles)

  for (let i = 0; i < blocks.length; i++) {
    let part = [];
    for (let content of blocks[i]) {
      part.push(
        <ContentBox content={content} {...props}/>
      )
    }
    design.push(
      <div className="block" style={styles[i]}>
        {part}
      </div>
    );
  }

  return design;
}
