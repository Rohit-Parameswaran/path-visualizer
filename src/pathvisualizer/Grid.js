import React, { Component } from "react";
import Node from "./Node/Node";

import "./Grid.css";

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const grid = this.props.gridNodes;

    return (
      <div>
        <table className="grid">
          <tbody>
            {grid.map((rows, rowIdx) => {
              return (
                <tr className="gridRow" key={rowIdx}>
                  {rows.map((node, nodeIdx) => {
                    return (
                      <Node
                        key={nodeIdx}
                        cell={node}
                        handleMouseDown={(row, col) =>
                          this.props.handleMouseDown(row, col)
                        }
                        handleMouseUp={(row, col) =>
                          this.props.handleMouseUp(row, col)
                        }
                        handleMouseEnter={(row, col) =>
                          this.props.handleMouseEnter(row, col)
                        }
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
