class WonState extends GameState {
	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		const nextLevelButton = createButton("Next Level");
		nextLevelButton.mousePressed(() => {
			//if ( label == "Next"){
			this.modifyDifficulty();
			gameSystem.gameState = new PlayState(this.gameSystem);
			nextLevelButton.remove();
		});
	}

	modifyDifficulty() {
		const data = this.gameSystem.assets.getChildAssetByType("Difficulty").data;
		this.gameSystem.maze.SetSize(this.gameSystem.maze.cell_length * (1 - data.difficultyOffset / 100), width - 320, height - 240);
		data.difficultyOffset += data.difficultySpeed;
		data.difficultySpeed += data.difficultyAcceleration;
	}

	execute() {
		text("CONGRATS, You have cleared this level !!!",  1500 / 2, 700 / 2);
	}
}
