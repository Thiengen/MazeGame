let columns_number, rows_number;
let cell_length = 30;
let all_cells_in_maze = [];                                               //The Array that holds every cells in the generated maze


function preload(){
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/z1D-tZeyu/" + 'model.json')  ;
}

function setup() {

  createCanvas(600, 600);
  setMazeSize(floor(width / cell_length), floor(height / cell_length));
  addAllCellsToMaze(all_cells_in_maze, rows_number, columns_number);     //Add row * columns of cells to the array
  GenerateMaze(createVector(rows_number/2, columns_number/2));           //Call the maze generating algorithm to generate the maze
  OpenAndHideCamera();
  classifierVideo();
  spawnPlayer();
} 

function draw() {
  background(51);
  drawAllCellsInMaze(all_cells_in_maze, color(60, 60, 60), color(255,255,255));              //render the maze every update, pass in the array that holds all the cell so the function can draw out all the cells that is the array
  renderPlayer(color(47, 194, 86), color(10, 36, 17));
  printLabel();
  frameRate(10)
  keyPressed();
}

function setMazeSize(width, height) {
  columns_number = width;
  rows_number = height;
}
