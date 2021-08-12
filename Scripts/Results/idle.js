class idle {
	static respond(info) {
		info.gameSystem.gameState.prediction = info.results[0].label;
		console.log(info);
		const classifier = info.gameSystem.getClassifierByName("Direction");
		classifier.classify({
			gameSystem: info.gameSystem,
			image: info.gameSystem.getFlippedVideo(),
		});
	}
}
