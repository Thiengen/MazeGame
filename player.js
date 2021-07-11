let cell_player_is_in;

function spawnPlayer(spawning_point){
  if(spawning_point){
    cell_player_is_in = all_cells_in_maze[getCellIndexByCoordinate(spawning_point.x, spawning_point.y)];
    return;
  }
  cell_player_is_in = all_cells_in_maze[getCellIndexByCoordinate(rows_number / 2, columns_number / 2)];
}

function keyPressed() {
    if ((keyCode == 87 || label === "Up" )&& !cell_player_is_in.walls[0]) {
    print(label)
    move(directions.TOP);
    return;
  }
  else if ((keyCode == 68 || label === "Right" )&& !cell_player_is_in.walls[1]) {
    move(directions.RIGHT);
    return;
  }
  else if ((keyCode == 83 || label === "Down" )&& !cell_player_is_in.walls[2]) {
    move(directions.BOTTOM);
    return;
  }
  else if ((keyCode == 65 ||label === "Left" )&& !cell_player_is_in.walls[3]) {
    move(directions.LEFT);
    return;
  }
}

function renderPlayer(side_color, fill_color) {
  cell_player_is_in.show(side_color, fill_color);
  cell_player_is_in.showAllWallHard(side_color);
}

function move(direction){
  const translation = goToDirection(direction, cell_player_is_in);
  cell_player_is_in = all_cells_in_maze[getCellIndexByCoordinate(translation.x, translation.y)];
}