let gameSystem;
let difficulty_modifier = 2;

function preload(){
<<<<<<< HEAD
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/T0F1IgmTv/" + 'model.json')  ;
=======
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/z1D-tZeyu/" + 'model.json', function() {
    print("model ready!");
  });
>>>>>>> afe73541ada14fd9e7c2393263abf77b4518c4cc
}

function setup() {
  loadGame = false;
  createCanvas(600, 600);
  const maze = new Maze(30, width, height);
  const player = new Player(maze);
  gameSystem = new GameSystem(maze, player);
  OpenAndHideCamera();
  classifierVideo();
} 

function draw() {
<<<<<<< HEAD
  background(51);
  frameRate(10);
  textSize(75)
  text(StartPic , 120 , 150)
  textSize(60)
  text(InstructionText , 50 , 250)
  LoadGame();
=======
  background(38, 70, 83);
  gameSystem.update();
  //printLabel();
  //PlayerMovementWithLabel();
>>>>>>> afe73541ada14fd9e7c2393263abf77b4518c4cc
}
