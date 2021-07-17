class Wall{
  constructor(vertex1, vertex2, is_active){
    this.vertex1 = createVector(vertex1.x,vertex1.y);
    this.vertex2 = createVector(vertex2.x,vertex2.y);
    this.is_active = is_active;
  }
}

class Cell{
  x;
  y;
  maze;
  visited = false;
  walls = [];
  absolute_x;
  absolute_y;

  constructor(x, y, maze){
    this.x = x;
    this.y = y;
    this.maze = maze;
    this.absolute_x = this.x * this.maze.cell_length;
    this.absolute_y = this.y * this.maze.cell_length;
    this.GenerateWalls();
  }

  GenerateWalls() {
    const cell_midPoint = createVector(this.absolute_x + this.maze.cell_length / 2, this.absolute_y + this.maze.cell_length / 2);
    const cell_cornerVector = createVector(-this.maze.cell_length / 2, -this.maze.cell_length / 2);
    for (let i = 0; i < 4; i++) {
      const vertex_one = p5.Vector.add(cell_midPoint, cell_cornerVector);
      cell_cornerVector.rotate(HALF_PI);
      const vertex_two = p5.Vector.add(cell_midPoint, cell_cornerVector);
      this.walls.push(new Wall(vertex_one, vertex_two, true));
    }
  }

  Show(wall_color, cell_color) {                                                     //Show the cell and their active walls with color
    stroke(wall_color);
    for (let i = 0; i < this.walls.length; i++) {
      if(this.walls[i].is_active){
        const vertex1 = this.walls[i].vertex1;
        const vertex2 = this.walls[i].vertex2;
        line(vertex1.x,vertex1.y,vertex2.x,vertex2.y);
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
