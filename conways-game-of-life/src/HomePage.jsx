import React from "react";
import NavBar from "./components/NavBar";
const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Welcome to Conway's Game of Life</h1>
        <p>
          Conway's Game of Life is a cellular automaton devised by the British
          mathematician John Horton Conway in 1970. It is a zero-player game,
          meaning that its evolution is determined by its initial state,
          requiring no further input.
        </p>
        <h2>Rules</h2>
        <ol>
          <li>
            Any live cell with fewer than two live neighbors dies, as if caused
            by underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbors lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbors dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbors becomes a live cell,
            as if by reproduction.
          </li>
        </ol>
        <p>
          Click on the "Simulation" link in the navigation to start playing.
        </p>
      </div>
    </>
  );
};

export default HomePage;
