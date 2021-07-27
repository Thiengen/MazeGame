class PlayState extends GameState {
	constructor(gameSystem) {
		super(gameSystem);
	}

	start() {
		this.gameSystem.maze.Generate();
		this.gameSystem.player.Spawn();
		
		// Destination set next to player this.destination = this.gameSystem.maze.GetCellByCoordinate(this.gameSystem.maze.rows_number / 2 + 1, this.gameSystem.maze.columns_number / 2);
		this.destination = this.gameSystem.maze.all_cells[this.gameSystem.maze.all_cells.length - 1];
		classifyDirection(this);
		
	}

	execute() {
		background("#D18700")
		tutorial();
		
	
		this.gameSystem.maze.Render(color("#FF5C4D"), color("#FFC55C"));
		this.gameSystem.player.Render(color("#FF0000"));
		this.checkHasWon();
		
		
	}
	checkHasWon() {
		this.destination.Show(color("grey"), color("grey"));
		if (this.gameSystem.player.cell_in === this.destination ) {
			gameSystem.gameState = new WonState(this.gameSystem);
		}
	}
	
}
