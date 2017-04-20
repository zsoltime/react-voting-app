import React from 'react';

import PollList from 'PollList';

const polls = [{
  id: 1,
  title: 'What Is Your Favourite Ice Cream?',
}, {
  id: 2,
  title: 'Pepsi or Coke?',
}, {
  id: 3,
  title: 'What\'s Your Favourite Brand of Coffee?',
}];

const PollApp = () => (
  <div>
    <h1>Poll App</h1>
    <PollList polls={polls} />
  </div>
);

export default PollApp;
