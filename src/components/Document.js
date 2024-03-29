import React, { Component } from "react";

import Navigation from "./Navigation";
import Draft from "./Draft";
import Design from "./Design";
import Resizer from "./Resizer";
import { DocumentLoader, ImageLoader } from '../utils/getLoader';
import { queryDB } from "../utils/queryDB";
import { makeCancelable } from '../utils/makeCancelable';

import "../assets/css/Document.css";

class Document extends Component {
  constructor(props) {
    super(props);

    this.setTitle = this.setTitle.bind(this);
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
        modifiedAt: new Date()
      }).then(() => {
        this.setState({
          updateDB: false
        })
      })
    }
  }

  setTitle = (title) => {
    this.setState({
      title: title
    })
  }

  setDraft = (handle, id, data, idx) => {
    // console.log(handle, id, data);
    const { draft } = this.state;
    switch (handle) {
      case 'update':
        this.setState({
          draft: draft.map(
            content => content.id === id
              ? {...content, ...data}
              : content
          ),
          updateDB: true
        })
        break;
      case 'add':
        this.setState({
          draft: draft.slice(0, idx+1).concat(data).concat(draft.slice(idx+1)),
          updateDB: true
        });
        break;
      case 'remove':
        this.setState({
          draft: draft.filter(content => content.id !== id),
          updateDB: true
        })
        break;
      case "set":
        this.setState({
          draft: data,
          updateDB: true
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
      </div>
    );
  }
}

export default Document;
