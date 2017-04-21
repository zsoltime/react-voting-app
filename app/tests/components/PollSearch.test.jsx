import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';

import PollSearch from 'PollSearch';

describe('PollSearch', () => {
  it('should exist', () => {
    expect(PollSearch).toExist();
  });

  describe('render', () => {
    it('should render a search field', () => {
      const pollSearch = shallow(<PollSearch onSearch={f => f} />);

      expect(pollSearch.find('input[type="search"]')).toExist();
    });

    it('should render a checkbox', () => {
      const pollSearch = shallow(<PollSearch onSearch={f => f} />);

      expect(pollSearch.find('input[type="checkbox"]')).toExist();
    });
  });

  describe('handleSearch', () => {
    it('should call onSearch prop with entered input text', () => {
      const spy = expect.createSpy();
      const searchText = 'test';
      const pollSearch = mount(<PollSearch onSearch={spy} />);
      const searchField = pollSearch.find('input[type="search"]');

      searchField.node.value = searchText;
      expect(searchField.node.value).toBe(searchText);

      searchField.simulate('change');
      expect(spy).toHaveBeenCalledWith({
        searchText,
        showFinished: false,
      });
    });

    it('should call onSearch prop with correct checked value', () => {
      const spy = expect.createSpy();
      const searchText = '';
      const pollSearch = mount(<PollSearch onSearch={spy} />);
      const showFinished = pollSearch.find('input[type="checkbox"]');

      showFinished.node.checked = true;
      expect(showFinished.node.checked).toBe(true);

      showFinished.simulate('change');
      expect(spy).toHaveBeenCalledWith({
        searchText,
        showFinished: true,
      });
    });
  });
});
