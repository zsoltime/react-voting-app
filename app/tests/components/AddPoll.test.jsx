import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';

import AddPoll from 'AddPoll';

describe('AddPoll', () => {
  it('should exist', () => {
    expect(AddPoll).toExist();
  });

  describe('render', () => {
    it('should render a form', () => {
      const addPoll = shallow(<AddPoll onAddPoll={f => f} />);

      expect(addPoll.find('form').length).toBe(1);
    });

    it('should render one input for title and two for options', () => {
      const addPoll = shallow(<AddPoll onAddPoll={f => f} />);

      expect(addPoll.find('input').length).toBe(3);
    });

    it('should add an extra input field if there are no empty ones', () => {
      const addPoll = shallow(<AddPoll onAddPoll={f => f} />);
      const inputs = addPoll.find('input');

      expect(inputs.length).toBe(3);

      addPoll.instance().handleInputChange(0, { target: { value: 'test' } });
      addPoll.instance().handleInputChange(1, { target: { value: 'test' } });
      expect(addPoll.find('input').length).toBe(4);
      addPoll.instance().handleInputChange(2, { target: { value: 'test' } });
      expect(addPoll.find('input').length).toBe(5);
    });
  });

  describe('handleInputChange', () => {
    const options = [
      'test 1',
      'test 2',
      'test 3',
    ];

    it('should update state on input change', () => {
      const addPoll = shallow(<AddPoll onAddPoll={f => f} />);

      expect(addPoll.state('options').length).toBe(2);
      expect(addPoll.state('options')[0]).toBe('');
      expect(addPoll.state('options')[1]).toBe('');

      addPoll.instance().handleInputChange(0, {
        target: { value: options[0] },
      });

      expect(addPoll.state('options')[0]).toBe(options[0]);
      expect(addPoll.state('options')[1]).toBe('');

      addPoll.instance().handleInputChange(1, {
        target: { value: options[1] },
      });

      expect(addPoll.state('options')[0]).toBe(options[0]);
      expect(addPoll.state('options')[1]).toBe(options[1]);
    });

    it('should increase the number of options if there are no empty ones', () => {
      const addPoll = shallow(<AddPoll onAddPoll={f => f} />);

      expect(addPoll.state('options').length).toBe(2);
      expect(addPoll.state('options')[0]).toBe('');
      expect(addPoll.state('options')[1]).toBe('');

      // fill out both => should increase by one
      addPoll.instance().handleInputChange(0, {
        target: { value: options[0] },
      });
      addPoll.instance().handleInputChange(1, {
        target: { value: options[1] },
      });
      expect(addPoll.state('options').length).toBe(3);

      // delete the first value and fill out last one => should not increase
      addPoll.instance().handleInputChange(0, {
        target: { value: '' },
      });
      addPoll.instance().handleInputChange(2, {
        target: { value: options[2] },
      });
      expect(addPoll.state('options').length).toBe(3);

      // fill out third one => should increase by one
      addPoll.instance().handleInputChange(0, {
        target: { value: options[0] },
      });
      expect(addPoll.state('options').length).toBe(4);
    });
  });

  describe('handleSubmit', () => {
    it('should call onAddPoll prop with valid data', () => {
      const validPollItem = {
        title: 'test',
        options: [
          'item 1',
          'item 2',
        ],
      };
      const spy = expect.createSpy();
      const addPoll = mount(<AddPoll onAddPoll={spy} />);
      const input = addPoll.find('input').first();

      input.node.value = validPollItem.title;
      input.simulate('change');

      addPoll.setState({
        options: validPollItem.options,
      });
      addPoll.instance().handleSubmit({ preventDefault: f => f });
      expect(spy).toHaveBeenCalled();
    });

    it('should not call onAddPoll prop with less then two options', () => {
      const invalidPollItem = {
        title: 'test',
        options: [
          'item 1',
          '  ',
        ],
      };
      const spy = expect.createSpy();
      const addPoll = mount(<AddPoll onAddPoll={spy} />);
      const input = addPoll.find('input').first();

      input.node.value = invalidPollItem.title;
      input.simulate('change');

      addPoll.setState({
        options: invalidPollItem.options,
      });
      addPoll.instance().handleSubmit({ preventDefault: f => f });
      expect(spy).toNotHaveBeenCalled();
    });

    it('should not call onAddPoll prop with empty title', () => {
      const options = [
        'item 1',
        'item 2',
      ];
      const spy = expect.createSpy();
      const addPoll = mount(<AddPoll onAddPoll={spy} />);
      const input = addPoll.find('input').first();

      addPoll.setState({
        options,
      });
      addPoll.instance().handleSubmit({ preventDefault: f => f });
      expect(spy).toNotHaveBeenCalled();

      input.node.value = '';
      input.simulate('change');
      addPoll.instance().handleSubmit({ preventDefault: f => f });
      expect(spy).toNotHaveBeenCalled();

      input.node.value = '    ';
      input.simulate('change');
      addPoll.instance().handleSubmit({ preventDefault: f => f });
      expect(spy).toNotHaveBeenCalled();
    });
  });
});
