class WonState extends GameState {
	movingWidth = 700
	goRight = false
	goLeft = false
	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		this.goRight = true
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
		this.RightLeft()
		textSize(50)
		fill(50)
		text("CONGRATS \n You have cleared this level !!!\n Open you hand palm to go next level",  this.movingWidth , 200);
	}

	RightLeft() {
		if (this.goRight == true) {
			this.movingWidth = this.movingWidth + 2;
			if (this.movingWidth == 1000 ) {
				this.goRight = false;
				this.goLeft = true;
			}
		}
		else if (this.goLeft == true) {
			this.movingWidth = this.movingWidth - 2;
			if (this.movingWidth == 400 ) {
				this.goLeft = false;
				this.goRight = true;
			}

		}
	}
}
