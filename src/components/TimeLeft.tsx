import React, { useState, useEffect } from "react";
import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const TimeLeft: React.FC<Props> = ({ sessionLength, breakLength }) => {
  const [currentSessionType, setCurrentSessionType] = useState("Pomodoro");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  const isStarted = intervalId !== null;

  const handleStartStopClick = () => {
    if (isStarted) {
      // Avoid error:
      // Argument of type 'Timeout | null' is not assignable to parameter of type 'Timeout'.
      // Type 'null' is not assignable to type 'Timeout'.
      // @ts-ignore
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        // @ts-ignore
        setTimeLeft((previousTimeLeft) => {
          const newTimeLeft = previousTimeLeft - 1;
          if (newTimeLeft >= 0) {
            return newTimeLeft;
          }
          if (currentSessionType === "Pomodoro") {
            setCurrentSessionType("Break");
            return breakLength;
          } else if (currentSessionType === "Break") {
            setCurrentSessionType("Pomodoro");
            return sessionLength;
          }
        });
      }, 100);
      setIntervalId(newIntervalId);
    }
  };

  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });

  return (
    <div>
      <p>Ticking: {currentSessionType}</p>
      <p>{formattedTimeLeft}</p>
      <button onClick={handleStartStopClick}>
        {isStarted ? "Stop" : "Start"}
      </button>
    </div>
  );
};

type Props = {
  sessionLength: number;
  breakLength: number;
};

export default TimeLeft;
