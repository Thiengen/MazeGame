let loadGame;
let InstructionText = "Put your hands up "
let StartPic = " Ready?" ;

function LoadGame(){
    if (keyCode == 13 ){
      loadGame = true
    }
    if (loadGame == true ){
      maze.Render(color(255,255,255), color(60, 60, 60));
      player.Render(color(47, 194, 86), color(10, 36, 17));
      printLabel();
      //PlayerMovementWithLabel();
    }
  }