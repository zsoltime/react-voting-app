import React, { Component } from 'react';

import PollList from 'PollList';
import AddPoll from 'AddPoll';

class PollApp extends Component {
  constructor() {
    super();
    this.state = {
      polls: [{
        id: 1,
        title: 'What Is Your Favourite Ice Cream?',
        options: [
          'Vanilla',
          'Strawberry',
          'Chocolate',
        ],
      }, {
        id: 2,
        title: 'Pepsi or Coke?',
        options: [
          'Pepsi',
          'Coke',
        ],
      }, {
        id: 3,
        title: 'What\'s Your Favourite Brand of Coffee?',
        options: [
          'Lavazza',
          'Costa Coffee',
          'Caffe Nero',
        ],
      }],
    };
    this.handleAddPoll = this.handleAddPoll.bind(this);
  }
  handleAddPoll({ title, options }) {
    const polls = [
      ...this.state.polls, {
        id: this.state.polls[this.state.polls.length - 1].id + 1,
        title,
        options,
      },
    ];
    this.setState({
      polls,
    });
  }
  render() {
    return (
      <div>
        <h1>Poll App</h1>
        <PollList polls={this.state.polls} />
        <AddPoll onAddPoll={this.handleAddPoll} />
      </div>
    );
  }
}

export default PollApp;
