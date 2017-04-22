import React from 'react';
import PropTypes from 'prop-types';

const Poll = ({ id, title, isFinished, options, onDelete, onPause }) => (
  <li className={isFinished ? 'poll poll--inactive' : 'poll'}>
    <h3>{title}</h3>
    <p>There are {options.length} choices to choose from</p>
    <button
      className="btn btn--pause"
      onClick={() => onPause(id)}
    >&#10073;&#10073;</button>
    <button
      className="btn btn--delete"
      onClick={() => onDelete(id)}
    >&times;</button>
  </li>
);

Poll.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isFinished: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
};

export default Poll;
