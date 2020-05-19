import React, { Component } from "react";

import Navigation from "./Navigation";
import Information from "./Information";
import Draft from "./Draft";
import Design from "./Design";
import Resizer from "./Resizer";
import Toolbar from "./Toolbar";
import { DocumentLoader, ImageLoader } from './utils/getLoader';
import { makeCancelable } from './utils/makeCancelable';

import "./assets/css/Document.css";
import { queryDB } from "./utils/queryDB";

class Document extends Component {
  constructor(props) {
    super(props);

    this.setView = this.setView.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setCurId = this.setCurId.bind(this);
    this.setDraft = this.setDraft.bind(this);
    this.setDesign = this.setDesign.bind(this);

    this.state = {
      view: "draft",
      draft: [],
      design: [],
      initialized: false,
      updateDB: false
    };
  }

  componentDidMount() {
    console.log("Document Mounted...");
    this.queryDB = makeCancelable(queryDB('get', 'doc', this.props.match.params.id));
    this.queryDB.promise.then((doc) => {
      this.setState({
        initialized: true,
        ...doc
      }, () => {
        this.interval = setInterval(this.setDB, 3000);
      })
    })
  }

  componentWillUnmount() {
    console.log("Document Unmounting...");
    clearInterval(this.interval);
    this.queryDB.cancel();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title || prevState.draft !== this.state.draft || prevState.design !== this.state.design) {
      // console.log("Home updated...")
      this.setState({
        updateDB: true
      })
    }  
  }

  setDB = () => {
    if (this.state.updateDB) {
      queryDB("set", "doc", this.state.id, {
        title: this.state.title,
        draft: this.state.draft,
        design: this.state.design,
        updatedAt: new Date()
      }).then(() => {
        this.setState({
          updateDB: false
        })
      })
    }
  }

  setView = () => {
    this.setState({
      view: this.state.view === "draft" ? "canvas" : "draft"
    });
  };

  setTitle = (title) => {
    this.setState({
      title: title
    })
  }

  setCurId = (id) => {
    this.setState({
      cur_id: id
    });
  };

  setDraft = (handle, id, data, idx) => {
    // console.log(handle, id, data);
    const { draft } = this.state;
    switch (handle) {
      case 'update':
        this.setState({
          cur_id: id,
          draft: draft.map(
            content => content.id === id
              ? {...content, ...data}
              : content
          )
        })
        break;
      case 'add':
        this.setState({
          draft: draft.slice(0, idx+1).concat(data).concat(draft.slice(idx+1))
        });
        break;
      case 'remove':
        this.setState({
          draft: draft.filter(content => content.id !== id)
        })
        break;
      case "set":
        this.setState({
          draft: data
        })
      default:
    }
  };

  setDesign = (handle, id, data) => {
    const { design } = this.state;
    switch (handle) {
      case "update":
        this.setState({
          design: design.map(d => (id === d.id ? { ...d, ...data } : d))
        });
        break;
      case "add":
        this.setState({
          design: design.concat({
            id: id,
            design: data
          })
        });
        break;
      case "remove":
        this.setState({
          design: design.filter(d => d.id !== id)
        });
        break;
      case "set":
      default:
    }
  };

  render() {
    return (
      <div id="document">
        <Navigation view={this.state.view} setView={this.setView} />
        {this.state.initialized ? [
          <Draft {...this} {...this.state} />,
          <Resizer/>,
          <Design {...this} {...this.state} />
        ]: <DocumentLoader/>
        }
        <Toolbar />
      </div>
    );
  }
}

export default Document;
