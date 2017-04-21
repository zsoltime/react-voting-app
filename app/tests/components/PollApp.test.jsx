import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AddPoll from 'AddPoll';
import PollApp from 'PollApp';
import PollList from 'PollList';
import PollSearch from 'PollSearch';

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

    it('should render PollSearch component', () => {
      const pollApp = shallow(<PollApp />);

      expect(pollApp.find(PollSearch).length).toBe(1);
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
});
