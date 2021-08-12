class UP {
	static respond(info) {
		const classifier = info.gameSystem.getClassifierByName("Direction");
		info.gameSystem.gameState.prediction = info.results[0].label;
		info.gameSystem.player.Move("Up", () =>
			classifier.classify({
				gameSystem: info.gameSystem,
				image: info.gameSystem.getFlippedVideo(),
			})
		);
	}
}

class DOWN {
	static respond(info) {
		const classifier = info.gameSystem.getClassifierByName("Direction");
		info.gameSystem.gameState.prediction = info.results[0].label;
		info.gameSystem.player.Move("Down", () =>
			classifier.classify({
				gameSystem: info.gameSystem,
				image: info.gameSystem.getFlippedVideo(),
			})
		);
	}
}

class LEFT {
	static respond(info) {
		const classifier = info.gameSystem.getClassifierByName("Direction");
		info.gameSystem.gameState.prediction = info.results[0].label;
		info.gameSystem.player.Move("Left", () =>
			classifier.classify({
				gameSystem: info.gameSystem,
				image: info.gameSystem.getFlippedVideo(),
			})
		);
	}
}

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
