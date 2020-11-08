import React from "react";
import PropTypes from "prop-types";

import Task from "../task/task";

const TaskList = ({
  tasks,
  onDelete,
  onToggle,
  onStartEditing,
  onFinishEditing,
  filter,
  toggleTimer,
  clearTimer,
}) => {
  const el = tasks.map(({ id, ...props }) => (
    <Task
      key={id}
      {...props}
      onDelete={() => onDelete(id)}
      onToggle={() => onToggle(id)}
      onEdit={() => onStartEditing(id)}
      onFinishEditing={(value) => onFinishEditing(id, value)}
      filter={filter}
      toggleTimer={() => toggleTimer(id)}
      clearTimer={() => clearTimer(id)}
    />
  ));

  return <ul className="todo-list">{el}</ul>;
};

TaskList.defaultProps = {
  filter: "All",
  tasks: [
    {
      done: false,
      editing: false,
      description: "Example task",
      date: new Date(),
      lifeTime: 0,
      id: 300,
    },
  ],
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  onFinishEditing: PropTypes.func.isRequired,
  toggleTimer: PropTypes.func.isRequired,
  clearTimer: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default TaskList;
