class resultsHandler {
	static handle(info) {
		const results = info.results[0].label.toUpperCase();
		const resultsObject = eval(`${results}`);
		if (!resultsObject) {
			console.log("Result is invalid !!!");
			return;
		}
		const currentGameState = info.gameSystem.gameState;
		if (!(currentGameState instanceof PlayState)) {
			console.log(`Respond aborted as current game state is not in play state!!!`);
			return;
		}
		resultsObject.respond(info);
	}
}
