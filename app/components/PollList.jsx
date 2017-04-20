import React from 'react';
import PropTypes from 'prop-types';

import Poll from 'Poll';

const PollList = ({ polls }) => {
  const list = polls.map(item => (
    <Poll key={item.id} {...item} />
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
};

export default PollList;
