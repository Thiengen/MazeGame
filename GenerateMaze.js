//depth first search backtracking
function GenerateMaze() {
  currentCell = cells[0];
  while (true) {
    currentCell.visited = true;
    let next = currentCell.checkNeighbors();
    if (next) {
      next.visited = true;
      stack.push(currentCell);
      connectNeighbours(currentCell, next);
      currentCell = next;
    } else if (stack.length > 0) {
      currentCell = stack.pop();
    } else {
      break;
    }
  }
}

function getCellIndexByCoordinate(x, y) {
  if (x < 0 || y < 0 || x > columns - 1 || y > rows - 1) {
    return -1;
  }
  return x + y * columns;
}

function connectNeighbours(currentCell, neighbourCell) {
  let dist_x = currentCell.x - neighbourCell.x;
  if (dist_x === 1) {
    currentCell.walls[3] = false;
    neighbourCell.walls[1] = false;
  } else if (dist_x === -1) {
    currentCell.walls[1] = false;
    neighbourCell.walls[3] = false;
  }
  let dist_y = currentCell.y - neighbourCell.y;
  if (dist_y === 1) {
    currentCell.walls[0] = false;
    neighbourCell.walls[2] = false;
  } else if (dist_y === -1) {
    currentCell.walls[2] = false;
    neighbourCell.walls[0] = false;
  }
}