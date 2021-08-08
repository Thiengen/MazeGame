class InitialState extends GameState {
	GameName = "Welcome to Orange Maze !";
	instructionText = "Ready ? \n Open your hand to start the game ";

	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		this.instructionText = "Be patient ! Dear user 😙😙😙";
	}

	execute() {
		if (!this.gameSystem.ready) {
			this.gameStatus = `Loaded ${config.loadedResource} %`;
			fill(200);
			rect(width / 2 - 50 * 2, height - 50, 100 * 2, 10);
			fill(color(252, 166, 82));
			rect(width / 2 - 50 * 2, height - 50, config.loadedResource * 2, 10);
		}

		textSize(60);
		textAlign(CENTER);
		textFont("Georgia");
		fill(200);

		text(this.GameName, width / 2, height / 2 - 200);
		text(this.instructionText, width / 2, height / 2 + 20);

		textSize(20);
		text(this.gameStatus, width / 2, height - 100);
	}
}

function keyPressed() {
	if (!(game.gameState instanceof InitialState)) {
		return;
	}
	if (keyCode === ENTER && game.ready) {
		game.changeState(PlayState);
	}
}
