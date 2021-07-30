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
		text("Press ENTER to continue the game", width / 2, height / 2);
		if (keyIsDown(ENTER)) {
			console.log("Continue");
			if (this.previousState) {
				gameSystem.gameState = this.previousState;
				this.previousState.continue();
			}
		}
	}
}
