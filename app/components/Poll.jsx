import React from 'react';
import PropTypes from 'prop-types';

const Poll = ({ title }) => (
  <li>{title}</li>
);

Poll.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Poll;
