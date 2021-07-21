class WonState extends GameState {
    constructor(gameSystem) {
        super(gameSystem);
    }

    start() {
        const nextLevelButton = createButton("Next Level");
        nextLevelButton.mousePressed(() => {
            this.gameSystem.maze.SetSize(this.gameSystem.maze.cell_length * (1 - difficulty_modifier / 100), width, height);
            this.gameSystem.switchState(new PlayState(this.gameSystem));
            nextLevelButton.remove();
        });
    }

    execute() {
        textSize(15);
        text("CONGRATS, You have cleared this level !!!", 100, 100);
    }
}
