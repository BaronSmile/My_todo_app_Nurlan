import React, { Component } from 'react';
import './stopwatch.css';

import PropTypes from 'prop-types';

export default class StopWatch extends Component {
  static propTypes = {
    done: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      sec: 0,
      ms: 0,
      isRunning: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      const { ms, sec, min, isRunning } = this.state;
      if (isRunning) {
        if (ms < 100) this.setState({ ms: ms + 1 });
        else this.setState({ sec: sec + 1, ms: 0 });
        if (sec > 59) this.setState({ min: min + 1, sec: 0 });
      }
    }, 10);
  }

  componentDidUpdate(prevProps) {
    const { done } = this.props;
    if (done !== prevProps.done) {
      this.stopwatchHandle();
    }
  }

  handleClick(button) {
    const { isRunning } = this.state;
    if (button === 'toggle') {
      this.setState({ isRunning: !isRunning });
    } else if (button === 'reset') {
      this.setState({ min: 0, sec: 0, ms: 0 });
      this.setState({ isRunning: false });
    }
  }

  fNum(evt) {
    return evt.toLocaleString(undefined, { minimumIntegerDigits: 2 });
  }

  stopwatchHandle() {
    const { isRunning } = this.state;
    if (isRunning === true) {
      this.setState({ isRunning: false });
    }
  }

  render() {
    const { ms, sec, min, isRunning } = this.state;
    const { done } = this.props;
    let classStopwatchButton = 'stopwatch';

    if (done) {
      classStopwatchButton += ' disabled';
    }

    // eslint-disable-next-line no-nested-ternary
    const running = isRunning ? 'pause' : 'start';
    return (
      <div className={classStopwatchButton}>
        <span>
          {this.fNum(min)}:{this.fNum(sec)}:{this.fNum(ms)}
        </span>
        <button className={running} aria-label="Start_Pause" type="button" onClick={() => this.handleClick('toggle')} />
        <button className="reset" aria-label="Reset" type="button" onClick={() => this.handleClick('reset')} />
      </div>
    );
  }
}
