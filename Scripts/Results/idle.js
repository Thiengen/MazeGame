class IDLE {
	static respond(info) {
		info.gameSystem.gameState.prediction = info.results[0].label;
		const classifier = info.gameSystem.getClassifierByName("Direction");
		classifier.classify({
			gameSystem: info.gameSystem,
			image: info.gameSystem.getFlippedVideo(),
		});
	}
}
