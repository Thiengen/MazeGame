class PlayState extends GameState {
    constructor(gameSystem) {
        super(gameSystem);
    }

    start() {
        this.gameSystem.maze.Generate();
        this.gameSystem.player.Spawn();
        // Destination set next to player this.destination = this.gameSystem.maze.GetCellByCoordinate(this.gameSystem.maze.rows_number / 2 + 1, this.gameSystem.maze.columns_number / 2);
        this.destination = this.gameSystem.maze.all_cells[this.gameSystem.maze.all_cells.length - 1];
    }

    execute() {
        this.gameSystem.maze.Render(color(244, 162, 97), color(38, 70, 83));
        this.gameSystem.player.Render(null, color(42, 157, 143));
        this.checkHasWon();
    }

    checkHasWon() {
        this.destination.Show(color("black"), color(233, 196, 106));
        if (this.gameSystem.player.cell_in === this.destination) {
            this.gameSystem.switchState(new WonState(this.gameSystem));
        }
    }
}
