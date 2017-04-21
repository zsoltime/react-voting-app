import expect from 'expect';
import uuid from 'node-uuid';

import { setPolls, getPolls, filterPolls } from 'PollAPI';

describe('PollAPI', () => {
  beforeEach(() => {
    localStorage.removeItem('reactPolls');
  });

  it('should exist', () => {
    expect(setPolls).toExist();
    expect(getPolls).toExist();
  });

  describe('setPolls', () => {
    it('should set valid polls array', () => {
      const polls = [{
        id: 12,
        title: 'Test Title',
        options: ['Yes', 'No'],
        isFinished: false,
      }];

      setPolls(polls);

      const actualPolls = JSON.parse(localStorage.getItem('reactPolls'));
      expect(actualPolls).toEqual(polls);
    });

    it('should not set invalid polls array', () => {
      const polls = { i: 7 };

      setPolls(polls);
      expect(localStorage.getItem('reactPolls')).toBe(null);
    });
  });

  describe('getPolls', () => {
    it('should return an empty array for bad localstorage data', () => {
      const actualPolls = getPolls();

      expect(actualPolls).toEqual([]);
    });

    it('should return polls array if valid array in localStorage', () => {
      const polls = [{
        id: 12,
        title: 'Test Title',
        options: ['Yes', 'No'],
        isFinished: false,
      }];

      localStorage.setItem('reactPolls', JSON.stringify(polls));
      const actualPolls = getPolls();

      expect(actualPolls).toEqual(polls);
    });
  });

  describe('filterPolls', () => {
    const polls = [{
      id: uuid(),
      title: 'Test Title',
      options: ['abc', 'def'],
      isFinished: false,
    }, {
      id: uuid(),
      title: 'Test Title Two',
      options: ['yes', 'no'],
      isFinished: true,
    }, {
      id: uuid(),
      title: 'Test Title Three',
      options: ['1', '2', '3'],
      isFinished: false,
    }];

    it('should return all polls if showFinished is true', () => {
      const filteredPolls = filterPolls(polls, true, '');

      expect(filteredPolls.length).toBe(polls.length);
    });

    it('should return non-finished polls if showFinished is false', () => {
      const filteredPolls = filterPolls(polls, false, '');

      expect(filteredPolls.length).toBe(2);
    });

    it('should filter polls by searchText', () => {
      const searchText = 'Two';
      const filteredPolls = filterPolls(polls, true, searchText);

      expect(filteredPolls.length).toBe(1);
    });

    it('should be case insensitive', () => {
      const searchText = 'tHrEE';
      const filteredPolls = filterPolls(polls, true, searchText);

      expect(filteredPolls.length).toBe(1);
    });

    it('should return all polls if searchText is empty', () => {
      const filteredPolls = filterPolls(polls, true, '');

      expect(filteredPolls.length).toBe(polls.length);
    });

    it('should sort polls by isFinished status', () => {
      const filteredPolls = filterPolls(polls, true, '');

      expect(filteredPolls[0].isFinished).toBe(false);
      expect(filteredPolls[1].isFinished).toBe(false);
      expect(filteredPolls[2].isFinished).toBe(true);
    });
  });
});
