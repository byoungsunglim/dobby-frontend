import React, { Component } from "react";

import Navigation from "./Navigation";
import Information from "./Information";
import Draft from "./Draft";
import Canvas from "./Canvas";
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
    this.setPage = this.setPage.bind(this);
    this.setDraft = this.setDraft.bind(this);
    this.setDesign = this.setDesign.bind(this);

    this.state = {
      view: "draft",
      cur_page: "title",
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

  setPage = (cur_page) => {
    this.setState({
      cur_page: cur_page
    });
  };

  setDraft = (handle, id, data) => {
    // console.log(handle, id, data);
    const { draft } = this.state;
    switch (handle) {
      case 'update':
        this.setState({
          draft: this.state.draft.map(
            content => content.id === id
              ? {...content, ...data}
              : content
          )
        })
        break;
      case 'add':
        // if (insertAfter !== -1) {
        //   console.log("content insert")
          
        //   this.setState({
        //     content: this.state.content.slice(0, insertAfter+1).concat(new_body).concat(this.state.content.slice(insertAfter+1))
        //   }, () => {
        //     document.getElementById(id).focus();
        //     this.props.setDraft('update', this.props.page, {content: this.state.content})
        //   }); //TODO: list type insert before removes list tag... debug needed
        // }
        // break;
      case 'remove':
        this.setState({
          content: this.state.content.filter(body => body.id !== id)
        }, () => {
          this.props.setDraft('update', this.props.page, {content: this.state.content})
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
        {this.state.initialized ? 
          (this.state.view === "draft" ? 
            <Draft {...this} {...this.state} /> : <Canvas {...this} {...this.state} />)
           : <DocumentLoader/>
        }
        <Information />
        <Toolbar />
      </div>
    );
  }
}

export default Document;
