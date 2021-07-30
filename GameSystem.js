class GameSystem {
	ClassifiedFlippedVideo;

	constructor(maze, player, classifiers) {
		this.maze = maze;
		this.player = player;
		this.Classifiers = classifiers;
		this.gameState = new InitialState(this);
		this.video = createCapture(VIDEO, () => console.log("Video stream is ready !!!"));
		this.video.size(320, 240);
		this.video.hide();
	}

	update() {
		
		this.gameState.execute();

		
	}

	changeState(state) {
		new state(this);
	}

	GetClassifierByName(name) {
		for (const classifier of this.Classifiers) {
			if (classifier.Name === name) {
				return classifier;
			}
		}
		console.warn("Classifier not found !!!");
		return null;
	}

	ModelsReady() {
		for (let i = 0; i < this.Classifiers.length; i++) {
			if (!this.Classifiers[i].IsReady) {
				return false;
			}
		}
		return true;
	}

	GetFlippedVideo() {
		return ml5.flipImage(this.video);
	}
}
