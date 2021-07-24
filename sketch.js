let gameSystem;
let difficulty_modifier = 2;
// const model1 = "https://teachablemachine.withgoogle.com/models/e76KsCVS5/";
// const model2 = "https://teachablemachine.withgoogle.com/models/58FWJDZhc/";

function preload(){
  directionClassifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/7WRHgCGqz/" + "model.json", ()=> {
    print("Direction classifier is ready !");
  });
  verticalClassifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/gvwdkEKSF/" + "model.json", ()=> {
    print("Vertical classifier is ready !");
  });
  horizontalClassifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/9r5lWuqRi/" + "model.json", ()=> {
    print("Horizontal classifier is ready !");
    classifyDirection();
  });
}

function setup() {
  createCanvas(900, 700);
  video = createCapture(VIDEO);
  video.hide();
  video.size(320, 240);
  flippedVideo = ml5.flipImage(video);
  const maze = new Maze(40, width - 320, height - 240);
  const player = new Player(maze);
  gameSystem = new GameSystem(maze, player);
} 

function draw() {
  background(38, 70, 83);
  // checkUserInput();
  gameSystem.update();
  PlayerMovementWithLabel();
  debug();
}

function debug(){
  printLabel();
  image(flippedVideo, width - video.width, height - video.height);
}