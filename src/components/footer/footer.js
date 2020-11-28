import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../task-filter/tasks-filter';

const Footer = ({ counter, onChangeFilter, onClearCompletedClick }) => (
  <footer className="footer">
    <span className="todo-count">{counter} items left</span>
    <TasksFilter onChangeFilter={onChangeFilter} />
    <button type="button" className="clear-completed" onClick={onClearCompletedClick}>
      Clear completed
    </button>
  </footer>
);

Footer.defaultProps = {
  counter: 0,
};

Footer.propTypes = {
  counter: PropTypes.number,
  onChangeFilter: PropTypes.func.isRequired,
  onClearCompletedClick: PropTypes.func.isRequired,
};

export default Footer;
