import React, { useState, useEffect, useRef } from 'react';
import './timer.css';

function Timer({ task, updateTime }) {
  const [timer, setTimer] = useState(false);
  const [time, setTime] = useState(task.timer);
  const timeRef = useRef(task.timer);
  const timeOut = useRef(null);

  const timerFormat = (val) => (val < 10 ? `0${val}` : val);
  useEffect(() => {
    timeRef.current = time;
  }, [time]);
  useEffect(() => {
    return () => {
      clearTimeout(timeOut.current);
      updateTime(task.id, timeRef.current);
    };
  }, []);

  const stopTimer = () => {
    clearTimeout(timeOut.current);
    setTimer(false);
  };

  const timerWork = () => {
    const startTime = Date.now();
    const targetTime = startTime + time.min * 60 * 1000 + time.sec * 1000 + 1000;

    const updateTimer = () => {
      const currentTime = Date.now();
      const timeLeft = targetTime - currentTime;

      if (timeLeft <= 0) {
        stopTimer();
        setTime({ min: 0, sec: 0 });
      } else {
        const min = Math.floor(timeLeft / (60 * 1000));
        const sec = Math.floor((timeLeft - min * 60 * 1000) / 1000);
        setTime({ min, sec });
      }

      timeOut.current = setTimeout(updateTimer, 1000);
    };

    timeOut.current = setTimeout(updateTimer, 1000);
  };

  const startTimer = () => {
    if (timer) return;
    if (!timer) setTimer(true);
    timerWork();
  };

  const button = !timer ? (
    <button className="icon icon-play" onClick={() => startTimer()}></button>
  ) : (
    <button className="icon icon-pause" onClick={() => stopTimer()}></button>
  );

  return (
    <span className="description">
      {button}
      {timerFormat(time.min)}:{timerFormat(time.sec)}
    </span>
  );
}
export default Timer;
