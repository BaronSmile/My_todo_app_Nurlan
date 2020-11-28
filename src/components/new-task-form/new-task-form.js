import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    value: '',
  };

  static propTypes = {
    onItemAdded: PropTypes.func.isRequired,
  };

  onLabelChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { value } = this.state;
    const { onItemAdded } = this.props;
    event.preventDefault();
    onItemAdded(value);
    this.setState({
      value: '',
    });
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} value={value} />
      </form>
    );
  }
}
