import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import CreditsPage from "./CreditsPage";
import { GameProvider } from "./GameContext";
import HomePage from "./HomePage";
import SimulationPage from "./SimulationPage";

const router = createHashRouter([
  { path: "/", element: <HomePage /> },
  { path: "/simulation", element: <SimulationPage /> },
  { path: "/credits", element: <CreditsPage /> },
]);

function App() {
  return (
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  );
}

export default App;
