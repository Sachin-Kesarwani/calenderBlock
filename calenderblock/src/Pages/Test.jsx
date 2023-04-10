import React, { useState, useEffect } from 'react';

function Timer() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsElapsed((prevSecondsElapsed) => prevSecondsElapsed + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;

  return (
    <div>
      <h2>Timer</h2>
      <p>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </p>
    </div>
  );
}

export default Timer;
