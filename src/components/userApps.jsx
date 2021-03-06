import React, { Component } from "react";
class UserApps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: props.apps.account,
      name: props.user.name,
      appId: props.apps.appId,
      title: props.apps.title,
    };
  }
  render() {
    return (
      <div className="apps">
        <h3>{this.state.title}</h3>
        <h6>{this.state.appId}</h6>
        <h6>By: {this.state.name}</h6>
      </div>
    );
  }
}

export default UserApps;
