class WonState extends GameState {
	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		const guiColorAssets = this.gameSystem.assets.getChildAssetByType("Color").data;

		const nextLevelButton = createButton("Next Level");

		nextLevelButton.style("font-size", "25px");
		nextLevelButton.style("color", guiColorAssets.text);
		nextLevelButton.style("background-color", guiColorAssets.button);

		const buttonSize = {
			width: 150,
			height: 50,
		};

		nextLevelButton.size(buttonSize.width, buttonSize.height);
		nextLevelButton.position(width - buttonSize.width, height - buttonSize.height);

		nextLevelButton.mousePressed(() => {
			//if ( label == "Next"){
			this.modifyDifficulty();
			gameSystem.gameState = new PlayState(this.gameSystem);
			nextLevelButton.remove();
			loop();
		});
	}

	modifyDifficulty() {
		const data = this.gameSystem.assets.getChildAssetByType("Difficulty").data;
		this.gameSystem.maze.SetSize(this.gameSystem.maze.cell_length * (1 - data.difficultyOffset / 100), width - 320, height - 240);
		data.difficultyOffset += data.difficultySpeed;
		data.difficultySpeed += data.difficultyAcceleration;
	}

	execute() {
		text("CONGRATS, You have cleared this level !!!", width / 2, height / 2);
		noLoop();
	}
}
