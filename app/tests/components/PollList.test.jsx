import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import uuid from 'node-uuid';

import PollList from 'PollList';
import Poll from 'Poll';

describe('PollList', () => {
  it('should exist', () => {
    expect(PollList).toExist();
  });

  describe('render', () => {
    const polls = [{
      id: uuid(),
      title: 'Test Poll #1',
      options: ['yes', 'no'],
      isFinished: false,
      createdAt: new Date().getTime(),
    }, {
      id: uuid(),
      title: 'Test Poll #2',
      options: ['yes', 'no'],
      isFinished: false,
      createdAt: new Date().getTime(),
    }, {
      id: uuid(),
      title: 'Test Poll #3',
      options: ['yes', 'no'],
      isFinished: false,
      createdAt: new Date().getTime(),
    }];

    it('should render the correct number of polls', () => {
      const pollList = shallow(
        <PollList polls={polls} onPause={f => f} onDelete={f => f} />
      );

      expect(pollList.find(Poll).length).toBe(3);
    });
  });
});
