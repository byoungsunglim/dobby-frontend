import React, { Component } from "react";

import tools from "../utils/tools";

import "../assets/css/Search.css";

class Search extends Component {
  render() {
    return (
      <div id="search">
        <img src={tools.Search}></img>
        <input placeholder="검색"></input>
      </div>
    );
  }
}

export default Search;
