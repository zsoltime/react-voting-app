import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Poll from 'Poll';

describe('Poll', () => {
  it('should exist', () => {
    expect(Poll).toExist();
  });

  describe('render', () => {
    const title = 'Test title';
    it('should display poll title', () => {
      const poll = shallow(<Poll title={title} />);
      const li = poll.find('li');

      expect(li.length).toBe(1);
      expect(li.text()).toBe(title);
    });
  });
});
