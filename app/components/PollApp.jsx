import React, { Component } from 'react';
import uuid from 'node-uuid';

import PollList from 'PollList';
import AddPoll from 'AddPoll';
import PollSearch from 'PollSearch';

class PollApp extends Component {
  constructor() {
    super();
    this.state = {
      polls: [{
        id: uuid(),
        title: 'What Is Your Favourite Ice Cream?',
        options: [
          'Vanilla',
          'Strawberry',
          'Chocolate',
        ],
        isFinished: true,
      }, {
        id: uuid(),
        title: 'Pepsi or Coke?',
        options: [
          'Pepsi',
          'Coke',
        ],
        isFinished: false,
      }, {
        id: uuid(),
        title: 'What\'s Your Favourite Brand of Coffee?',
        options: [
          'Lavazza',
          'Costa Coffee',
          'Caffe Nero',
        ],
        isFinished: false,
      }],
      showFinished: false,
      searchText: '',
    };
    this.handleAddPoll = this.handleAddPoll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleAddPoll({ title, options }) {
    const polls = [
      ...this.state.polls, {
        id: uuid(),
        title,
        options,
        isFinished: false,
      },
    ];
    this.setState({
      polls,
    });
  }
  handleSearch({ searchText, showFinished }) {
    this.setState({
      searchText,
      showFinished,
    });
  }
  render() {
    const filteredPolls = this.state.polls.filter(poll => (
      poll.title.toLowerCase().indexOf(this.state.searchText) >= 0
    ))
    .filter(poll => (
      poll.isFinished === this.state.showFinished || poll.isFinished === false
    ));
    return (
      <div>
        <h1>Poll App</h1>
        <PollList polls={filteredPolls} />
        <PollSearch onSearch={this.handleSearch} />
        <AddPoll onAddPoll={this.handleAddPoll} />
      </div>
    );
  }
}

export default PollApp;
