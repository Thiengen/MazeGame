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
    const cell_cornerVector = createVector(-this.maze.cell_length/2, -this.maze.cell_length / 2);  
    const cell_midPoint = createVector(this.absolute_x + this.maze.cell_length / 2, this.absolute_y + this.maze.cell_length / 2);    
    for (let i = 0; i < this.walls.length; i++) {
      if(this.walls[i]){
        const vertex_one = p5.Vector.add(cell_midPoint, cell_cornerVector);
        cell_cornerVector.rotate(HALF_PI);
        const vertex_two = p5.Vector.add(cell_midPoint, cell_cornerVector);
        line(vertex_one.x,vertex_one.y,vertex_two.x,vertex_two.y);
      }else{
        cell_cornerVector.rotate(HALF_PI);
      }
    }
    noStroke();
    fill(cell_color);
    rect(this.absolute_x, this.absolute_y, this.maze.cell_length, this.maze.cell_length);                                       //Draw a rectangle(in this case is a square) inside the cell to show color
  }

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
