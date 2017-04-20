import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import PollApp from 'PollApp';
import PollList from 'PollList';

describe('PollApp', () => {
  it('should exist', () => {
    expect(PollApp).toExist();
  });

  describe('render', () => {
    it('should render PollList', () => {
      const pollApp = shallow(<PollApp />);

      expect(pollApp.find(PollList).length).toBe(1);
    });
  });
});
