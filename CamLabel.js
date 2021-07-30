label = "Loading model";
let suffix = "";
let video;
let flippedVideo;
let directionClassifier;
let verticalClassifier;
let horizontalClassifier;

function printLabel() {
	textSize(30);
	textAlign(CENTER, CENTER);
	fill(200);
	text(label, width / 2, height - 16);
	text(suffix, width / 2 + 75, height - 16);
}

function classifyDirection(state) {
	if (!(state instanceof PlayState)) {
		return;
	}
	flippedVideo = ml5.flipImage(video);
	directionClassifier.classify(flippedVideo, gotResults);
	// directionClassifier.classify(flippedVideo, gotDirectionResults);
}

function gotResults(err, results) {
	console.log(results[0]);
	classifyDirection(gameSystem.gameState);
}

function gotDirectionResults(error, results) {
	if (error) {
		console.error(error);
		return;
	}
	if (results[0].label === "Vertical") {
		flippedVideo = ml5.flipImage(video);
		verticalClassifier.classify(flippedVideo, gotVerticalResults);
	} else if (results[0].label === "Horizontal") {
		flippedVideo = ml5.flipImage(video);
		horizontalClassifier.classify(flippedVideo, gotHorizontalResults);
	} else {
		label = results[0].label;
		suffix = floor(results[0].confidence * 100) + "%";
		flippedVideo = ml5.flipImage(video);
		classifyDirection(gameSystem.gameState);
	}
}

function gotHorizontalResults(error, results) {
	if (error) {
		console.log(error);
		return;
	}
	label = results[0].label;
	suffix = floor(results[0].confidence * 100) + "%";
	classifyDirection(gameSystem.gameState);
}

function gotVerticalResults(error, results) {
	if (error) {
		console.log(error);
		return;
	}
	label = results[0].label;
	suffix = floor(results[0].confidence * 100) + "%";
	classifyDirection(gameSystem.gameState);
}
