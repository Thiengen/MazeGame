class WonState extends GameState {
	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		 const nextLevelButton = createButton("Next Level");
		 nextLevelButton.mousePressed(() => {
		//if ( label == "Next"){ 
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
		background("#D18700")
		showText(
			"CONGRATS, You have cleared this level !!!",
			width / 2,
			height / 2,
			45,
			CENTER,
			"Georgia",
			color(200),
			color("black"),
			2
		);
		


	}
}
