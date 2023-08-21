import React, { useEffect } from "react";

function Timer({ time, setTime, isActive, questionFinished }) {
  useEffect(() => {
    let interval;

    if (isActive && !questionFinished) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds === 59) {
            return { minutes: prevTime.minutes + 1, seconds: 0 };
          } else {
            return { ...prevTime, seconds: prevTime.seconds + 1 };
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, questionFinished]);

  return (
    <div>
      <h1>
        {time.minutes}:{time.seconds}
      </h1>
    </div>
  );
}

export default Timer;
