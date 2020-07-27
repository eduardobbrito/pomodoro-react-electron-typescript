import React from "react";
import * as moment from "moment";

const Break: React.FC<Props> = ({
  sessionLength,
  updateLengthByOneMinute,
  isTicking,
}) => {
  const sessionLengthInMinutes = moment
    .duration(sessionLength, "s")
    .asMinutes();
  return (
    <div>
      <p>Pomodoro</p>
      <p>{sessionLengthInMinutes}</p>
      <div className={isTicking ? "is-invisible" : "is-visible"}>
        <button onClick={() => updateLengthByOneMinute(false, true)}>-</button>
        <button onClick={() => updateLengthByOneMinute(true, true)}>+</button>
      </div>
    </div>
  );
};

type Props = {
  sessionLength: number;
  updateLengthByOneMinute: (increase: boolean, isPomodoro: boolean) => void;
  isTicking: boolean;
};

export default Break;
