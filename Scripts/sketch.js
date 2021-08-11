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
		{ Up: "./Images/Up.jpeg", Down: "./Images/Down.jpeg", Open: "./Images/Open.jpg", Left: "./Images/Left.jpeg", Right: "./Images/Right.jpeg" },
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
			Direction: Object.create(payloadModel).init("https://teachablemachine.withgoogle.com/models/nNtbYUnn-/", (info) => {
				const classifier = info.gameSystem.getClassifierByName(info.results[0].label);
				if (classifier) {
					classifier.classify(info);
					return;
				}
				info.gameSystem.gameState.prediction = info.results[0].label;
				info.gameSystem.gameState.repeatClassification();
			}), //"https://teachablemachine.withgoogle.com/models/7WRHgCGqz/",
			Vertical: Object.create(payloadModel).init("https://teachablemachine.withgoogle.com/models/gvwdkEKSF/", (info) => {
				if (!(info.gameSystem.gameState instanceof PlayState)) return;
				info.gameSystem.player.Move(info.results[0].label);
				info.gameSystem.gameState.prediction = info.results[0].label;
			}),
			Horizontal: Object.create(payloadModel).init("https://teachablemachine.withgoogle.com/models/9r5lWuqRi/", (info) => {
				if (!(info.gameSystem.gameState instanceof PlayState)) return;
				info.gameSystem.player.Move(info.results[0].label);
				info.gameSystem.gameState.prediction = info.results[0].label;
			}),
		},
		(source) => {
			let models = {};
			for (const key in source) {
				const model = new classifier(
					key,
					source[key].URL_link,
					() => {
						config.onAssetReady();
					},
					source[key].onGotResult
				);
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

	//Background , Maze , Lines && reach point , Player , Reachpoint lines
	config.loadAssets("Difficulty", {
		difficultyOffset: 2,
		difficultySpeed: 1,
		difficultyAcceleration: 0.5,
	});

	config.loadAssets(
		"Color",
		{
			background: color("#FFB740"),
			maze: color("#DF711B"),
			mazeWall: color(255, 213, 126),
			player: color("#64C9CF"),
			target: color(255),
			text: color(200),
			button: color(100),
		},
		(source) => {
			for (let i = 0; i < Object.keys(source).length; i++) {
				config.onAssetReady();
			}
			return source;
		}
	);
}

function setup() {
	createCanvas(900, 700);
	const maze = new Maze(50, 580, 460);
	game = new gameSystem(maze, new Player());
}

function draw() {
	background(config.assets.getChildAssetByType("Color").data.background);
	game.update();
}
