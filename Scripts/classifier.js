class classifier {
	constructor(name, model_URL, onModelReady) {
		this.Name = name;
		this.Value = ml5.imageClassifier(model_URL + "model.json");
		this.Value.ready
			.then(() => {
				// console.log(this.Name + " model is ready !!!");
				this.IsReady = true;
				onModelReady();
			})
			.catch((err) => console.log(err));
	}

	async classify(info) {
		if (!info) {
			console.warn("There is no image to classify!");
			return;
		}
		if (!(info.gameSystem.gameState instanceof PlayState)) {
			console.log("Classifier only classfy images during play state !");
			return;
		}
		console.log("Classifying...");
		const results = await this.Value.classify(info.image).catch((err) => console.log(err));
		resultsHandler.handle({
			gameSystem: info.gameSystem,
			image: info.image,
			results,
		});
	}
}
