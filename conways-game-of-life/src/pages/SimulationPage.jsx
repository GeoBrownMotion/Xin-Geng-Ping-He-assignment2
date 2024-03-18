import { Button, Form, InputNumber } from "antd";
import React, { useContext, useEffect } from "react";
import { GameContext } from "../GameContext";
import Grid from "../components/Grid";
import NavBar from "../components/NavBar";
import useInterval from "../useInterval";

const SimulationPage = () => {
  const {
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
  } = useContext(GameContext);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const toggleCell = (row, col) => {
    const updatedGrid = [...grid];
    updatedGrid[row][col].live = !updatedGrid[row][col].live;
    updatedGrid[row][col].lastLiveFrame = frame;
    setGrid(updatedGrid);
  };

  useInterval(
    () => {
      if (isRunning) {
        updateGrid();
      }
    },
    isRunning ? 200 : null
  );

  const toggleAutoplay = () => {
    setIsRunning(!isRunning);
  };

  const [form] = Form.useForm();

  return (
    <>
      <NavBar />
      <div className="container">
        <Form
          initialValues={gridSize}
          layout="inline"
          from={form}
          onFinish={(values) => setGridSize(values)}
        >
          <Form.Item
            label="Rows"
            name="rows"
            rules={[
              {
                type: "number",
                min: 3,
                max: 40,
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Columns"
            name="cols"
            rules={[
              {
                type: "number",
                min: 3,
                max: 40,
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Resize Grid</Button>
          </Form.Item>
        </Form>

        <Grid grid={grid} toggleCell={toggleCell} />
        <div className="controls">
          <button className="btn btn-primary" onClick={initializeGrid}>
            Reset Grid
          </button>
          <button className="btn btn-primary" onClick={() => updateGrid()}>
            Next Frame
          </button>
          <button className="btn btn-primary" onClick={toggleAutoplay}>
            {isRunning ? "Stop" : "Start"} Autoplay
          </button>
          <label>
            Longer Lasting Cells:
            <input
              type="checkbox"
              checked={longerLastingCellsEnabled}
              onChange={() =>
                setLongerLastingCellsEnabled(!longerLastingCellsEnabled)
              }
            />
          </label>
          <p>Live Cells: {liveCellsCount}</p>
        </div>
      </div>
    </>
  );
};

export default SimulationPage;
