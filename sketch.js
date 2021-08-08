let game;
let config;
let debug = false;

function preload() {
	document.addEventListener("OnAllAssetsReady", () => {
		game.gameState.gameStatus = "Ready to start game !!!";
		game.gameState.instructionText = "Ready? Open your hand palm \n to start the game !!!";
		game.ready = true;
		game.assets = config.getResourceAssets();
		runEditor();
	});

	config = new configuration();

	config.loadAssets(
		"Image",
		{ Up: "./Images/Up.jpg", Down: "./Images/Down.jpg", Left: "./Images/Left.jpg", Right: "./Images/Right.jpg" },
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

	config.loadAssets(
		"Color",
		{
			background: color(27, 26, 23),
			maze: color(172, 75, 28),
			mazeWall: color(255, 213, 126),
			player: color(252, 166, 82),
			target: color(255, 239, 160),
			text: color(255, 213, 126),
			button: color(106, 73, 43),
		},
		(source) => {
			for (let i = 0; i < Object.keys(source).length; i++) {
				config.onAssetReady();
			}
			return source;
		}
	);

	config.loadAssets("Difficulty", {
		difficultyOffset: 2,
		difficultySpeed: 1,
		difficultyAcceleration: 0.5,
	});
}

function setup() {
	createCanvas(900, 700);
	const maze = new Maze(50, width - 320, height - 240);
	game = new gameSystem(maze, new Player());
}

function draw() {
	background(config.assets.getChildAssetByType("Color").data.background);
	game.update();
	PlayerMovementWithLabel();
}
