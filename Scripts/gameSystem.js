class gameSystem {
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

	getClassifierByName(name) {
		const classifiers = this.assets.getChildAssetByType("Model").data;
		for (const key in classifiers) {
			if (key === name) {
				return classifiers[key];
			}
		}
		return undefined;
	}

	getFlippedVideo() {
		this.video = this.assets.getChildAssetByType("Video").data;
		return ml5.flipImage(this.video);
	}
}
