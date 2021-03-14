// handle resetGrid
import React, { Component } from "react";
import Grid from "./Grid";
import { dijkstras, getRequiredPath } from "../algorithms/dijkstras";

import "./PathVisualizer.css";

let startRow = 2;
let startCol = 11;
let endRow = 10;
let endCol = 36;

export default class PathVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isMouseActive: false,
      selectedNode: "",
    };
  }

  componentDidMount() {
    const nodes = startingGrid();
    this.setState({ grid: nodes });
  }

  // componentDidUpdate() {
  //   const nodes = startingGrid();
  //   this.setState({ grid: nodes });
  // }

  animateShortestPath(requiredPath) {
    for (let i = 0; i < requiredPath.length; ++i) {
      setTimeout(() => {
        const { row, col } = requiredPath[i];
        document.getElementById(`node-${row}-${col}`).className =
          "node node-path";
      }, 50 * i);
    }
  }

  animateDijkstras(visitedNodesInOrder, requiredPath) {
    for (let i = 0; i <= visitedNodesInOrder.length; ++i) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(requiredPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const currentNode = visitedNodesInOrder[i];
        document.getElementById(
          `node-${currentNode.row}-${currentNode.col}`
        ).className = "node node-visited";
      }, 10 * i);
    }
  }

  visualizeDijkstras = () => {
    console.log("Dijkstra's is called");
    const grid = this.state.grid;
    const srcNode = grid[startRow][startCol];
    const destNode = grid[endRow][endCol];
    const visitedNodesInOrder = dijkstras(srcNode, destNode, grid);
    const requiredPath = getRequiredPath(destNode);
    console.log(requiredPath);
    this.animateDijkstras(visitedNodesInOrder, requiredPath);
  };

  changeStartorEnd = (row, col, startOrEnd) => {
    const tempGrid = this.state.grid.slice();
    if (startOrEnd === "start") {
      tempGrid[startRow][startCol].isStart = false;
      startRow = row;
      startCol = col;
      tempGrid[startRow][startCol].isStart = true;
    } else if (startOrEnd === "end") {
      tempGrid[endRow][endCol].isFinish = false;
      endRow = row;
      endCol = col;
      tempGrid[endRow][endCol].isFinish = true;
    }

    tempGrid[row][col].isWall = false;
    this.setState({ grid: tempGrid });
  };

  handleMouseDown = (row, col) => {
    this.setState({ isMouseActive: true });
    if (row == startRow && col == startCol) {
      this.setState({ selectedNode: "start" }); //start node is selected
    } else if (row == endRow && col == endCol) {
      this.setState({ selectedNode: "end" }); //destination node is selected
    } else {
      this.setState({ selectedNode: "wall" }); //normal node(wall / available node) is selected

      const newGrid = getGridWithNewWalls(this.state.grid, row, col);
      this.setState({
        grid: newGrid,
      });
    }
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.isMouseActive) return;
    if (this.state.selectedNode != "wall")
      this.changeStartorEnd(row, col, this.state.selectedNode);
    else if (this.state.selectedNode == "wall")
      this.setState({ grid: getGridWithNewWalls(this.state.grid, row, col) });
  };

  handleMouseUp = (row, col) => {
    this.setState({ isMouseActive: false, selectedNode: "" });
  };

  resetGrid = () => {
    const tempGrid = this.state.grid.slice();
    tempGrid.map((row) => {
      row.map((node) => {
        node.isWall = false;
        node.isVisited = false;
        node.previousNode = null;
      });
    });
    this.setState({ grid: tempGrid });
  };

  render() {
    //visualize button
    const visualizebuttonMarkup = (
      <div className="button-container">
        <button className="visualize-button" onClick={this.visualizeDijkstras}>
          Visualize Dijkstra's Algorithm
        </button>
      </div>
    );

    //button for resetting grid
    const resetButtonMarkup = (
      <div className="button-container">
        <button className="visualize-button" onClick={this.resetGrid}>
          Reset Grid
        </button>
      </div>
    );

    return (
      <div>
        <Grid
          gridNodes={this.state.grid}
          handleMouseDown={(row, col) => this.handleMouseDown(row, col)}
          handleMouseUp={(row, col) => this.handleMouseUp(row, col)}
          handleMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
        />
        {visualizebuttonMarkup}
        {resetButtonMarkup}
      </div>
    );
  }
}

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row == startRow && col == startCol,
    isFinish: row == endRow && col == endCol,
    isWall: false,
    isVisited: false,
    previousNode: null,
  };
};

const startingGrid = () => {
  const nodes = [];
  for (let row = 0; row < 20; row++) {
    const curRow = [];
    for (let col = 0; col < 50; ++col) {
      const curNode = createNode(row, col);
      curRow.push(curNode);
    }
    nodes.push(curRow);
  }
  return nodes;
};

const getGridWithNewWalls = (grid, row, col) => {
  if (row == startRow && col == startCol) return grid;
  if (row == endRow && col == endCol) return grid;
  const tempGrid = grid.slice();
  tempGrid[row][col].isWall = !tempGrid[row][col].isWall;
  return tempGrid;
};
