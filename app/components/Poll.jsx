import React from 'react';
import PropTypes from 'prop-types';

const Poll = ({ title }) => (
  <li>
    <h3>{title}</h3>
  </li>
);

Poll.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Poll;
