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

		this.directionClassifier = this.gameSystem.GetClassifierByName("Direction");
		this.directionClassifier.classify(this.gameSystem, this.gameSystem.GetFlippedVideo(), this.gotDirectionResults);
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
		this.directionClassifier.classify(this.gameSystem, this.gameSystem.GetFlippedVideo(), this.gotDirectionResults);
	}

	pause(source) {
		console.log("Pausing...");
		source.gameSystem.changeState(PauseState);
		source.gameSystem.gameState.previousState = this;
	}

	gotDirectionResults(results, image, gameSystem) {
		const dirClassifier = gameSystem.gameState.directionClassifier;
		if (results[0].label === "Idle" && dirClassifier) {
			gameSystem.gameState.prediction = results[0].label;
			dirClassifier.classify(gameSystem, gameSystem.GetFlippedVideo(), gameSystem.gameState.gotDirectionResults);
			return;
		}
		classifier = gameSystem.GetClassifierByName(results[0].label);
		if (!classifier) {
			return;
		}
		classifier.classify(gameSystem, image, (results, image, gameSystem) => {
			gameSystem.gameState.prediction = `${results[0].label}`;
			dirClassifier.classify(gameSystem, gameSystem.GetFlippedVideo(), gameSystem.gameState.gotDirectionResults);
		});
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
