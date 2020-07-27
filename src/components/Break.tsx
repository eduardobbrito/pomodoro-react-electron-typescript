import React from "react";
import * as moment from "moment";

const Break: React.FC<Props> = ({
  breakLength,
  incrementBreakLengthByOneMinute,
  decrementBreakLengthByOneMinute,
}) => {
  const breakLengthInMinutes = moment.duration(breakLength, "s").asMinutes();
  return (
    <div>
      <p>Break</p>
      <p>{breakLengthInMinutes}</p>
      <button onClick={decrementBreakLengthByOneMinute}>-</button>
      <button onClick={incrementBreakLengthByOneMinute}>+</button>
    </div>
  );
};

type Props = {
  breakLength: number;
  incrementBreakLengthByOneMinute: () => void;
  decrementBreakLengthByOneMinute: () => void;
};

export default Break;
