class RIGHT {
	static respond(info) {
		const classifier = info.gameSystem.getClassifierByName("Direction");
		info.gameSystem.gameState.prediction = info.results[0].label;
		info.gameSystem.player.Move("Right", () =>
			classifier.classify({
				gameSystem: info.gameSystem,
				image: info.gameSystem.getFlippedVideo(),
			})
		);
	}
}
