class GameSystem{
    maze;
    player;
    gameState;

    constructor(maze, player){
        this.maze = maze;
        this.player = player;
        this.gameState = new InitialState(this);
    }

    update(){
        this.gameState.execute();
    }

    switchState(state){
        this.gameState = state;
    }
}