class InitialState extends GameState{
    startPic = "Ready ?";
    instructionText = "Put your hands up"

    constructor(gameSystem){
        super(gameSystem);
    }

    start(){
        print("Starting game");
    }

    execute(){
        showText(this.startPic, width / 2, height / 2 - 100, 60, CENTER, "Georgia", color(233, 196, 106), color(233, 196, 106), 1);
        showText(this.instructionText, width / 2, height / 2 + 20, 30, CENTER, "Georgia", color(233, 196, 106), color(233, 196, 106), 1);
    }
}

function showText(value, x, y, size, alignment, font, color, stroke_color, stroke_weight){
    textSize(size);
    textAlign(alignment);
    textFont(font);
    fill(color);
    stroke(stroke_color);
    strokeWeight(stroke_weight);
    text(value, x, y);
}

function keyPressed(){
    if(!(gameSystem.gameState instanceof InitialState)){return;}
    if(keyCode === ENTER){
        gameSystem.switchState(new PlayState(gameSystem));
    }
}