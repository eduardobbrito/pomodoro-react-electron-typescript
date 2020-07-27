import React from "react";
import * as moment from "moment";

const Break: React.FC<Props> = ({ sessionLength, updateLengthByOneMinute }) => {
  const sessionLengthInMinutes = moment
    .duration(sessionLength, "s")
    .asMinutes();
  return (
    <div>
      <p>Pomodoro</p>
      <p>{sessionLengthInMinutes}</p>
      <button onClick={() => updateLengthByOneMinute(false, true)}>-</button>
      <button onClick={() => updateLengthByOneMinute(true, true)}>+</button>
    </div>
  );
};

type Props = {
  sessionLength: number;
  updateLengthByOneMinute: (increase: boolean, isPomodoro: boolean) => void;
};

export default Break;
