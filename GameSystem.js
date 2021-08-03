class gameSystem {
	ClassifiedFlippedVideo;

	constructor(maze, player) {
		this.maze = maze;
		this.player = player;
		this.gameState = new InitialState(this);
	}

	update() {
		this.gameState.execute();
	}

	changeState(state) {
		new state(this);
	}

	GetClassifierByName(name) {
		for (const classifier of this.assets.getChildAssetByType("Model")) {
			if (classifier.Name === name) {
				return classifier;
			}
		}
		console.log("Classifier not found !!!");
		return null;
	}

	GetFlippedVideo() {
		this.video = this.assets.getChildAssetByType("Video")[0];
		return ml5.flipImage(this.video);
	}
}
