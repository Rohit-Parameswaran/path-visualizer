export function dijkstras(sourceNode, destinationNode, grid) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = getAllNodes(grid);
  sourceNode.distance = 0;

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes); // should be replaced by a min heap
    const closestNode = unvisitedNodes.shift(); // removes and returns current 0th element

    if (closestNode.isWall && closestNode !== destinationNode) continue; // do nothing if closestNode is a wall
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    // if closestNode is at a distance of Infinity, it means that we are trapped
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === destinationNode) return visitedNodesInOrder;
    updateUnvisitedNeighbours(closestNode, grid);
  }
}

function getAllNodes(grid) {
  const allNodes = [];
  for (let row of grid) {
    for (let node of row) {
      node.distance = Infinity;
      node.isVisited = false;
      allNodes.push(node);
    }
  }
  return allNodes;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbours(closestNode, grid) {
  const unvisitedNeighbours = getUnvisitedNeighbours(closestNode, grid);
  for (const node of unvisitedNeighbours) {
    node.distance = closestNode.distance + 1;
    node.previousNode = closestNode;
  }
}

function getUnvisitedNeighbours(node, grid) {
  const unvisitedNeighbours = [];
  const { row, col } = node;
  if (row > 0) unvisitedNeighbours.push(grid[row - 1][col]);
  if (col > 0) unvisitedNeighbours.push(grid[row][col - 1]);
  if (row < grid.length - 1) unvisitedNeighbours.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) unvisitedNeighbours.push(grid[row][col + 1]);
  // if (row > 0 && col > 0) unvisitedNeighbours.push(grid[row - 1][col - 1]);
  // if (row > 0 && col < grid[0].length - 1)
  //   unvisitedNeighbours.push(grid[row - 1][col + 1]);
  // if (row < grid.length - 1 && col > 0)
  //   unvisitedNeighbours.push(grid[row + 1][col - 1]);
  // if (row < grid.length - 1 && col < grid[0].length - 1)
  //   unvisitedNeighbours.push(grid[row + 1][col + 1]);
  return unvisitedNeighbours.filter((node) => {
    if (!node.isVisited) return node;
  });
}

export function getRequiredPath(destinationNode) {
  const requiredPath = [];
  let currentNode = destinationNode;
  while (currentNode !== null) {
    requiredPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return requiredPath;
}
