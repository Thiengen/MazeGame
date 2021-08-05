class InitialState extends GameState {
	GameName = "Welcome to Orange Maze !";
	instructionText = "Ready ? \n Open your hand to start the game ";
	movingHeight = height / 2 - 200
	goDown = false
	goUp = false
	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		this.instructionText = "Be patient ! Dear user 😙😙😙";
		this.goDown = true
	}

	execute() {
		this.UpDown();

		if (!this.gameSystem.ready) {
			this.gameStatus = `Loaded ${config.loadedResource} %`;
			rect(width / 2 - 50 * 2, height - 50, config.loadedResource * 2, 10);
		}

		textSize(60);
		textAlign(CENTER);
		textFont("Georgia");
		fill(50);

		text(this.GameName, width / 2, this.movingHeight );
		textSize(40)
		text(this.instructionText, width / 2, height / 2 + 20);

		textSize(20);
		text(this.gameStatus, width / 2, height - 100);
	}

	UpDown() {
		if (this.goDown == true) {
			this.movingHeight = this.movingHeight + 2;
			if (this.movingHeight == 250) {
				this.goDown = false;
				this.goUp = true;
			}
		}
		else if (this.goUp == true) {
			this.movingHeight = this.movingHeight - 2;
			if (this.movingHeight == 150) {
				this.goUp = false;
				this.goDown = true;
			}

		}
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
