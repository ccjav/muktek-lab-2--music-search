import React, { Component } from "react";

export default class SearchBar extends Component {
  searchRef = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    const query = this.searchRef.current.value;

    this.props.onCreateQuery(query);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={this.searchRef} id="searchbar" />
        <button>Search</button>
      </form>
    );
  }
}
