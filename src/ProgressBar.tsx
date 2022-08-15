import { FC, HTMLAttributes } from "react";
import "./ProgressBar.css";

const ProgressBar: FC<{ value: number } & HTMLAttributes<HTMLDivElement>> = ({
  value,
  ...props
}) => {
  return (
    <div className="progress-container" aria-hidden {...props}>
      <div className="progress-bar" style={{ width: `${value}%` }}></div>
    </div>
  );
};

export default ProgressBar;
