import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState({ rows: 20, cols: 20 });
  const [isRunning, setIsRunning] = useState(false);
  const [liveCells, setLiveCells] = useState(0);

  const initializeGrid = () => {
    const rows = [];
    for (let i = 0; i < gridSize.rows; i++) {
      rows.push(Array.from(Array(gridSize.cols), () => Math.random() > 0.95));
    }
    setGrid(rows);
    setLiveCells(rows.flat().filter(cell => cell).length);
  };

  const value = {
    grid,
    setGrid,
    gridSize,
    setGridSize,
    isRunning,
    setIsRunning,
    liveCells,
    setLiveCells,
    initializeGrid,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
export default GameProvider;