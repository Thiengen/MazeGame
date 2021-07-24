class WonState extends GameState {
	constructor(gameSystem) {
		super(gameSystem);
	}

	start() {
		const nextLevelButton = createButton("Next Level");
		nextLevelButton.mousePressed(() => {
			this.gameSystem.maze.SetSize(
				this.gameSystem.maze.cell_length * (1 - difficulty_modifier / 100),
				width - 320,
				height - 240
			);
			gameSystem.gameState = new PlayState(this.gameSystem);
			nextLevelButton.remove();
		});
	}

	execute() {
		showText(
			"CONGRATS, You have cleared this level !!!",
			width / 2,
			height / 2,
			15,
			CENTER,
			"Georgia",
			color(233, 196, 106),
			color(233, 196, 106),
			1
		);
	}
}
