class Classifier {
	constructor(name, model_URL) {
		this.Name = name;
		this.Value = ml5.imageClassifier(model_URL + "model.json");
		this.Value.ready
			.then(() => {
				console.log(this.Name + " model is ready !!!");
				this.IsReady = true;
			})
			.catch((err) => console.log(err));
	}

	classify(gameSystem, image, gotResult) {
		if (!image) {
			console.warn("There is no image to classify!");
			return;
		}
		if (!(gameSystem.gameState instanceof PlayState)) {
			console.log("Classifier only classfy images during play state !");
			return;
		}
		this.Value.classify(image)
			.then((results) => {
				gameSystem.ClassifiedFlippedVideo = image;
				gotResult(results, image, gameSystem);
			})
			.catch((err) => console.log(err));
	}
}
