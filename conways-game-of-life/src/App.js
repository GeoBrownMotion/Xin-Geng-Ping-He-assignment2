import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import SimulationPage from './SimulationPage';
import CreditsPage from './CreditsPage';
import { GameProvider } from './GameContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

function App() {
  return (
    <Router>
      <GameProvider>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Conway's Game of Life
              </Link>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/simulation">
                      Simulation
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/credits">
                      Credits
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </GameProvider>
    </Router>
  );
}

export default App;