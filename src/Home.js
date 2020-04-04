import React, { Component } from "react";

import { db } from "./firebase.js";
import Navigation from "./Navigation.js";
import Information from "./Information.js";
import Document from "./Document.js";
import Canvas from "./Canvas.js";
import Toolbar from "./Toolbar.js";
import { DocumentLoader, ImageLoader } from './utils/getLoader.js';

import "./assets/css/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.setView = this.setView.bind(this);
    this.setContents = this.setContents.bind(this);
    this.setDocument = this.setDocument.bind(this);
    this.setDesign = this.setDesign.bind(this);

    this.state = {
      view: "document",
      cur_page: "page_title",
      contents: [],
      document: [
        {
          page: "page_title",
          content: []
        }
      ],
      design: [
        {
          page: 0,
          design: []
        }
      ],
      initialized: false
    };
  }

  componentDidMount() {
    console.log("Home Mounted...");
    var docRef = db.collection("drafts").doc("myDraft");
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState(doc.data(), () => {
            this.interval = setInterval(() => {
              docRef
                .set(JSON.parse(JSON.stringify(this.state)))
                .then(function() {
                  console.log("Document successfully written!");
                });
            }, 5000);
          });
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          this.setState({
            initialized: true
          }, () => {
            docRef
            .set(JSON.parse(JSON.stringify(this.state)))
            .then(function() {
              console.log("Document initialized!");
              this.interval = setInterval(() => {
                docRef
                  .set(JSON.parse(JSON.stringify(this.state)))
                  .then(function() {
                    console.log("Document successfully written!");
                  });
              }, 5000);
            }.bind(this));
          })
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setView = () => {
    this.setState({
      view: this.state.view === "document" ? "canvas" : "document"
    });
  };

  setPage = cur_page => {
    this.setState({
      cur_page: cur_page
    });
  };

  setContents = (handle, id, data) => {
    const { contents } = this.state;
    switch (handle) {
      case "update":
        this.setState({
          contents: contents.map(content =>
            id === content.id ? { ...content, ...data } : content
          )
        });
        break;
      case "add":
        this.setState({
          contents: contents.concat({
            id: id,
            title: data.title,
            indent: data.indent,
            pages: data.pages
          })
        });
        break;
      case "remove":
        this.setState({
          contents: contents.filter(idx => idx.id !== id)
        });
        break;
      case "set":
        this.setState({
          contents: data
        });
        break;
      default:
    }
  };

  setDocument = (handle, page, data) => {
    const { document } = this.state;
    switch (handle) {
      case "update":
        this.setState({
          document: document.map(content =>
            page === content.page ? { ...content, ...data } : content
          )
        });
        break;
      case "add":
        this.setState({
          document: document.concat({
            page: page,
            content: []
          })
        });
        break;
      case "remove":
        this.setState({
          document: document.filter(content => content.page !== page)
        });
        break;
      case "set":
      default:
    }
  };

  setDesign = (handle, page, data) => {
    const { design } = this.state;
    switch (handle) {
      case "update":
        this.setState({
          design: design.map(d => (page === d.page ? { ...d, ...data } : d))
        });
        break;
      case "add":
        this.setState({
          design: design.concat({
            page: design.length,
            design: data
          })
        });
        break;
      case "remove":
        this.setState({
          design: design.filter(d => d.page !== page)
        });
        break;
      case "set":
      default:
    }
  };

  render() {
    return (
      <div id="home">
        <Navigation {...this} {...this.state} />
        {this.state.initialized ? 
          (this.state.view === "document" ? 
            <Document {...this} {...this.state} /> : <Canvas {...this} {...this.state} />)
          : <DocumentLoader/>
        }
        <Information />
        <Toolbar />
      </div>
    );
  }
}

export default Home;
