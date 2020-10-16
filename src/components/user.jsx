import React, { Component } from "react";
import firebase from "./firebase";

import AppCards from "./appCards";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      user: props.user.account,
      apps: [],
    };
    this.togglePanel = this.togglePanel.bind(this);
  }
  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }
  componentDidMount() {
    const accRef = firebase.database().ref("accounts");
    const ratingRef = firebase.database().ref("rating");
    const { user } = this.state;
    accRef
      .orderByKey()
      .equalTo(user)
      .on("value", (snapshot) => {
        let acc = snapshot.val();
        let newState = [];
        let apps = acc[user].apps;
        for (let app in apps) {
          ratingRef
            .orderByKey()
            .equalTo(app)
            .on("value", (snapshotRating) => {
              // console.log(snapshotRating.val());
              let rating = snapshotRating.val();
              newState.push({
                id: app,
                title: apps[app].title,
                rating: rating[app].rating,
              });
            });
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
            // <div key={app.id} className="app-card">
            //   <h3 className="title">{app.title}</h3>
            //   <h6 className="appID">{app.id}</h6>
            //   <div style={{ position: "absolute", top: "150px", left: "20px" }}>
            //     <ReactStars
            //       count={5}
            //       activeColor="#ffd700"
            //       onChange={this.ratingChanged}
            //       value={app.rating}
            //     />
            //   </div>
            // </div>
            <AppCards key={app.id} app={app} />
          ))}
        </div>
      </div>
    );
  }
}

export default User;
