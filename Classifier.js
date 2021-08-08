class classifier {
	constructor(name, model_URL, onReady) {
		this.Name = name;
		this.Value = ml5.imageClassifier(model_URL + "model.json");
		this.Value.ready
			.then(() => {
				// console.log(this.Name + " model is ready !!!");
				this.IsReady = true;
				onReady();
			})
			.catch((err) => console.log(err));
	}

	async classify(gameSystem, image) {
		if (!image) {
			console.warn("There is no image to classify!");
			return;
		}
		if (!(gameSystem.gameState instanceof PlayState)) {
			console.log("Classifier only classfy images during play state !");
			return;
		}
		const results = await this.Value.classify(image).catch((err) => console.log(err));
		gameSystem.ClassifiedFlippedVideo = image;
		return {
			results,
			image,
		};
	}
}
