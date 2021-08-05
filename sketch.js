let game;
let config;
let debug = false;
let width = 900;
let height = 700

function preload() {
	document.addEventListener("OnAllAssetsReady", () => {
		game.gameState.gameStatus = "";
		game.ready = true;
		game.gameState.instructionText = "Ready ? \n Open your hand palm \n to start the game !!!";
		game.assets = config.getResourceAssets();
	});

	config = new configuration();

	config.loadAssets(
		"Image",
		{ Up: "./Images/Up.jpeg", Down: "./Images/Down.jpeg",Open: "./Images/Open.jpg", Left: "./Images/Left.jpeg", Right: "./Images/Right.jpeg" },
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

	configureGameColor(color("#FFB740"), color("#DF711B"), color(255, 213, 126), color("#64C9CF"), color(255));
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
