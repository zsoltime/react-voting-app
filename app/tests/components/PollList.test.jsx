import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import PollList from 'PollList';
import Poll from 'Poll';

describe('PollList', () => {
  it('should exist', () => {
    expect(PollList).toExist();
  });

  describe('render', () => {
    const polls = [{
      id: 1,
      title: 'Test Poll #1',
    }, {
      id: 2,
      title: 'Test Poll #2',
    }, {
      id: 3,
      title: 'Test Poll #3',
    }];

    it('should render the correct number of polls', () => {
      const pollList = shallow(<PollList polls={polls} />);

      expect(pollList.find(Poll).length).toBe(3);
    });
  });
});
