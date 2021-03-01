import React, { Component } from "react";
import "./Node.css";

export class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const startEndOrWall = this.props.cell.isStart
      ? "startnode"
      : this.props.cell.isFinish
      ? "finishnode"
      : this.props.cell.isWall
      ? "wallnode"
      : "";
    const { row, col } = this.props.cell;
    return (
      <td
        id={`node-${row}-${col}`}
        className={`node ${startEndOrWall}`}
        onMouseDown={() => this.props.handleMouseDown(row, col)}
        onMouseEnter={() => this.props.handleMouseEnter(row, col)}
        onMouseUp={this.props.handleMouseUp}
      ></td>
    );
  }
}

export default Node;
