import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PollSearch extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch() {
    const searchText = this.searchText.value.toLowerCase();
    const showFinished = this.showFinished.checked;

    this.props.onSearch({
      searchText,
      showFinished,
    });
  }
  render() {
    return (
      <div className="">
        <input
          type="search"
          placeholder="Search polls"
          ref={(node) => { this.searchText = node; }}
          onChange={this.handleSearch}
        />
        <input
          type="checkbox"
          id="finished"
          ref={(node) => { this.showFinished = node; }}
          onChange={this.handleSearch}
        />
        <label htmlFor="finished">Show finished polls</label>
      </div>
    );
  }
}

PollSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default PollSearch;
