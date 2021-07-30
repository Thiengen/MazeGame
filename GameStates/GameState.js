class GameState {
	gameSystem;

	constructor(gameSystem) {
		this.gameSystem = gameSystem;
		gameSystem.gameState = this;
	}
}
