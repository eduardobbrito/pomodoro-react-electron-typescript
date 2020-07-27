import React, { useState } from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

function App() {
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

  return (
    <div className="App">
      <Break
        breakLength={breakLength}
        updateLengthByOneMinute={updateLengthByOneMinute}
      />
      <TimeLeft sessionLength={sessionLength} breakLength={breakLength} />
      <Session
        sessionLength={sessionLength}
        updateLengthByOneMinute={updateLengthByOneMinute}
      />
    </div>
  );
}

export default App;
