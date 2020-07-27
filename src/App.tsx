import React, { useState } from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

function App() {
  const [breakLength, setBreakLength] = useState(60 * 5);
  const [sessionLength, setSessionLength] = useState(60 * 25);

  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };

  const incrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength);
    }
  };

  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };

  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60) {
      setSessionLength(newSessionLength);
    }
  };

  return (
    <div className="App">
      <Break
        breakLength={breakLength}
        incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
        decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
      />
      <TimeLeft sessionLength={sessionLength} breakLength={breakLength} />
      <Session
        sessionLength={sessionLength}
        incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
        decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
      />
    </div>
  );
}

export default App;
