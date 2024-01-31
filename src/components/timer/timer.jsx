import React from 'react';

import './timer.css';

export default class Timer extends React.Component {
  state = {
    time: this.props.task.timer,
    timer: false,
  };

  timerFormat = (val) => (val < 10 ? `0${val}` : val);

  componentWillUnmount() {
    clearTimeout(this.timeOut);
    this.props.updateTime(this.props.task.id, this.state.time);
  }

  startTimer() {
    if (!this.state.timer) this.setState({ timer: true });
    this.timerWork();
  }

  timerWork() {
    const startTime = Date.now();
    const targetTime = startTime + this.state.time.min * 60 * 1000 + this.state.time.sec * 1000 + 1000;

    const updateTimer = () => {
      const currentTime = Date.now();
      const timeLeft = targetTime - currentTime;

      if (timeLeft <= 0) {
        this.stopTimer();
        this.setState({ time: { min: 0, sec: 0 } });
      } else {
        const min = Math.floor(timeLeft / (60 * 1000));
        const sec = Math.floor((timeLeft - min * 60 * 1000) / 1000);
        this.setState({ time: { min, sec } });
      }

      this.timeOut = setTimeout(updateTimer, 1000);
    };

    this.timeOut = setTimeout(updateTimer, 1000);
  }

  stopTimer() {
    clearTimeout(this.timeOut);
    this.setState({ timer: false });
  }

  render() {
    const { time } = this.state;
    return (
      <span className="description">
        {/* timer buttons */}
        <button className="icon icon-play" onClick={() => this.startTimer()}></button>
        <button className="icon icon-pause" onClick={() => this.stopTimer()}></button>
        {/* timer */}
        {this.timerFormat(time.min)}:{this.timerFormat(time.sec)}
      </span>
    );
  }
}
