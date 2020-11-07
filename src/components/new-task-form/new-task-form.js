import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    value: '',
  };

  static propTypes = {
    onItemAdded: PropTypes.func.isRequired,
  };

  onLabelChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.value);
    this.setState({
      value: '',
    });
  };

  render() {
    const {value} = this.state;
    return (
        <form onSubmit={this.onSubmit}>
          <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} value={value}/>
        </form>
    );
  }
}
