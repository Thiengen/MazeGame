class PlayState extends GameState {
	imgUp = loadImage("./Images/Up.jpg");
	imgDown = loadImage("./Images/Down.jpg");
	imgLeft = loadImage("./Images/Left.jpg");
	imgRight = loadImage("./Images/Right.jpg");
	imgOpen = loadImage("./Images/Open.jpg");

	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		this.listenToVisibilityChangedChannel();
		this.gameSystem.maze.Generate();
		this.gameSystem.player.Spawn(gameSystem.maze);
		// Destination set next to player this.destination = this.gameSystem.maze.GetCellByCoordinate(this.gameSystem.maze.rows_number / 2 + 1, this.gameSystem.maze.columns_number / 2);
		this.destination = this.gameSystem.maze.all_cells[this.gameSystem.maze.all_cells.length - 1];
		this.gameSystem.Classifiers[0].classify(this.gameSystem, this.gameSystem.GetFlippedVideo(), this.gotDirectionResults);
	}

	listenToVisibilityChangedChannel() {
		this.onVisibilityChange = () => {
			const playState = this;
			setTimeout(() => {
				if (document.visibilityState !== "hidden") {
					return;
				}
				document.removeEventListener("visibilitychange", this.onVisibilityChange);
				playState.pause(playState);
			}, 5 * 1000);
		};
		document.addEventListener("visibilitychange", this.onVisibilityChange);
	}

	continue() {
		this.listenToVisibilityChangedChannel();
		this.gameSystem.Classifiers[0].classify(this.gameSystem, this.gameSystem.GetFlippedVideo(), this.gotDirectionResults);
	}

	pause(source) {
		source.gameSystem.changeState(PauseState);
		source.gameSystem.gameState.previousState = this;
		source.gameSystem.ClassifiedFlippedVideo = null;
	}

	gotDirectionResults(results, image, gameSystem) {
		if (results[0].label === "Idle") {
			label = results[0].label;
			gameSystem.Classifiers[0].classify(gameSystem, gameSystem.GetFlippedVideo(), gameSystem.gameState.gotDirectionResults);
			return;
		}
		const classifier = gameSystem.GetClassifierByName(results[0].label);
		if (!classifier) {
			return;
		}
		classifier.classify(gameSystem, image, (results, image, gameSystem) => {
			label = results[0].label;
			gameSystem.Classifiers[0].classify(gameSystem, gameSystem.GetFlippedVideo(), gameSystem.gameState.gotDirectionResults);
		});
	}

	execute() {
		background("#D18700");
		this.printPicture();
		tutorial();

		this.gameSystem.maze.Render(color("red"), color("#FFB300"));
		this.gameSystem.player.Render(color("#D92721"));
		this.checkHasWon();
		if (!this.gameSystem.ClassifiedFlippedVideo) {
			return;
		}
		image(this.gameSystem.ClassifiedFlippedVideo, width - gameSystem.video.width, height - gameSystem.video.height);
	}

	printPicture() {
		image(this.imgUp, 570, 0, 200, 185);
		image(this.imgDown, 570, 225, 250, 175);
		image(this.imgOpen, 570, 460, 250, 175);
		image(this.imgLeft, 290, 460, 250, 175);
		image(this.imgRight, 10, 460, 250, 175);
	}

	checkHasWon() {
		this.destination.Show(color("grey"), color("grey"));
		if (this.gameSystem.player.cell_in === this.destination) {
			document.removeEventListener("visibilitychange", this.onVisibilityChange);
			this.gameSystem.maze.clearCache();
			this.gameSystem.changeState(WonState);
		}
	}
}
