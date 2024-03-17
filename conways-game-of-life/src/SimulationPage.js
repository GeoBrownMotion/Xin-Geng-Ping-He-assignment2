import React, { useContext, useEffect } from 'react';
import { GameContext } from './GameContext';
import Grid from './Grid';
import useInterval from './useInterval';

const SimulationPage = () => {
  const {
    grid,
    setGrid,
    gridSize,
    isRunning,
    setIsRunning,
    liveCells,
    setLiveCells,
    initializeGrid,
  } = useContext(GameContext);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const toggleCell = (row, col) => {
    const updatedGrid = [...grid];
    updatedGrid[row][col] = !updatedGrid[row][col];
    setGrid(updatedGrid);
    // Assuming setLiveCells updates the count of live cells in the grid
    const liveCellsCount = updatedGrid.flat().filter(cell => cell).length;
    setLiveCells(liveCellsCount);
  };

  const updateGrid = () => {
    const updatedGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const liveNeighbors = countLiveNeighbors(rowIndex, colIndex);
        if (cell && (liveNeighbors < 2 || liveNeighbors > 3)) {
          return false;
        } else if (!cell && liveNeighbors === 3) {
          return true;
        } else {
          return cell;
        }
      })
    );
    setGrid(updatedGrid);
    setLiveCells(updatedGrid.flat().filter(cell => cell).length);
  };

  const countLiveNeighbors = (row, col) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < gridSize.rows && newCol >= 0 && newCol < gridSize.cols) {
          count += grid[newRow][newCol] ? 1 : 0;
        }
      }
    }
    return count;
  };

  useInterval(() => {
    if (isRunning) updateGrid();
  }, isRunning ? 100 : null);

  const toggleAutoplay = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="container">
      <Grid grid={grid} toggleCell={toggleCell} />
      <div className="controls">
        <button className="btn btn-primary" onClick={initializeGrid}>Reset Grid</button>
        <button className="btn btn-primary" onClick={updateGrid}>Next Frame</button>
        <button className="btn btn-primary" onClick={toggleAutoplay}>{isRunning ? 'Stop' : 'Start'} Autoplay</button>
        <p>Live Cells: {liveCells}</p>
      </div>
    </div>
  );
};

export default SimulationPage;
