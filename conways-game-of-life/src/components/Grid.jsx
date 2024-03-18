import React from "react";
import Cell from "./Cell";

const Grid = ({ grid, toggleCell }) => {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            toggleCell={() => toggleCell(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
