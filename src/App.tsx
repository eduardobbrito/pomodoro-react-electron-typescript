import React, { useState, useEffect, useRef } from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

const soundfile = require("./assets/alarm.mp3");

const App = () => {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [breakLength, setBreakLength] = useState(60 * 5);
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [currentSessionType, setCurrentSessionType] = useState("Pomodoro");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(sessionLength);
  const [isTicking, setIsTicking] = useState<boolean>(false);
  const isStarted = intervalId !== null;

  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  useEffect(() => {
    if (timeLeft === 0) {
      audioElement?.current?.play();
      if (currentSessionType === "Pomodoro") {
        setCurrentSessionType("Break");
        setTimeLeft(breakLength);
      } else if (currentSessionType === "Break") {
        setCurrentSessionType("Pomodoro");
        setTimeLeft(sessionLength);
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeLeft]);

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

  const handleStartStopClick = () => {
    if (isStarted) {
      if (intervalId) clearInterval(intervalId);
      setIntervalId(null);
      setIsTicking(false);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((previousTimeLeft) => previousTimeLeft - 1);
      }, 1);
      setIntervalId(newIntervalId);
      setIsTicking(true);
    }
  };

  const handleResetButtonClick = () => {
    audioElement?.current?.load();
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    setCurrentSessionType("Pomodoro");
    setTimeLeft(60 * 25);
    setSessionLength(60 * 25);
    setBreakLength(60 * 5);
    setIsTicking(false);
  };

  return (
    <div className="App">
      <Break
        breakLength={breakLength}
        updateLengthByOneMinute={updateLengthByOneMinute}
        isTicking={isTicking}
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
        isTicking={isTicking}
      />
      <audio ref={audioElement}>
        <source src={soundfile} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default App;
