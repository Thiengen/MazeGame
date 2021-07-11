//depth first search backtracking
function GenerateMaze(starting_Point) {
  let currentCell;
  let stack = [];
  if(starting_Point){
    let currentCellIndex =  getCellIndexByCoordinate(starting_Point.x, starting_Point.y);
    currentCell = all_cells_in_maze[currentCellIndex];
  }
  else{
    currentCell = all_cells_in_maze[0];
  }
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

function getCellIndexByCoordinate(x, y) {                                                //There is an array that holds all the cells in the genrated maze, use the coordinate of the cell to get the index of the cell in that array
  if (x < 0 || y < 0 || x > columns_number - 1 || y > rows_number - 1) {
    return -1;
  }
  return x + y * columns_number;
}

function connectNeighbours(currentCell, neighbourCell) {                                 //Remove the walls to connect the cells(set the target side of the wall to value: False)
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