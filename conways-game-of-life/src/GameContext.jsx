import React, { createContext, useCallback, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // State hooks for grid, gridSize, game status, and count of alive cells
  const [frame, setFrame] = useState(0);
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState({ rows: 20, cols: 20 });
  const [isRunning, setIsRunning] = useState(false);

  // State hooks for the grid, grid size, game status, and alive cell count.
  // It also includes a state for enabling the "Longer Lasting Cells" feature.
  const [longerLastingCellsEnabled, setLongerLastingCellsEnabled] =
    useState(false);
  const [movingCells, setMovingCells] = useState(new Map());

  const liveCellsCount = grid
    .flat()
    .reduce((count, cell) => count + (cell.live ? 1 : 0), 0);

  // Creates an empty grid with all cells initially dead (false)
  const createEmptyGrid = (rows, cols) => {
    // Utilizing Array.from to generate rows and columns
    return new Array(rows).fill(0).map(() =>
      new Array(cols).fill(0).map(() => ({
        live: false,
        lastLiveFrame: null, // number or null
      }))
    );
  };
  // Populates clusters of alive cells in the grid to reach a target density of 5-10%
  const populateClusters = (grid, targetActiveCells, rows, cols) => {
    let placedActiveCells = 0;
    // Loop until the number of placed alive cells meets the target
    while (placedActiveCells < targetActiveCells) {
      const centerRow = Math.floor(Math.random() * rows);
      const centerCol = Math.floor(Math.random() * cols);
      // Check if the selected cell is dead, to turn it alive
      if (!grid[centerRow][centerCol].live) {
        grid[centerRow][centerCol].live = true;
        grid[centerRow][centerCol].lastLiveFrame = 0;
        placedActiveCells++;
      }
    }
  };

  // useCallback hook to memoize the grid initialization function
  // Ensures grid is initialized with a target density of alive cells in clusters
  const initializeGrid = useCallback(() => {
    let newGrid = createEmptyGrid(gridSize.rows, gridSize.cols);
    const totalCells = gridSize.rows * gridSize.cols;
    const targetActiveCells = totalCells * 0.075;
    populateClusters(newGrid, targetActiveCells, gridSize.rows, gridSize.cols);
    setGrid(newGrid);
    setFrame(0);
  }, [gridSize.rows, gridSize.cols]);

  // This updateGrid function includes logic for the "Longer Lasting Cells" feature.
  // When enabled, it allows cells that are about to die the chance to move to an adjacent empty space,
  // providing a unique twist on the traditional game rules.
  const updateGrid = useCallback(() => {
    const nextFrame = frame + 1;
    setFrame(nextFrame);
    const newGrid = createEmptyGrid(gridSize.rows, gridSize.cols);
    let newMovingCells = new Map([...movingCells]); // Clone moving cells state

    // Iterates over the current grid to apply game rules and handle longer lasting cells.
    // This involves standard rules of life and death, plus the chance for dying cells to move if the feature is enabled.
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        const cell = grid[row][col];
        const liveNeighbors = countLiveNeighbors(grid, row, col);
        let cellShouldLive = cell.live;

        // Standard Game of Life rules
        if (cell && (liveNeighbors < 2 || liveNeighbors > 3)) {
          cellShouldLive = false; // Cell dies
        } else if (!cell && liveNeighbors === 3) {
          cellShouldLive = true; // Cell is born
        }

        // Check for longer lasting cells feature
        if (
          longerLastingCellsEnabled &&
          !cellShouldLive &&
          !newMovingCells.has(`${row},${col}`)
        ) {
          // Attempt to move the cell if it's dying
          const moved = tryMoveCell(row, col, newGrid, gridSize);
          if (moved) {
            continue; // Skip the dying process since the cell has moved
          }
        }
        // Apply the standard rule or after attempting to move
        newGrid[row][col].live = cellShouldLive;

        if (cellShouldLive) {
          newGrid[row][col].lastLiveFrame = nextFrame;
        } else {
          newGrid[row][col].lastLiveFrame = grid[row][col].lastLiveFrame;
        }
      }
    }
    // Processes moving cells that haven't found a new home yet,
    // decrementing their life frames or removing them if they fail to move in time.
    newMovingCells.forEach((framesLeft, key) => {
      const [row, col] = key.split(",").map(Number);
      if (framesLeft > 0) {
        newMovingCells.set(key, framesLeft - 1); // Decrement life of moving cells
      } else {
        newMovingCells.delete(key); // Remove cell that didn't move in time
        newGrid[row][col].live = false; // Ensure the cell is marked as dead
      }
    });
    setGrid(newGrid);
    setMovingCells(newMovingCells);
  }, [grid, gridSize, isRunning, movingCells, longerLastingCellsEnabled]);

  function tryMoveCell(row, col, newGrid, gridSize) {
    const directions = [
      { dr: -1, dc: 0 },
      { dr: 1, dc: 0 }, // Up, Down
      { dr: 0, dc: -1 },
      { dr: 0, dc: 1 }, // Left, Right
    ];
    for (let { dr, dc } of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Ensure the new position is within grid bounds and empty
      if (
        newRow >= 0 &&
        newRow < gridSize.rows &&
        newCol >= 0 &&
        newCol < gridSize.cols &&
        !newGrid[newRow][newCol].live
      ) {
        // Move the cell to the new position
        newGrid[newRow][newCol].live = true;
        return true; // Successful move
      }
    }

    return false; // Failed to move
  }

  const value = {
    grid,
    frame,
    setGrid,
    gridSize,
    setGridSize,
    isRunning,
    setIsRunning,
    liveCellsCount,
    initializeGrid,
    longerLastingCellsEnabled,
    setLongerLastingCellsEnabled,
    updateGrid,
    movingCells,
    setMovingCells,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

function countLiveNeighbors(grid, row, col) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  return directions.reduce((acc, [dr, dc]) => {
    const r = row + dr;
    const c = col + dc;
    if (
      r >= 0 &&
      r < grid.length &&
      c >= 0 &&
      c < grid[0].length &&
      grid[r][c].live
    ) {
      acc += 1;
    }
    return acc;
  }, 0);
}
export default GameProvider;
