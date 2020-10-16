import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import firebase from "./firebase";
class AppCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appId: this.props.app.id,
      title: this.props.app.title,
      rating: this.props.app.rating,
    };
    // this.togglePanel = this.togglePanel.bind(this);
  }
  ratingChanged = (newRating) => {
    this.setState({ rating: newRating });
  };
  componentDidUpdate() {
    const ratingRef = firebase.database().ref("rating");
    ratingRef.child(this.state.appId).update({ rating: this.state.rating });
  }
  render() {
    return (
      <div className="app-card">
        <h3 className="title">{this.props.app.title}</h3>
        <h6 className="appID">{this.props.app.id}</h6>
        <div style={{ position: "absolute", top: "150px", left: "20px" }}>
          <ReactStars
            count={5}
            activeColor="#ffd700"
            onChange={this.ratingChanged}
            value={this.state.rating}
          />
        </div>
      </div>
    );
  }
}

export default AppCards;
