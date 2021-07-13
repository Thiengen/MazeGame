class Maze{
  rows_number;
  columns_number;
  cell_length;
  all_cells = [];

  constructor(cell_length, width, height){
    this.cell_length = cell_length;
    this.rows_number = floor(width / cell_length);
    this.columns_number = floor(height / cell_length);
  }

  Render(wall_color ,cell_color){
    for (let i = 0; i < this.all_cells.length; i++) {
      this.all_cells[i].Show(wall_color, cell_color);      
    }
  }
  
  Generate(start_point){
    let stack = [];
    if(this.all_cells.length < this.rows_number * this.columns_number){
      this.AddAllCellsToMaze();
    }
    let current_cell = this.all_cells[0];
    if(start_point){
      current_cell = this.GetCellByCoordinate(start_point.x, start_point.y);
    }
    while (true) {
      current_cell.visited = true;
      let next = current_cell.CheckNeighbors();
      if (next) {
        next.visited = true;
        stack.push(current_cell);
        this.ConnectNeighbours(current_cell, next);
        current_cell = next;
      } 
      else if (stack.length > 0) {
        current_cell = stack.pop();
      } 
      else {
        break;
      }
    }
  }
  
  ConnectNeighbours(currentCell, neighbourCell) {                                 //Remove the walls to connect the cells(set the target side of the wall to value: False)
    let dist_x = currentCell.x - neighbourCell.x;
    if (dist_x === 1) {
      currentCell.walls[3] = false;
      neighbourCell.walls[1] = false;
    } 
    else if (dist_x === -1) {
      currentCell.walls[1] = false;
      neighbourCell.walls[3] = false;
    }
    let dist_y = currentCell.y - neighbourCell.y;
    if (dist_y === 1) {
      currentCell.walls[0] = false;
      neighbourCell.walls[2] = false;
    } 
    else if (dist_y === -1) {
      currentCell.walls[2] = false;
      neighbourCell.walls[0] = false;
    }
  }
  
  AddAllCellsToMaze(){                                   //Add every single cell in the maze to an array so we can get the cell from that array
    for (let j = 0; j < this.rows_number; j++) {
      for (let i = 0; i < this.columns_number; i++) {
        this.all_cells.push(new Cell(i, j, this));
      }
    }
  }
  
  GetCellByCoordinate(x, y){
    if(this.all_cells.length <= 0){
      console.warn("Maze has no cell !!!");
      return null;
    }
    return this.all_cells[Maze.GetCellIndexByCoordinate(x, y, this)];
  }

  static GetCellIndexByCoordinate(x, y, maze) {                                                //There is an array that holds all the cells in the genrated maze, use the coordinate of the cell to get the index of the cell in that array
    if (x < 0 || y < 0 || x > maze.columns_number - 1 || y > maze.rows_number - 1) {
      return -1;
    }
    return x + y * maze.columns_number;
  }
}


