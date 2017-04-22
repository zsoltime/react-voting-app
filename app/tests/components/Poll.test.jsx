import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import uuid from 'node-uuid';

import Poll from 'Poll';

describe('Poll', () => {
  it('should exist', () => {
    expect(Poll).toExist();
  });

  const item = {
    id: uuid(),
    title: 'Test Title',
    isFinished: false,
    options: ['yes', 'no'],
  };

  describe('render', () => {
    it('should display poll title', () => {
      const poll = shallow(
        <Poll {...item} onPause={f => f} onDelete={f => f} />
      );
      const h3 = poll.find('h3');

      expect(h3.length).toBe(1);
      expect(h3.text()).toBe(item.title);
    });
  });

  describe('callbacks', () => {
    it('should call onPause prop with correct poll ID on click', () => {
      const spy = expect.createSpy();
      const poll = shallow(<Poll {...item} onPause={spy} onDelete={f => f} />);

      poll.find('.btn--pause').simulate('click');
      expect(spy).toHaveBeenCalledWith(item.id);
    });

    it('should call onDelete prop with correct poll ID on click', () => {
      const spy = expect.createSpy();
      const poll = shallow(<Poll {...item} onPause={f => f} onDelete={spy} />);

      poll.find('.btn--delete').simulate('click');
      expect(spy).toHaveBeenCalledWith(item.id);
    });
  });
});
