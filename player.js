class Player{
  cell_in;
  maze;

  constructor(maze){
    this.maze = maze;
  }

  Spawn(spawning_point, maze){
    if(maze){
      this.maze = maze;
    }
    if(spawning_point){
      const cell = maze.GetCellByCoordinate(spawning_point.x, spawning_point.y);
      if(cell){
        this.cell_in = cell;
        return;
      }
      console.warn("Spawned player outside of the maze !!!");
    }
    this.cell_in = this.maze.GetCellByCoordinate(this.maze.rows_number / 2, this.maze.columns_number / 2);
  }

  Render(side_color, fill_color){
    fill(fill_color);
    rect(this.cell_in.absolute_x, this.cell_in.absolute_y, this.maze.cell_length, this.maze.cell_length);
    stroke(side_color);   // LOKI SKIN
    line(this.cell_in.absolute_x, this.cell_in.absolute_y, this.cell_in.absolute_x + this.maze.cell_length, this.cell_in.absolute_y);
    line(this.cell_in.absolute_x + this.maze.cell_length, this.cell_in.absolute_y, this.cell_in.absolute_x + this.maze.cell_length, this.cell_in.absolute_y + this.maze.cell_length);
    line(this.cell_in.absolute_x + this.maze.cell_length, this.cell_in.absolute_y + this.maze.cell_length, this.cell_in.absolute_x, this.cell_in.absolute_y + this.maze.cell_length);
    line(this.cell_in.absolute_x, this.cell_in.absolute_y + this.maze.cell_length, this.cell_in.absolute_x, this.cell_in.absolute_y);
  }

  Move(direction){
    const translation = this.MoveToCell(direction, this.cell_in);
    this.cell_in =  this.maze.GetCellByCoordinate(translation.x, translation.y);
  }
  
  MoveToCell(direction, coordinate){
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
}

function keyPressed() {
  if ((keyCode == 87 || label === "Up" )&& !player.cell_in.walls[0]) {
    player.Move(directions.TOP);
    return;
  }
  else if ((keyCode == 68 || label === "Right" )&& !player.cell_in.walls[1]) {
    player.Move(directions.RIGHT);
    return;
  }
  else if ((keyCode == 83 || label === "Down" )&& !player.cell_in.walls[2]) {
    player.Move(directions.BOTTOM);
    return;
  }
  else if ((keyCode == 65 ||label === "Left" )&& !player.cell_in.walls[3]) {
    player.Move(directions.LEFT);
  }
}