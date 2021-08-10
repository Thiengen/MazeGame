class WonState extends GameState {
	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		const guiColorAssets = this.gameSystem.assets.getChildAssetByType("Color").data;

		this.goRight = true;
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
			this.gameSystem.changeState(PlayState);
			nextLevelButton.remove();
		});
	}

	modifyDifficulty() {
		const data = this.gameSystem.assets.getChildAssetByType("Difficulty").data;
		this.gameSystem.maze.SetSize(this.gameSystem.maze.cell_length * (1 - data.difficultyOffset / 100), 580, 460);
		data.difficultyOffset += data.difficultySpeed;
		data.difficultySpeed += data.difficultyAcceleration;
	}

	execute() {
		textSize(50);
		fill(50);
		text("CONGRATS \n You have cleared this level !!!\n Open you hand palm to go next level", oscillator.oscillateInCanvas(width, 1, 300, 0), 200);
	}
}
