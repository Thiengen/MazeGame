let gameSystem;
let difficulty_modifier = 2;
let debug = false;
// const model1 = "https://teachablemachine.withgoogle.com/models/e76KsCVS5/";
// const model2 = "https://teachablemachine.withgoogle.com/models/58FWJDZhc/";
const classifiers = [];

function preload() {
	classifiers.push(new Classifier("Direction", "https://teachablemachine.withgoogle.com/models/7WRHgCGqz/"));
	classifiers.push(new Classifier("Vertical", "https://teachablemachine.withgoogle.com/models/gvwdkEKSF/"));
	classifiers.push(new Classifier("Horizontal", "https://teachablemachine.withgoogle.com/models/9r5lWuqRi/"));
}

function setup() {
	createCanvas(900, 700);
	const maze = new Maze(50, width - 320, height - 240);
	gameSystem = new GameSystem(maze, new Player(), classifiers);
}

function draw() {
	background(38, 70, 83);
	checkUserInput();
	gameSystem.update();
	PlayerMovementWithLabel();
	printLabel();
}
