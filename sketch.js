let gameSystem;
let difficulty_modifier = 2;

function preload(){
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/z1D-tZeyu/" + 'model.json', function() {
    print("model ready!");
  });
}

function setup() {
  createCanvas(600, 600);
  const maze = new Maze(30, width, height);
  const player = new Player(maze);
  gameSystem = new GameSystem(maze, player);
  OpenAndHideCamera();
  classifierVideo();
} 

function draw() {
  background(38, 70, 83);
  gameSystem.update();
  //printLabel();
  //PlayerMovementWithLabel();
}
