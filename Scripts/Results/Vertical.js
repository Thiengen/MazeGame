class VERTICAL {
	static respond(info) {
		const classifier = info.gameSystem.getClassifierByName(info.results[0].label);
		classifier.classify({
			gameSystem: info.gameSystem,
			image: info.gameSystem.getFlippedVideo(),
		});
	}
}
