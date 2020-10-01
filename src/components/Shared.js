import React, { Component } from "react";
import { queryDB } from "../utils/queryDB";

import "../assets/css/Shared.scss";

class Shared extends Component {
  state = {
    profiles: [],
  };

  async componentWillReceiveProps({ members }) {
    let results = [];

    for (let i = 0; i < members.length; i++) {
      if (i >= 3) {
        results.push(
          <div className="more_member">
            <span>+{members.length - 3}</span>
          </div>
        );

        break;
      }

      let user = await queryDB("get", "user", members[i].id);
      results.push(
        <img
          alt="profile"
          className="shared_member"
          key={this.props.doc.id + members[i].id}
          src={user.profile_image}
          style={{ left: `${30 * i}px`, zIndex: 5 - i }}
        />
      );
    }

    this.setState({
      profiles: results,
    });
  }

  handleClick(e) {}

  render() {
    return (
      <div className="shared" key={this.props.doc.id + "_shared"} onClick={(e) => this.handleClick(e)}>
        {this.state.profiles}
      </div>
    );
  }
}

export default Shared;
