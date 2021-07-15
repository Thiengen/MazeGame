let maze;
let player;

function preload(){
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/z1D-tZeyu/" + 'model.json')  ;
}

function setup() {
  loadGame = false;
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
  textSize(75)
  text(StartPic , 120 , 150)
  textSize(60)
  text(InstructionText , 50 , 250)
  LoadGame();
}
