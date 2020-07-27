import React from "react";
import * as moment from "moment";

const Break: React.FC<Props> = ({ breakLength, updateLengthByOneMinute }) => {
  const breakLengthInMinutes = moment.duration(breakLength, "s").asMinutes();
  return (
    <div>
      <p>Break</p>
      <p>{breakLengthInMinutes}</p>
      <button onClick={() => updateLengthByOneMinute(false, false)}>-</button>
      <button onClick={() => updateLengthByOneMinute(true, false)}>+</button>
    </div>
  );
};

// https://github.com/typescript-cheatsheets/react-typescript-cheatsheet
type Props = {
  breakLength: number;
  updateLengthByOneMinute: (increase: boolean, isPomodoro: boolean) => void;
};

export default Break;
