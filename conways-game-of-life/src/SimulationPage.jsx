import React, { useContext, useEffect } from "react";
import { GameContext } from "./GameContext";
import Grid from "./Grid";
import NavBar from "./components/NavBar";
import useInterval from "./useInterval";

const SimulationPage = () => {
  const {
    grid,
    setGrid,
    isRunning,
    setIsRunning,
    liveCells,
    setLiveCells,
    initializeGrid,
    longerLastingCellsEnabled,
    setLongerLastingCellsEnabled,
    updateGrid,
  } = useContext(GameContext);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const toggleCell = (row, col) => {
    const updatedGrid = [...grid];
    updatedGrid[row][col] = !updatedGrid[row][col];
    setGrid(updatedGrid);
    const liveCellsCount = updatedGrid.flat().filter((cell) => cell).length;
    setLiveCells(liveCellsCount);
  };

  useInterval(
    () => {
      if (isRunning) {
        updateGrid();
      }
    },
    isRunning ? 200 : null
  );

  const toggleAutoplay = () => {
    setIsRunning(!isRunning);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <Grid grid={grid} toggleCell={toggleCell} />
        <div className="controls">
          <button className="btn btn-primary" onClick={initializeGrid}>
            Reset Grid
          </button>
          <button className="btn btn-primary" onClick={() => updateGrid()}>
            Next Frame
          </button>
          <button className="btn btn-primary" onClick={toggleAutoplay}>
            {isRunning ? "Stop" : "Start"} Autoplay
          </button>
          <label>
            Longer Lasting Cells:
            <input
              type="checkbox"
              checked={longerLastingCellsEnabled}
              onChange={() =>
                setLongerLastingCellsEnabled(!longerLastingCellsEnabled)
              }
            />
          </label>
          <p>Live Cells: {liveCells}</p>
        </div>
      </div>
    </>
  );
};

export default SimulationPage;