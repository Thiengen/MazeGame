let gameSystem;
let difficulty_modifier = 2;
let debug = false;
// const model1 = "https://teachablemachine.withgoogle.com/models/e76KsCVS5/";
// const model2 = "https://teachablemachine.withgoogle.com/models/58FWJDZhc/";

function preload() {
	const loadedModels = [];
	directionClassifier = ml5.imageClassifier(
		"https://teachablemachine.withgoogle.com/models/7WRHgCGqz/" + "model.json",
		() => {
			print("Direction classifier is ready !");
			loadedModels.push(true);
			if (loadedModels.length >= 3) {
				label = "Ready to start GAME!";
				console.log("All models are ready !");
			}
		}
	);
	verticalClassifier = ml5.imageClassifier(
		"https://teachablemachine.withgoogle.com/models/gvwdkEKSF/" + "model.json",
		() => {
			print("Vertical classifier is ready !");
			loadedModels.push(true);
			if (loadedModels.length >= 3) {
				label = "Ready to start GAME!";
				console.log("All models are ready !");
			}
		}
	);
	horizontalClassifier = ml5.imageClassifier(
		"https://teachablemachine.withgoogle.com/models/9r5lWuqRi/" + "model.json",
		() => {
			print("Horizontal classifier is ready !");
			loadedModels.push(true);
			if (loadedModels.length >= 3) {
				label = "Ready to start GAME!";
				console.log("All models are ready !");
			}
		}
	);
}

function setup() {
	createCanvas(900, 700);
	video = createCapture(VIDEO);
	video.hide();
	video.size(320, 240);
	flippedVideo = ml5.flipImage(video);
	const maze = new Maze(50, width - 320, height - 240);
	const player = new Player(maze);
	gameSystem = new GameSystem(maze, player);
}

function draw() {
	background(38, 70, 83);
	// checkUserInput();
	gameSystem.update();
	PlayerMovementWithLabel();
	ShowLabelAndWebCam();
}

function ShowLabelAndWebCam() {
	printLabel();
	image(flippedVideo, width - video.width, height - video.height);
}
