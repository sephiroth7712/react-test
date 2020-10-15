import React, { Component } from "react";
import "./App.css";
import firebase from "./components/firebase";
import User from "./components/user";
import UserApps from "./components/userApps";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      apps: [],
      active: "accounts",
      open: true,
    };
    this.setAccounts = this.setAccounts.bind(this);
    this.setApps = this.setApps.bind(this);
    this.openDash = this.openDash.bind(this);
  }
  openDash() {
    this.setState({ open: !this.state.open });
  }
  renderContent() {
    if (this.state.active === "accounts") {
      return (
        <div className="content" id="accounts">
          <div className="header">
            <div className="content-title">Users</div>
            <div className="line">
              <hr />
            </div>
          </div>
          {this.state.users.map((user) => (
            <User key={user.account} user={user} />
          ))}
        </div>
      );
    } else if (this.state.active === "apps") {
      return (
        <div className="content" id="apps">
          <div className="header">
            <div className="content-title">Apps</div>
            <div className="line">
              <hr />
            </div>
          </div>
          {this.state.apps.map((app) => (
            <UserApps
              key={app.appId}
              apps={app}
              user={this.state.users.find(function (item) {
                if (item.account === app.account) {
                  return true;
                }
                return false;
              })}
            />
          ))}
        </div>
      );
    }
  }
  setAccounts() {
    this.setState({ active: "accounts" });
  }
  setApps() {
    this.setState({ active: "apps" });
  }
  componentDidMount() {
    const usersRef = firebase.database().ref("users");
    const appRef = firebase.database().ref("accounts");
    usersRef.on("value", (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
        newState.push({
          id: user,
          account: users[user].account,
          name: users[user].name,
        });
      }
      this.setState({
        users: newState,
      });
    });
    appRef.on("value", (snapshot) => {
      let accounts = snapshot.val();
      let newState = [];
      for (let account in accounts) {
        let apps = accounts[account].apps;
        for (let app in apps) {
          newState.push({
            account: account,
            appId: app,
            title: apps[app].title,
          });
        }
      }
      // console.log(newState);
      this.setState({ apps: newState });
    });
  }
  componentDidUpdate() {
    var dash = document.getElementById("dashboard");
    if (this.state.open === true) {
      dash.style.width = "10%";
    } else {
      dash.style.width = "0";
    }
  }
  state = {};
  render() {
    return (
      <div className="container">
        <button onClick={this.openDash} className="openbtn">
          ☰
        </button>
        <div id="dashboard" className="dashboard">
          <div className="navbar">
            <ul className="navbar-nav">
              <li className="nav-items active">
                <button
                  className={
                    "dash-buttons " +
                    (this.state.active === "accounts" ? "dash-selected" : "")
                  }
                  onClick={this.setAccounts}
                >
                  Accounts
                </button>
              </li>
              <li className="nav-items">
                <button
                  className={
                    "dash-buttons " +
                    (this.state.active === "apps" ? "dash-selected" : "")
                  }
                  onClick={this.setApps}
                >
                  Apps
                </button>
              </li>
            </ul>
          </div>
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
