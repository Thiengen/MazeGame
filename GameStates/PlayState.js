class PlayState extends GameState {
	directionClassifier;

	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		this.listenToVisibilityChangedChannel();
		this.gameSystem.maze.Generate();
		this.gameSystem.player.Spawn(this.gameSystem.maze, { x: 9, y: 8 });
		// Destination set next to player this.destination = this.gameSystem.maze.GetCellByCoordinate(this.gameSystem.maze.rows_number / 2 + 1, this.gameSystem.maze.columns_number / 2);
		this.destination = this.gameSystem.maze.all_cells[this.gameSystem.maze.all_cells.length - 1];

		const imageAssets = this.gameSystem.assets.getChildAssetByType("Image").data;

		this.referenceImage = {
			Up: imageAssets.Up,
			Down: imageAssets.Down,
			Left: imageAssets.Left,
			Right: imageAssets.Right,
		};

		const colorAssets = this.gameSystem.assets.getChildAssetByType("Color").data;

		this.gameColour = {
			maze: colorAssets.maze,
			mazeWall: colorAssets.mazeWall,
			player: colorAssets.player,
			target: colorAssets.target,
		};

		this.directionClassifier = this.gameSystem.getClassifierByName("Direction");
		this.repeatClassification();
	}

	async repeatClassification() {
		this.directionClassifier
			.classify(this.gameSystem, this.gameSystem.getFlippedVideo())
			.then((response) => this.gotDirectionResults(response.results, response.image))
			.catch((err) => console.log(err));
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
		this.repeatClassification();
	}

	pause(source) {
		console.log("Pausing...");
		source.gameSystem.changeState(PauseState);
		source.gameSystem.gameState.previousState = this;
	}

	gotDirectionResults(results, image) {
		if (results[0].label === "Idle" && this.directionClassifier) {
			this.prediction = results[0].label;
			this.repeatClassification();
			return;
		}

		const classifier = this.gameSystem.getClassifierByName(results[0].label);

		classifier
			.classify(this.gameSystem, image)
			.then((response) => {
				this.prediction = `${response.results[0].label}`;
				this.repeatClassification();
			})
			.catch((err) => console.log(err));
	}

	execute() {
		this.displayPicture();
		tutorial();

		this.gameSystem.maze.Render(this.gameColour.mazeWall, this.gameColour.maze);
		this.gameSystem.player.Render(this.gameColour.player);
		this.checkHasWon();
		if (!this.gameSystem.ClassifiedFlippedVideo) {
			return;
		}
		image(this.gameSystem.ClassifiedFlippedVideo, width - this.gameSystem.video.width, height - this.gameSystem.video.height);

		if (!this.prediction) {
			return;
		}
		text(this.prediction, width / 2, height - 200);
	}

	displayPicture() {
		image(this.referenceImage.Up, width - 200, 0, 200, 185);
		image(this.referenceImage.Down, width - 250, 250, 250, 175);
		// image(this.imgOpen, 570, 460, 250, 175);
		image(this.referenceImage.Left, 10, height - 175, 250, 175);
		image(this.referenceImage.Right, 290, height - 175, 250, 175);
	}

	checkHasWon() {
		this.destination.Show(this.gameColour.mazeWall, this.gameColour.target);
		if (this.gameSystem.player.cell_in === this.destination) {
			document.removeEventListener("visibilitychange", this.onVisibilityChange);
			this.gameSystem.maze.clearCache();
			this.gameSystem.changeState(WonState);
		}
	}
}
