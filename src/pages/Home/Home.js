import React, { Component } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../../components/SearchBar";

export default class Home extends Component {
  state = {
    searching: false,
    artists: null,
    error: null
  };

  handleCreateQuery = query => {
    this.setState({
      searching: true,
      error: null
    });

    fetch(`https://react-api-lab.herokuapp.com/search?query=${query}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          searching: false,
          artists: data
        });
      })
      .catch(error => {
        this.setState({
          searching: false,
          error: error
        });
      });
  };

  render() {
    const { searching, artists } = this.state;

    return (
      <React.Fragment>
        <SearchBar onCreateQuery={this.handleCreateQuery} />
        {!searching &&
          artists && (
            <ul>
              {artists.data.map(artist => (
                <li key={artist.name}>
                  <Link to={`/artists/${artist.id}`}>
                    <img src={artist.imageUrl} alt="Artist" />
                    {artist.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
      </React.Fragment>
    );
  }
}
