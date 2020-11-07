import React from 'react';
import PropTypes from 'prop-types';

const TasksFilterButton = ({ onBtnClick, name, className }) => (
  <li>
    <button type="button" className={className} name={name} onClick={onBtnClick}>
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
  onBtnClick: PropTypes.func.isRequired,
};

export default TasksFilterButton;
