let game;
let config;
let difficulty_modifier = 5;
let debug = false;

function preload() {
	document.addEventListener("OnAllAssetsReady", () => {
		game.gameState.gameStatus = "Ready to start game !!!";
		game.ready = true;
		game.gameState.instructionText = "Ready? Open your hand palm \n to start the game !!!";
		game.assets = config.getResourceAssets();
	});

	config = new configuration();

	config.loadAssets("Image", ["./Images/Up.jpg", "./Images/Down.jpg", "./Images/Left.jpg", "./Images/Right.jpg"], (source) => {
		return loadImage(source, () => config.onAssetReady());
	});

	config.loadAssets(
		"Model",
		[
			{
				name: "Direction",
				URL: "https://teachablemachine.withgoogle.com/models/7WRHgCGqz/",
			},
			{
				name: "Vertical",
				URL: "https://teachablemachine.withgoogle.com/models/gvwdkEKSF/",
			},
			{
				name: "Horizontal",
				URL: "https://teachablemachine.withgoogle.com/models/9r5lWuqRi/",
			},
		],
		(source) => {
			return new classifier(source.name, source.URL, () => {
				config.onAssetReady();
			});
		}
	);

	//Setup webcam video
	config.loadAssets("Video", [VIDEO], (source) => {
		const video = createCapture(source, () => {
			config.onAssetReady();
		}).hide();
		video.size(240, 180);
		return video;
	});

	configureGameColor(color(27, 26, 23), color(172, 75, 28), color(255, 213, 126), color(252, 166, 82), color(255, 239, 160));
}

function setup() {
	createCanvas(900, 700);
	const maze = new Maze(50, width - 320, height - 240);
	game = new gameSystem(maze, new Player());
}

function draw() {
	background(config.assets.getChildAssetByType("Color")[0].background);
	game.update();
	PlayerMovementWithLabel();
}

function configureGameColor(background, maze, mazeWall, player, target) {
	config.loadAssets(
		"Color",
		[
			{
				background,
				maze,
				mazeWall,
				player,
				target,
				text: color(255, 239, 160),
			},
		],
		(source) => {
			config.onAssetReady();
			return source;
		}
	);
}
