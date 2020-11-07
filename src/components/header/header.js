import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form/new-task-form';

const Header = ({ onItemAdded }) => (
  <header className="header">
    <h1>todos</h1>
    <NewTaskForm onItemAdded={onItemAdded} />
  </header>
);

Header.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export default Header;
