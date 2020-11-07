import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {
  state = {
    description: this.props.description,
    date: 'created 1 seconds ago',
  };

  static defaultProps = {
    done: false,
    editing: false,
    date: new Date(),
    description: 'New Task',
    filter: 'All',
    time: '00:00:00',
    onTimer: false,
  };

  static propTypes = {
    done: PropTypes.bool,
    editing: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    toggleTimer: PropTypes.func.isRequired,
    clearTimer: PropTypes.func.isRequired,
    onFinishEditing: PropTypes.func.isRequired,
    description: PropTypes.string,
    filter: PropTypes.string,
    time: PropTypes.number,
    onTimer: PropTypes.bool,
  };

  componentDidMount() {
    this.refreshDate();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  refreshDate = () => {
    this.intervalID = setInterval(() => {
      this.setState({date: formatDistanceToNow(this.props.date, {includeSeconds: true})});
    }, 1000);
  };

  setVisible = () => {
    const {filter, done} = this.props;
    let visible;

    switch (filter) {
      case 'Active':
        visible = !done;
        break;
      case 'Completed':
        visible = done;
        break;
      default:
        visible = true;
    }
    return visible;
  };

  editDescription = (evt) => {
    this.setState({description: evt.target.value});
  };

  finishEditing = (evt) => {
    const newValue = evt.target.value.trim();
    const {onFinishEditing, description} = this.props;
    const ENTER_KEYCODE = 13;
    const ESC_KEYCODE = 27;

    if (evt.keyCode === ESC_KEYCODE) {
      onFinishEditing(description);
      this.setState({description});
    }
    if (evt.keyCode === ENTER_KEYCODE && newValue !== '') {
      onFinishEditing(newValue);
    }
  };

  render() {
    const {done, editing, onDelete, onEdit, onToggle} = this.props;

    const {description, date} = this.state;
    const SPACE_KEYCODE = 32;

    const onKeyUp = (evt) => {
      if (evt.keyCode === SPACE_KEYCODE) {
        this.onToggle();
      }
    };

    let classEditButton = 'icon icon-edit';
    let classList = '';

    if (done) {
      classList += ' completed';
      classEditButton += ' disabled';
    }
    if (editing) classList += ' editing';
    if (!this.setVisible()) classList += ' hidden';

    return (
        <li className={classList}>
          <div className="view">
            <input className="toggle" type="checkbox" onChange={onToggle} checked={done}/>
            <label onClick={onToggle} onKeyUp={onKeyUp}>
            <span className="description" role="menuitem">
              {description}
            </span>
              <span className="created">{date}</span>
            </label>
            <button type="button" className={classEditButton} onClick={onEdit}>
              <span>edit</span>
            </button>
            <button type="button" className="icon icon-destroy" onClick={onDelete}>
              <span>close</span>
            </button>
          </div>
          {editing ? (
              <input
                  type="text"
                  className="edit"
                  value={description}
                  onChange={this.editDescription}
                  onKeyUp={this.finishEditing}
              />
          ) : null}
        </li>
    );
  }
}
