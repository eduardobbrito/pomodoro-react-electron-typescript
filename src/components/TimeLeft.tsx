import React from "react";
import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const TimeLeft: React.FC<Props> = ({
  timerLabel,
  handleStartStopClick,
  startStopButtonLabel,
  timeLeft,
}) => {
  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });

  return (
    <div>
      <p>Ticking: {timerLabel}</p>
      <p>{formattedTimeLeft}</p>
      <button onClick={handleStartStopClick}>{startStopButtonLabel}</button>
    </div>
  );
};

type Props = {
  timerLabel: string;
  handleStartStopClick: () => void;
  startStopButtonLabel: string;
  timeLeft: number;
};

export default TimeLeft;
