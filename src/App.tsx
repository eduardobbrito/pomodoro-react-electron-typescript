import React, { useState, useEffect, useRef } from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

const soundfile = require("./assets/alarm.mp3");

function App() {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [breakLength, setBreakLength] = useState(60 * 5);
  const [sessionLength, setSessionLength] = useState(60 * 25);

  const updateLengthByOneMinute = (increase: boolean, isPomodoro: boolean) => {
    if (isPomodoro) {
      const newSessionLength = increase
        ? sessionLength + 60
        : sessionLength - 60;
      if (newSessionLength > 0 && newSessionLength <= 60 * 60)
        setSessionLength(newSessionLength);
    } else {
      const newBreakLength = increase ? breakLength + 60 : breakLength - 60;
      if (newBreakLength > 0 && newBreakLength <= 60 * 60)
        setBreakLength(newBreakLength);
    }
  };

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
          audioElement?.current?.play();
          if (currentSessionType === "Pomodoro") {
            setCurrentSessionType("Break");
            return breakLength;
          } else if (currentSessionType === "Break") {
            setCurrentSessionType("Pomodoro");
            return sessionLength;
          }
        });
      }, 1);
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    audioElement?.current?.load();
    // @ts-ignore
    clearInterval(intervalId);
    // @ts-ignore
    setIntervalId(null);
    setCurrentSessionType("Pomodoro");
    setTimeLeft(60 * 25);
    setSessionLength(60 * 25);
    setBreakLength(60 * 5);
  };

  return (
    <div className="App">
      <Break
        breakLength={breakLength}
        updateLengthByOneMinute={updateLengthByOneMinute}
      />
      <TimeLeft
        timerLabel={currentSessionType}
        handleStartStopClick={handleStartStopClick}
        startStopButtonLabel={isStarted ? "Stop" : "Start"}
        timeLeft={timeLeft}
      />
      <div>
        <button onClick={handleResetButtonClick}>Reset</button>
      </div>
      <Session
        sessionLength={sessionLength}
        updateLengthByOneMinute={updateLengthByOneMinute}
      />
      <audio ref={audioElement}>
        <source src={soundfile} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
