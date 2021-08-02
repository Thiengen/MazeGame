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
		this.label = ""
		background("#D18700")
		fill(200)
		textSize(32)
		text("Press ENTER to continue the game", 1500 / 2, height / 2); // 1500 is second canvas width
		if (keyIsDown(ENTER)) { //||label == "Next"
			console.log("Continue");
			if (this.previousState) {
				gameSystem.gameState = this.previousState;
				this.previousState.continue();
			}
		}
	}
}
