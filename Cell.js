class Cell{
  x;
  y;
  maze;
  visited = false;
  walls = [true, true, true, true];
  absolute_x;
  absolute_y;

  constructor(x, y, maze){
    this.x = x;
    this.y = y;
    this.maze = maze;
    this.absolute_x = this.x * this.maze.cell_length;
    this.absolute_y = this.y * this.maze.cell_length;
  }

  Show(wall_color, cell_color) {                                                     //Show the cell and their active walls with color
    stroke(wall_color);
    if (this.walls[0]) {                                                                            //If this side of the wall is true then draw a line to show the wall, else don't draw the line
      line(this.absolute_x, this.absolute_y, this.absolute_x + this.maze.cell_length, this.absolute_y);
    }
    if (this.walls[1]) {
      line(this.absolute_x + this.maze.cell_length, this.absolute_y, this.absolute_x + this.maze.cell_length, this.absolute_y + this.maze.cell_length);
    }
    if (this.walls[2]) {
      line(this.absolute_x + this.maze.cell_length, this.absolute_y + this.maze.cell_length, this.absolute_x, this.absolute_y + this.maze.cell_length);
    }
    if (this.walls[3]) {
      line(this.absolute_x, this.absolute_y + this.maze.cell_length, this.absolute_x, this.absolute_y);
    }
    noStroke();
    fill(cell_color);
    rect(this.absolute_x, this.absolute_y, this.maze.cell_length, this.maze.cell_length);                                       //Draw a rectangle(in this case is a square) inside the cell to show color
  };

  CheckNeighbors() {                                //Used in the maze genration algorithm
    if(!this.maze){
      console.warn("This cell doesn't belongs to any maze !!!");
      return undefined;
    }
    let neighbors = [];
    const top = this.maze.GetCellByCoordinate(this.x, this.y - 1);
    const right = this.maze.GetCellByCoordinate(this.x + 1, this.y);
    const bottom = this.maze.GetCellByCoordinate(this.x, this.y + 1);
    const left = this.maze.GetCellByCoordinate(this.x - 1, this.y);

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
    } 
    else {
      return undefined;
    }
  }
}

const directions = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
}