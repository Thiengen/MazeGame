let columns_number, rows_number;
let cell_length = 20;
let all_cells_in_maze = [];                                               //The Array that holds every cells in the generated maze

function setup() {
  createCanvas(600, 600);
  columns_number = floor(width / cell_length);
  rows_number = floor(height / cell_length);

  addAllCellsToMaze(all_cells_in_maze, rows_number, columns_number);     //Add row * columns of cells to the array
  GenerateMaze();                                                        //Call the maze generating algorithm to generate the maze
}

function draw() {
  background(51);
  drawAllCellsInMaze(all_cells_in_maze, color(60, 60, 60), color(255,255,255));              //render the maze every update, pass in the array that holds all the cell so the function can draw out all the cells that is the array
}

// function keyPressed(){
//   if(keyCode==87){
//     if(!player_position.walls[0]){
//       player_position = cells[getCellIndexByCoordinate(player_position.x, player_position.y - 1)];
//     }
//     console.log("moving up ...");
//   }
//   if(keyCode==65){
//     if(!player_position.walls[3]){
//       player_position = cells[getCellIndexByCoordinate(player_position.x - 1, player_position.y)];
//     }
//     console.log("moving left ...");
//   }
//   if(keyCode==83){
//     if(!player_position.walls[2]){
//       player_position = cells[getCellIndexByCoordinate(player_position.x, player_position.y + 1)];
//     }
//     console.log("moving down ...");
//   }
//   if(keyCode==68){
//     if(!player_position.walls[1]){
//       player_position = cells[getCellIndexByCoordinate(player_position.x + 1, player_position.y)];
//     }
//     console.log("moving right ...");
//   }
// }

