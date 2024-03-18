import React, { useContext } from "react";
import { GameContext } from "./GameContext";

const Cell = ({ cell, toggleCell }) => {
  const { frame } = useContext(GameContext);

  const { live, lastLiveFrame } = cell;

  function calcGray() {
    if (live) {
      return 0;
    }

    if (lastLiveFrame === null) {
      return 255;
    }

    const deadTime = frame - lastLiveFrame;
    if (deadTime > 10) {
      return 255;
    }

    return parseInt(deadTime * 25.5);
  }

  const gray = calcGray();

  return (
    <div
      className="cell"
      onClick={toggleCell}
      style={{
        backgroundColor: `rgb(${gray},${gray},${gray})`,
      }}
    ></div>
  );
};

export default Cell;
