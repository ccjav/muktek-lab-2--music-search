import React, { Component } from "react";

export default class Playlist extends Component {
  state = {
    playlist: null,
    loading: true,
    error: null
  };

  componentDidMount() {
    this.loadPlaylist();
  }

  loadPlaylist = () => {
    this.setState({
      loading: true,
      error: null
    });

    fetch(
      `https://react-api-lab.herokuapp.com/playlists/${
        this.props.match.params.playlistId
      }`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          playlist: data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false
        });
      });
  };

  render() {
    const { loading, playlist, error } = this.state;
    return (
      <div>
        {loading && <p>Loading playlist...</p>}
        {!loading &&
          playlist && (
            <React.Fragment>
              <ul>
                {playlist.data.map(song => (
                  <li key={song.track.name}>
                    <strong>{song.track.name}</strong> from{" "}
                    {song.track.artist.name}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          )}
      </div>
    );
  }
}
