import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { GameProvider } from "./GameContext";
import CreditsPage from "./pages/CreditsPage";
import HomePage from "./pages/HomePage";
import SimulationPage from "./pages/SimulationPage";

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
