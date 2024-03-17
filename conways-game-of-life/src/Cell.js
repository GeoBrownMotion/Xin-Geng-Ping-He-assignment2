import React from 'react';

const Cell = ({ isAlive, toggleCell }) => {
  return (
    <div
      className={`cell ${isAlive ? 'alive' : 'dead'}`}
      onClick={toggleCell}
      style={{ width: '20px', height: '20px', cursor: 'pointer' }} // Ensure cell size and clickable cursor
    />
  );
};

export default Cell;
