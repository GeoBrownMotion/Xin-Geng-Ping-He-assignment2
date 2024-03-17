import React from "react";
import NavBar from "./components/NavBar";

const CreditsPage = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Credits</h1>
        <p>
          This implementation of Conway's Game of Life was created by [Your
          Name].
        </p>
        <p>
          You can find the source code on GitHub:{" "}
          <a
            href="https://github.com/GeoBrownMotion/Xin-Geng-Ping-He-assignment2.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/GeoBrownMotion/Xin-Geng-Ping-He-assignment2.git
          </a>
        </p>
      </div>
    </>
  );
};

export default CreditsPage;
