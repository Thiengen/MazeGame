let game;
let config;
let debug = false;
let width = 900;
let height = 700

function preload() {
	document.addEventListener("OnAllAssetsReady", () => {
		game.gameState.gameStatus = "Ready to start game !!!";
		game.ready = true;
		game.gameState.instructionText = "Ready? Open your hand palm \n to start the game !!!";
		game.assets = config.getResourceAssets();
	});

	config = new configuration();

	config.loadAssets(
		"Image",
		{ Up: "./Images/Up.jpg", Down: "./Images/Down.jpg",Open: "./Images/Open.jpg", Left: "./Images/Left.jpg", Right: "./Images/Right.jpg" },
		(source) => {
			let images = {};
			for (const key in source) {
				const image = loadImage(source[key], () => config.onAssetReady());
				images[key] = image;
			}
			return images;
		}
	);

	config.loadAssets(
		"Model",
		{
			Direction: "https://teachablemachine.withgoogle.com/models/7WRHgCGqz/",
			Vertical: "https://teachablemachine.withgoogle.com/models/gvwdkEKSF/",
			Horizontal: "https://teachablemachine.withgoogle.com/models/9r5lWuqRi/",
		},
		(source) => {
			let models = {};
			for (const key in source) {
				const model = new classifier(key, source[key], () => {
					config.onAssetReady();
				});
				models[key] = model;
			}
			return models;
		}
	);

	//Setup webcam video
	config.loadAssets("Video", { video: VIDEO }, (source) => {
		const video = createCapture(source.video, () => {
			config.onAssetReady();
		}).hide();
		video.size(240, 180);
		return video;
	});

	configureGameColor(color(0), color(172, 75, 28), color(255, 213, 126), color(252, 166, 82), color(255, 239, 160));
//Background , Maze , Lines && reach point , Player , Reachpoint lines
	config.loadAssets("Difficulty", {
		difficultyOffset: 2,
		difficultySpeed: 1,
		difficultyAcceleration: 0.5,
	});
}

function setup() {
	createCanvas(width, height);
	const maze = new Maze(50, width - 320, height - 240);
	game = new gameSystem(maze, new Player());
}

function draw() {
	background(config.assets.getChildAssetByType("Color").data.background);
	game.update();
	PlayerMovementWithLabel();
}

function configureGameColor(background, maze, mazeWall, player, target) {
	config.loadAssets(
		"Color",
		{
			background,
			maze,
			mazeWall,
			player,
			target,
			text: color(200),
		},
		(source) => {
			for (let i = 0; i < Object.keys(source).length; i++) {
				config.onAssetReady();
			}
			return source;
		}
	);
}
