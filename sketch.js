let game;
let config;
let difficulty_modifier = 2;
let debug = false;
// const model1 = "https://teachablemachine.withgoogle.com/models/e76KsCVS5/";
// const model2 = "https://teachablemachine.withgoogle.com/models/58FWJDZhc/";

function preload() {
	document.addEventListener("OnAllAssetsReady", () => {
		game.gameState.gameStatus = "Ready to start game !!!";
		game.ready = true;
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

	config.loadAssets("Video", [VIDEO], (source) => {
		const video = createCapture(source, () => {
			config.onAssetReady();
		}).hide();
		video.size(240, 180);
		return video;
	});

	config.loadAssets(
		"Color",
		[
			{
				background: color(27, 26, 23),
				maze: color(172, 75, 28),
				mazeWall: color(255, 213, 126),
				player: color(252, 166, 82),
				target: color(255, 239, 160),
				text: color(255, 239, 160),
			},
		],
		(source) => {
			config.onAssetReady();
			return source;
		}
	);
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
