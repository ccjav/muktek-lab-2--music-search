import React, { Component } from "react";

import Track from "../../components/Track";
import { PLAYLIST_ID } from "../../constants";

export default class Album extends Component {
  state = {
    album: null,
    loading: true,
    error: null
  };

  componentDidMount() {
    this.loadAlbum();
  }

  loadAlbum = () => {
    this.setState({
      loading: true,
      error: null
    });

    fetch(
      `https://react-api-lab.herokuapp.com/albums/${
        this.props.match.params.albumId
      }`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          album: data,
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

  handleSaveToPlaylist = track => {
    console.log(track);
    fetch(`https://react-api-lab.herokuapp.com/playlists/${PLAYLIST_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        track
      })
    })
      .then(response => {
        this.setState({
          saving: false
        });
      })
      .catch(error => {
        this.setState({
          saving: false,
          error: error
        });
      });
  };

  render() {
    const { loading, album, error } = this.state;

    return (
      <div>
        {loading && <p>Loading album...</p>}
        {!loading &&
          album && (
            <React.Fragment>
              <div>
                <h1>{album.data.name}</h1>
                <img src={album.data.imageUrl} alt="Album" />
              </div>
              <div>
                <h2>TRACKS</h2>
                <ol>
                  {album.data.tracks.map(track => (
                    <Track
                      key={track.name}
                      track={track}
                      onSaveToPlaylist={this.handleSaveToPlaylist}
                    />
                  ))}
                </ol>
              </div>
            </React.Fragment>
          )}
      </div>
    );
  }
}
