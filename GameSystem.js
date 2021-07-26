class GameSystem {
	maze;
	player;
	gameState;

	constructor(maze, player) {
		this.maze = maze;
		this.player = player;
		this.gameState = new InitialState(this);
	}

	update() {
		background("#D18700")
		this.gameState.execute();
		
	}
}
