import React from 'react';
import PropTypes from 'prop-types';

const TasksFilterButton = ({ onFilterBtn, name, className }) => (
  <li>
    <button type="button" className={className} name={name} onClick={onFilterBtn}>
      {name}
    </button>
  </li>
);

TasksFilterButton.defaultProps = {
  className: 'selected',
  name: 'All',
};

TasksFilterButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onFilterBtn: PropTypes.func.isRequired,
};

export default TasksFilterButton;
