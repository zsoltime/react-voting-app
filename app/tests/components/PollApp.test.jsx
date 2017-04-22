import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import uuid from 'node-uuid';

import AddPoll from 'AddPoll';
import PollApp from 'PollApp';
import PollList from 'PollList';
import PollSearch from 'PollSearch';

describe('PollApp', () => {
  beforeEach(() => {
    localStorage.removeItem('reactPolls');
  });

  it('should exist', () => {
    expect(PollApp).toExist();
  });

  const polls = [{
    id: uuid(),
    title: 'Test title 1',
    options: ['yes', 'no'],
    isFinished: false,
  }, {
    id: uuid(),
    title: 'Test title 2',
    options: ['yes', 'no'],
    isFinished: false,
  }];

  describe('render', () => {
    it('should render PollList component', () => {
      const pollApp = shallow(<PollApp />);

      expect(pollApp.find(PollList).length).toBe(1);
    });

    it('should render AddPoll component', () => {
      const pollApp = shallow(<PollApp />);

      expect(pollApp.find(AddPoll).length).toBe(1);
    });

    it('should render PollSearch component', () => {
      const pollApp = shallow(<PollApp />);

      expect(pollApp.find(PollSearch).length).toBe(1);
    });
  });

  describe('handleAddPoll', () => {
    it('should add poll to state', () => {
      const pollApp = shallow(<PollApp />);
      const poll = polls[0];

      expect(pollApp.state('polls').length).toBe(0);

      pollApp.instance().handleAddPoll(poll);
      expect(pollApp.state('polls').length).toBe(1);

      const lastItem = pollApp.state('polls')[pollApp.state('polls').length - 1];
      expect(lastItem.title).toEqual(poll.title);
      expect(lastItem.options).toEqual(poll.options);
    });
  });

  describe('handleSearch', () => {
    it('should set state correctly', () => {
      const pollApp = shallow(<PollApp />);
      const search = {
        showFinished: true,
        searchText: 'test',
      };

      expect(pollApp.state('showFinished')).toBe(false);
      expect(pollApp.state('searchText')).toBe('');

      pollApp.instance().handleSearch(search);
      expect(pollApp.state('showFinished')).toBe(search.showFinished);
      expect(pollApp.state('searchText')).toBe(search.searchText);
    });
  });

  describe('handleDeletePoll', () => {
    it('should remove poll from state', () => {
      const pollApp = shallow(<PollApp />);

      pollApp.setState({ polls });

      expect(pollApp.state('showFinished')).toBe(false);
      expect(pollApp.state('searchText')).toBe('');
      expect(pollApp.state('polls').length).toBe(polls.length);

      pollApp.instance().handleDeletePoll(polls[0].id);
      expect(pollApp.state('polls').length).toBe(polls.length - 1);
      expect(pollApp.state('polls')[0]).toEqual(polls[1]);
    });
  });

  describe('handlePausePoll', () => {
    it('should toggle isFinished status', () => {
      const pollApp = shallow(<PollApp />);

      pollApp.setState({ polls });

      expect(pollApp.state('showFinished')).toBe(false);
      expect(pollApp.state('searchText')).toBe('');
      expect(pollApp.state('polls').length).toBe(polls.length);
      expect(pollApp.state('polls')[0]).toEqual(polls[0]);

      pollApp.instance().handlePausePoll(polls[0].id);
      expect(pollApp.state('polls')[0].isFinished).toBe(!polls[0].isFinished);
      expect(pollApp.state('polls')[1].isFinished).toBe(polls[1].isFinished);
    });
  });
});
