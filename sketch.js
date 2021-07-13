let maze;
let player;

function preload(){
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/z1D-tZeyu/" + 'model.json')  ;
}


function preload(){
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/z1D-tZeyu/" + 'model.json')  ;
}

function setup() {

  createCanvas(600, 600);
  maze = new Maze(30, width, height);
  maze.Generate();
  player = new Player(maze);
  player.Spawn();
  OpenAndHideCamera();
  classifierVideo();
} 

function draw() {
  background(51);
  maze.Render(color(255,255,255), color(60, 60, 60));
  player.Render(color(47, 194, 86), color(10, 36, 17));
  printLabel();
  PlayerMovementWithLabel();
}
