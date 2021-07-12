let label = " Waiting ..." ;
let video ;
let classifier ;

function OpenAndHideCamera() {
  video = createCapture(VIDEO);
  video.hide();
}

function printLabel() {
  textSize(30);
  textAlign(CENTER, CENTER);
  fill(200);
  text(label, width / 2, height - 16);
}

function classifierVideo(){
  classifier.classify(video , gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifierVideo();
}

