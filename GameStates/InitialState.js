class InitialState extends GameState {
	GameName = "Welcome to Orange Maze !"
	instructionText = "Ready ? \n Open your hand to start the game ";


	constructor(gameSystem) {
		super(gameSystem);
	}

	start() {
		console.log("Loading first page");
		
	}

	execute() {
		background('#D18700')
		showText(
			this.GameName,
			width / 2,
			height / 2 - 200,
			60,
			CENTER,
			"Georgia",
			color(200),
			color("black"),
			3,
		);

		showText(
			this.instructionText,
			width / 2,
			height / 2 + 20,
			45,
			CENTER,
			"Georgia",
			color(200),
			color("black"),
			2,
		);

	}
}

function showText(value, x, y, size, alignment, font, color, stroke_color, stroke_weight ) {
	textSize(size);
	textAlign(alignment);
	textFont(font);
	fill(color);
	stroke(stroke_color);
	strokeWeight(stroke_weight);
	text(value, x, y);
}


function keyPressed() {
	if (!(gameSystem.gameState instanceof InitialState)) {
		return;
	}
	if (keyCode === ENTER && gameSystem.ModelsReady()) {
		gameSystem.changeState(PlayState);
	}
}
