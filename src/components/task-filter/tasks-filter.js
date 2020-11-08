import React, { Component } from "react";
import PropTypes from "prop-types";

import TasksFilterButton from "../tasks-filter-button/tasks-filter-button";

export default class TasksFilter extends Component {
  state = {
    selected: "All",
    buttons: [{ name: "All" }, { name: "Active" }, { name: "Completed" }],
  };

  static propTypes = {
    onChangeFilter: PropTypes.func.isRequired,
  };

  changeSelectedButton = (evt) => {
    const { onChangeFilter } = this.props;
    const { name } = evt.target;
    this.setState(() => {
      onChangeFilter(name);
      return { selected: name };
    });
  };

  render() {
    const { buttons, selected } = this.state;
    const elements = buttons.map(({ name }) => {
      const className = name === selected ? "selected" : "";
      return (
        <TasksFilterButton
          className={className}
          name={name}
          key={name}
          onFilterBtn={this.changeSelectedButton}
        />
      );
    });

    return <ul className="filters">{elements}</ul>;
  }
}
