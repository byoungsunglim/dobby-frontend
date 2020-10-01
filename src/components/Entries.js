import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import FileCard from "./FileCard";
import FileList from "./FileList";
import { makeCancelable } from "../utils/makeCancelable";
import { queryDB } from "../utils/queryDB";
import { queryDrive } from "../utils/queryDrive";

import "../assets/css/Entries.scss";

class Entries extends Component {
  state = {
    entries: [],
    orderBy: "",
    view: "",
    limit: 5,
  };

  componentDidMount() {
    console.log("Entries Mounted...");
    queryDB("get", "user", this.props.user.email).then((user) => {
      if (user.setting) {
        this.setState(user.setting, this.handleEntries);
      } else {
        queryDB("put", "user", this.props.user.email, {
          setting: {
            orderBy: "modifiedAt",
            view: "list",
          },
        }).then((result) => {
          this.setState(
            {
              orderBy: "modifiedAt",
              view: "list",
            },
            this.handleEntries
          );
        });
      }
    });
  }

  handleClick = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case "card_view":
        document.getElementById("card_view").setAttribute("style", "border: solid 1.2px #51a2e9; color: #51a2e9");
        document.getElementById("list_view").setAttribute("style", "");
        this.setState({
          view: 'card'
        }, this.handleEntries)
        queryDB("put", "user", this.props.user.email, {
          setting: {
            view: "card",
          },
        });
        break;
      case "list_view":
        document.getElementById("card_view").setAttribute("style", "");
        document.getElementById("list_view").setAttribute("style", "border: solid 1.2px #51a2e9; color: #51a2e9");
        this.setState({
          view: 'list'
        }, this.handleEntries)
        queryDB("put", "user", this.props.user.email, {
          setting: {
            view: "list",
          },
        });
        break;
      case "entries_selection":
        document.getElementById("entries_dropdown").setAttribute('style', 'display:visible')
        break;
      case "entries_selection_title":
        document.getElementById("entries_dropdown").setAttribute('style', 'display:visible')
        break;
      case "entries_selection_arrow":
        document.getElementById("entries_dropdown").setAttribute('style', 'display:visible')
        break;
      case "orderBy_modifiedAt":
        queryDB("put", "user", this.props.user.email, {
          setting: {
            orderBy: "modifiedAt",
          },
        }).then((result) => {
          this.setState(
            {
              orderBy: "modifiedAt",
            },
            this.handleEntries
          );
        });
        break;
      case "orderBy_modifiedByMeAt":
        queryDB("put", "user", this.props.user.email, {
          setting: {
            orderBy: "modifiedByMeAt",
          },
        }).then((result) => {
          this.setState(
            {
              orderBy: "modifiedByMeAt",
            },
            this.handleEntries
          );
        });
        break;
      case "orderBy_viewedAt":
        queryDB("put", "user", this.props.user.email, {
          setting: {
            orderBy: "viewedAt",
          },
        }).then((result) => {
          this.setState(
            {
              orderBy: "viewedAt",
            },
            this.handleEntries
          );
        });
        break;
      default:
    }
  };

  handleEntries = () => {
    document.getElementById(this.state.view + "_view").setAttribute("style", "border: solid 1.2px #51a2e9; color: #51a2e9");
    queryDB("get", "recents", this.props.user.email, {
      orderBy: this.state.orderBy,
      limit: this.state.limit,
    }).then((docs) => {
      if (docs) {
        let recents = [];
        for (let doc of docs) {
          if (this.state.view === "list") {
            recents.push(<FileList doc={doc} />);
          } else {
            recents.push(<FileCard doc={doc} />);
          }
        }
        this.setState({
          entries: recents,
        }, this.handleFlex);
      } else {
        //TODO: handle where there is no recent files
      }
    });
  };

  handleFlex = () => {
    if (this.state.view === 'card') {
      document.getElementById("entries_body").setAttribute("style", "display: flex")
    }
    else {
      document.getElementById("entries_body").setAttribute("style", "")
    }
  }

  render() {
    return (
      <div id="entries" onClick={(e) => this.handleClick(e)}>
        <div className="showHide" id="entries_header">
          <span id="entries_title">파일/폴더</span>
          <div className="showHide" id="entries_selection">
            <span id="entries_selection_title">전체</span>
            <div className="arrow_down" id="entries_selection_arrow"></div>
            <div className="hideOnOut" id="entries_dropdown" style={{display: 'none'}}>
              <div className="entries_options_title">순서</div>
              <div className="entries_options" id="orderBy_modifiedAt">최근 변경된 파일순</div>
              <div className="entries_options" id="orderBy_modifiedByMeAt">내가 최근 변경한 파일순</div>
              <div className="entries_options" id="orderBy_viewedAt">내가 최근 열어본 파일순</div>
            </div>
          </div>
          <div id="entries_view">
            <span id="card_view">카드</span>
            <span id="list_view">리스트</span>
          </div>
        </div>
        <div id="entries_body">{this.state.entries}</div>
      </div>
    );
  }
}

export default withRouter(Entries);
