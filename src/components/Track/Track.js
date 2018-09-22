import React, { Component } from "react";

export default class Track extends Component {
  handleClick = () => {
    this.props.onSaveToPlaylist(this.props.track);
  };

  render() {
    return (
      <li key={this.props.track.name}>
        <p>{this.props.track.name}</p>
        <p>{this.props.track.durationInSeconds}</p>
        <button onClick={this.handleClick}>Save to playlist</button>
      </li>
    );
  }
}
