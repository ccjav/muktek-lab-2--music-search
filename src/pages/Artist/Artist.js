import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Artist extends Component {
  state = {
    artist: null,
    loading: true,
    error: null
  };

  componentDidMount() {
    this.loadArtist();
  }

  loadArtist = () => {
    this.setState({
      loading: true,
      error: null
    });

    fetch(
      `https://react-api-lab.herokuapp.com/artists/${
        this.props.match.params.artistId
      }`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          artist: data,
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
    const { loading, artist, error } = this.state;

    return (
      <div>
        {loading && <p>Loading artist...</p>}
        {!loading &&
          artist && (
            <React.Fragment>
              <div>
                <img src={artist.data.imageUrl} />
                <p>{artist.data.bio}</p>
              </div>
              <div>
                <ul>
                  {artist.data.albums.map(album => (
                    <li>
                      <Link to={`/albums/${album.id}`}>
                        <img src={album.imageUrl} />
                        <p>{album.name}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </React.Fragment>
          )}
      </div>
    );
  }
}
