let columns, rows;
let currentCell;
let gridLength = 20;
let cells = [];
let stack = [];
let player_position;

function setup() {
  createCanvas(600, 600);
  columns = floor(width / gridLength);
  rows = floor(height / gridLength);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      var cell = new Cell(i, j);
      cells.push(cell);
    }
  }
  SpawnPlayer();
  GenerateMaze();
}

function SpawnPlayer() {
  player_position = cells[getCellIndexByCoordinate(rows / 2, columns / 2)];
}

function draw() {
  background(51);
  for (let i = 0; i < cells.length; i++) {
    cells[i].show(color(59, 59, 59));
  }
  player_position.show("green");
}

