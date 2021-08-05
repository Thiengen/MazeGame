class PauseState extends GameState {
	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		window.alert("Game is paused !!!");

		// let clone = Object.assign(Object.create(Object.getPrototypeOf(this.gameSystem)), this.gameSystem);
	}

	execute() {
		textSize(50)
		text("Press ENTER to continue the game", 750 , height / 2);
		fill(50)
		if (keyIsDown(ENTER)) {
			console.log("Continue");
			if (this.previousState) {
				this.gameSystem.gameState = this.previousState;
				this.previousState.continue();
			}
		}
	}
}
