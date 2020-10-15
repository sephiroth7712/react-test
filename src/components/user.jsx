import React, { Component } from "react";
import firebase from "./firebase";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, user: props.user.account, apps: [] };
    this.togglePanel = this.togglePanel.bind(this);
  }
  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }
  componentDidMount() {
    const accRef = firebase.database().ref("accounts");
    const { user } = this.state;
    accRef
      .orderByKey()
      .equalTo(user)
      .on("value", (snapshot) => {
        let acc = snapshot.toJSON();
        let newState = [];
        let apps = acc[user].apps;
        for (let app in apps) {
          newState.push({ id: app, title: apps[app].title });
        }
        this.setState({ apps: newState });
      });
  }
  componentDidUpdate() {
    var content = document.getElementById(this.props.user.account);
    if (!this.state.open) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <button
          onClick={(e) => this.togglePanel(e)}
          className={`collapsible ${this.state.open ? "selected" : ""}`}
        >
          <h3>{user.name}</h3>
          <h6>{user.account}</h6>
        </button>
        <div id={user.account} className="app-content">
          {this.state.apps.map((app) => (
            <div key={user.account} className="app-card">
              <h3 className="title">{app.title}</h3>
              <h6 className="appID">{app.id}</h6>
              <div className="rating">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default User;
