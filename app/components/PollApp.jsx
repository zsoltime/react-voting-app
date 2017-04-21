import React, { Component } from 'react';
import uuid from 'node-uuid';

import AddPoll from 'AddPoll';
import { setPolls, getPolls, filterPolls } from 'PollAPI';
import PollList from 'PollList';
import PollSearch from 'PollSearch';

class PollApp extends Component {
  constructor() {
    super();
    this.state = {
      polls: getPolls(),
      showFinished: false,
      searchText: '',
    };
    this.handleAddPoll = this.handleAddPoll.bind(this);
    this.handlePausePoll = this.handlePausePoll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidUpdate() {
    setPolls(this.state.polls);
  }
  handleAddPoll({ title, options }) {
    const polls = [
      ...this.state.polls, {
        id: uuid(),
        title,
        options,
        isFinished: false,
        createdAt: new Date().getTime(),
        finishAt: undefined,
      },
    ];
    this.setState({
      polls,
    });
  }
  handlePausePoll(id) {
    const polls = this.state.polls.map((poll) => {
      if (poll.id === id) {
        return Object.assign({}, poll, {
          isFinished: !poll.isFinished,
          finishAt: !poll.isFinished ? new Date().getTime() : undefined,
        });
      }
      return poll;
    });

    this.setState({ polls });
  }
  handleSearch({ searchText, showFinished }) {
    this.setState({
      searchText,
      showFinished,
    });
  }
  render() {
    const { polls, showFinished, searchText } = this.state;
    const filteredPolls = filterPolls(polls, showFinished, searchText);

    return (
      <div>
        <h1>Poll App</h1>
        <PollSearch onSearch={this.handleSearch} />
        <PollList polls={filteredPolls} onPause={this.handlePausePoll} />
        <AddPoll onAddPoll={this.handleAddPoll} />
      </div>
    );
  }
}

export default PollApp;
