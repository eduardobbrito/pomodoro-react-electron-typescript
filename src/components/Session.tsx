import React from "react";
import * as moment from "moment";

const Break: React.FC<Props> = ({
  sessionLength,
  incrementSessionLengthByOneMinute,
  decrementSessionLengthByOneMinute,
}) => {
  const sessionLengthInMinutes = moment
    .duration(sessionLength, "s")
    .asMinutes();
  return (
    <div>
      <p>Pomodoro</p>
      <p>{sessionLengthInMinutes}</p>
      <button onClick={decrementSessionLengthByOneMinute}>-</button>
      <button onClick={incrementSessionLengthByOneMinute}>+</button>
    </div>
  );
};

type Props = {
  sessionLength: number;
  incrementSessionLengthByOneMinute: () => void;
  decrementSessionLengthByOneMinute: () => void;
};

export default Break;
