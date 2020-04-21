import React, { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { getDesign } from './utils/getDesign.js';
import ContentEditable from "react-contenteditable";

import "./assets/css/Canvas.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Canvas extends Component {
  state = {
    design: null
  }
  
  componentDidMount() {
    let design = getDesign(this.props.cur_page, this.props.document[this.props.document.findIndex(content => content.page === this.props.cur_page)].content, this.props);
    this.props.setDesign("update", this.props.cur_page, {design: design})
    this.setState({
      design: design
    })
  }

  render() {
    // const layouts =  {
    //   lg: [
    //     {i: 'a', x: 0, y: 0, w: 24, h: 0.5,},
    //     {i: 'b', x: 1, y: 0, w: 3, h: 1},
    //   ]
    // }
    
    return (
        <div id="background-canvas" onClick={this.handleClick}>
            <div id="canvas">
              {/* <ResponsiveReactGridLayout
                  cols={{lg: 12, md: 24, sm: 24, xs: 24, xxs: 24}}
                  layouts={layouts}
                  rowHeight={150}
                  // onBreakpointChange={this.onBreakpointChange}
                  onLayoutChange={this.onLayoutChange}
                  compactType="vertical"
                  verticalCompact={true}
                >
                  <div key="a">a</div>
                  <div key="b"><ContentEditable html={"abc"}/></div>
                  
              </ResponsiveReactGridLayout> */}
               {this.state.design}
            </div>
        </div>
    );
  }
}

export default Canvas;
