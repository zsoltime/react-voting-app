import React from 'react';
import PropTypes from 'prop-types';

import Poll from 'Poll';

const PollList = ({ polls, onDelete, onPause }) => {
  const list = polls.map(item => (
    <Poll key={item.id} {...item} onDelete={onDelete} onPause={onPause} />
  ));

  return (
    <ul>
      {list}
    </ul>
  );
};

PollList.defaultProps = {
  polls: [],
};

PollList.propTypes = {
  polls: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
};

export default PollList;
