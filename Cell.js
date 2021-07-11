function Cell(x, y) {                                                 //Constructor function, like a class in c#
  this.x = x;                                                         //Coordinate x of this cell
  this.y = y;                                                         //Coordinate y of this cell
  this.walls = [true, true, true, true];                              //Top, right, bottom, left  When the value is False, the wall will not show up
  this.visited = false;                                             //Used in the maze genration algorithm

  this.checkNeighbors = function() {                                //Used in the maze genration algorithm
    let neighbors = [];

    let top = all_cells_in_maze[getCellIndexByCoordinate(x, y - 1)];
    let right = all_cells_in_maze[getCellIndexByCoordinate(x + 1, y)];
    let bottom = all_cells_in_maze[getCellIndexByCoordinate(x, y + 1)];
    let left = all_cells_in_maze[getCellIndexByCoordinate(x - 1, y)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };

  this.show = function(wall_color, cell_color) {                                                     //Show the cell and their active walls with color
    let position_x = this.x * cell_length;
    let position_y = this.y * cell_length;
    stroke(wall_color);
    if (this.walls[0]) {                                                                            //If this side of the wall is true then draw a line to show the wall, else don't draw the line
      line(position_x, position_y, position_x + cell_length, position_y);
    }
    if (this.walls[1]) {
      line(position_x + cell_length, position_y, position_x + cell_length, position_y + cell_length);
    }
    if (this.walls[2]) {
      line(position_x + cell_length, position_y + cell_length, position_x, position_y + cell_length);
    }
    if (this.walls[3]) {
      line(position_x, position_y + cell_length, position_x, position_y);
    }
    noStroke();
    fill(cell_color);
    rect(position_x, position_y, cell_length, cell_length);                                       //Draw a rectangle(in this case is a square) inside the cell to show color
  };

  this.showAllWallHard = function(wall_color){
    let position_x = this.x * cell_length;
    let position_y = this.y * cell_length;
    stroke(wall_color);
    line(position_x, position_y, position_x + cell_length, position_y);
    line(position_x + cell_length, position_y, position_x + cell_length, position_y + cell_length);
    line(position_x + cell_length, position_y + cell_length, position_x, position_y + cell_length);
    line(position_x, position_y + cell_length, position_x, position_y);
  }
}

function addAllCellsToMaze(cells, rows_number, columns_number){                                   //Add every single cell in the maze to an array so we can get the cell from that array
    for (let j = 0; j < rows_number; j++) {
      for (let i = 0; i < columns_number; i++) {
        var cell = new Cell(i, j);
        cells.push(cell);
      }
  }
}

function drawAllCellsInMaze(cells ,wall_color ,cell_color){                                                        //Render the maze at this frame
  for (let i = 0; i < cells.length; i++) {
    cells[i].show(cell_color, wall_color);    
  }
}

const directions = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
}

function goToDirection(direction, coordinate){
  switch (direction) {
    case directions.TOP:
      return createVector(0, -1).add(coordinate.x, coordinate.y);
    case directions.RIGHT:
      return createVector(1, 0).add(coordinate.x, coordinate.y);
    case directions.BOTTOM:
      return createVector(0, 1).add(coordinate.x, coordinate.y);
    case directions.LEFT:
      return createVector(-1, 0).add(coordinate.x, coordinate.y);
    default:
      console.warn("Direction not given");
      break;
  }
}