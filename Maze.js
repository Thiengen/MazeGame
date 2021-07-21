class Maze{
  rows_number;
  columns_number;
  cell_length;
  all_cells = [];

  constructor(cell_length, width, height){
    this.SetSize(cell_length, width, height);
  }

  SetSize(cell_length, width, height){
    this.cell_length = floor(cell_length);
    this.rows_number = floor(width / cell_length);
    this.columns_number = floor(height / cell_length);
  }

  Render(wall_color ,cell_color){
    for (let i = 0; i < this.all_cells.length; i++) {
      this.all_cells[i].Show(wall_color, cell_color);      
    }
  }
  
  Generate(start_point){
    this.all_cells = [];
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
    const bisectorOfDisplacement = createVector(currentCell.absolute_v.y - neighbourCell.absolute_v.y, neighbourCell.absolute_v.x - currentCell.absolute_v.x);
    for (let i = 0; i < currentCell.walls.length; i++) {
      let wall_vector = p5.Vector.sub(currentCell.walls[i].vertex1, currentCell.walls[i].vertex2)
      if( wall_vector.dist(bisectorOfDisplacement) <= 0.1){
        neighbourCell.walls[i].is_active = false;
        let j = i + currentCell.walls.length / 2;
        if(i >= currentCell.walls.length / 2){
          j -= currentCell.walls.length;
        }
        currentCell.walls[j].is_active = false;
      }
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
    return floor(x) + floor(y) * maze.columns_number;
  }
}


