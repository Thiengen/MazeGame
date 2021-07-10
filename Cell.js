function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    let neighbors = [];

    let top = cells[getCellIndexByCoordinate(x, y - 1)];
    let right = cells[getCellIndexByCoordinate(x + 1, y)];
    let bottom = cells[getCellIndexByCoordinate(x, y + 1)];
    let left = cells[getCellIndexByCoordinate(x - 1, y)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };

  this.show = function(color) {
    let position_x = this.x * gridLength;
    let position_y = this.y * gridLength;
    stroke(255);
    if (this.walls[0]) {
      line(position_x, position_y, position_x + gridLength, position_y);
    }
    if (this.walls[1]) {
      line(position_x + gridLength, position_y, position_x + gridLength, position_y + gridLength);
    }
    if (this.walls[2]) {
      line(position_x + gridLength, position_y + gridLength, position_x, position_y + gridLength);
    }
    if (this.walls[3]) {
      line(position_x, position_y + gridLength, position_x, position_y);
    }
    noStroke();
    fill(color);
    rect(position_x, position_y, gridLength, gridLength);
  };
}