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
    const size = this.maze.cell_length - 5;
    const offset = (this.maze.cell_length - size) / 2;
    rect(this.cell_in.absolute_v.x + offset, this.cell_in.absolute_v.y + offset, size, size);
    stroke(side_color);   // NOT LOKI SKIN ANYMORE
    strokeWeight(0.5);
    for (let i = 0; i < this.cell_in.walls.length; i++) {
      const wall = this.cell_in.walls[i];
      line(wall.vertex1.x, wall.vertex1.y, wall.vertex2.x, wall.vertex2.y);
    }
  }

  Move(direction){
    const translation = this.MoveToCell(direction, this.cell_in.vector);
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

function keyTyped(){
  if(!(gameSystem.gameState instanceof PlayState)){return;}
  const player = gameSystem.player;
  if(key === 'w' && !player.cell_in.walls[0]){
    player.Move(directions.TOP);
    return;
  }
  else if (key === 'a' && !player.cell_in.walls[3]) {
    player.Move(directions.LEFT);
    return;
  }
  else if (key === 'd' && !player.cell_in.walls[1]) {
    player.Move(directions.RIGHT);
    return;
  }
  else if (key === 's' && !player.cell_in.walls[2]) {
    player.Move(directions.BOTTOM);
  }
}

function PlayerMovementWithLabel() {
  if (label == "Up" && !player.cell_in.walls[0].is_active) {
    player.Move(directions.TOP);
    return;
  }
  else if (label == "Right"&& !player.cell_in.walls[1].is_active) {
    player.Move(directions.RIGHT);
    return;
  }
  else if (label == "Down"&& !player.cell_in.walls[2].is_active) {
    player.Move(directions.BOTTOM);
    return;
  }
  else if (label == "Left"&& !player.cell_in.walls[3].is_active) {
    player.Move(directions.LEFT);
  }
}