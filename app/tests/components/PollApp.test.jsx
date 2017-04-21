import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import PollApp from 'PollApp';
import PollList from 'PollList';
import AddPoll from 'AddPoll';

describe('PollApp', () => {
  it('should exist', () => {
    expect(PollApp).toExist();
  });

  describe('render', () => {
    it('should render PollList component', () => {
      const pollApp = shallow(<PollApp />);

      expect(pollApp.find(PollList).length).toBe(1);
    });

    it('should render AddPoll component', () => {
      const pollApp = shallow(<PollApp />);

      expect(pollApp.find(AddPoll).length).toBe(1);
    });
  });

  describe('handleAddPoll', () => {
    it('should add poll to state', () => {
      const pollApp = shallow(<PollApp />);
      const poll = {
        title: 'Test title',
        options: ['item 1', 'item 2'],
      };

      expect(pollApp.state('polls').length).toBe(3);

      pollApp.instance().handleAddPoll(poll);

      expect(pollApp.state('polls').length).toBe(4);

      const lastItem = pollApp.state('polls')[pollApp.state('polls').length - 1];

      expect(lastItem.title).toEqual(poll.title);
      expect(lastItem.options).toEqual(poll.options);
    });
  });
});
