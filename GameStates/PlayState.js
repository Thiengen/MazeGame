class PlayState extends GameState {
	directionClassifier;
	width2 = 1500;
	height2 = 700;
	constructor(gameSystem) {
		super(gameSystem);
		this.start();
	}

	start() {
		this.listenToVisibilityChangedChannel();
		this.gameSystem.maze.Generate();
		this.gameSystem.player.Spawn(this.gameSystem.maze, { x: 0, y: 0 });
		// Destination set next to player this.destination = this.gameSystem.maze.GetCellByCoordinate(this.gameSystem.maze.rows_number / 2 + 1, this.gameSystem.maze.columns_number / 2);
		this.destination = this.gameSystem.maze.all_cells[this.gameSystem.maze.all_cells.length - 1];

		const imageAssets = this.gameSystem.assets.getChildAssetByType("Image").data;

		this.referenceImage = {
			Up: imageAssets.Up,
			Down: imageAssets.Down,
			Open: imageAssets.Open,
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

		resizeCanvas(1500, 700);
		this.gameSystem.getClassifierByName("Direction").classify({
			gameSystem: this.gameSystem,
			image: this.gameSystem.getFlippedVideo(),
		});
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
		this.gameSystem.getClassifierByName("Direction").classify({
			gameSystem: this.gameSystem,
			image: this.gameSystem.getFlippedVideo(),
		});
	}

	pause(source) {
		console.log("Pausing...");
		source.gameSystem.changeState(PauseState);
		source.gameSystem.gameState.previousState = this;
	}

	execute() {
		this.displayPicture();
		tutorial();

		this.gameSystem.maze.Render(this.gameColour.mazeWall, this.gameColour.maze);
		this.gameSystem.player.Render(this.gameColour.player);
		this.checkHasWon();
		image(this.gameSystem.getFlippedVideo(), this.width2 / 2 + 200, 150, 500, 400);

		if (!this.prediction) return;
		fill(50);
		text(this.prediction, (this.width2 * 4) / 5, this.height2 - 100);
	}

	displayPicture() {
		image(this.referenceImage.Up, 580, 10, 175, 175);
		image(this.referenceImage.Down, 580, 235, 175, 175);
		image(this.referenceImage.Open, 580, 460, 175, 175);
		image(this.referenceImage.Left, 310, 460, 175, 175);
		image(this.referenceImage.Right, 40, 460, 175, 175);
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
