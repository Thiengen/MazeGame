class Wall {
	constructor(vertex1, vertex2, is_active) {
		this.vertex1 = createVector(vertex1.x, vertex1.y);
		this.vertex2 = createVector(vertex2.x, vertex2.y);
		this.is_active = is_active;
	}
}

class Cell {
	walls = [];

	constructor(x, y, maze) {
		this.vector = createVector(x, y);
		this.maze = maze;
		this.absolute_v = p5.Vector.mult(this.vector, maze.cell_length);
		this.GenerateWalls();
	}

	GenerateWalls() {
		const cell_midPoint = p5.Vector.add(
			this.absolute_v,
			p5.Vector.mult(createVector(1, 1), this.maze.cell_length / 2)
		);
		const cell_cornerVector = createVector(-this.maze.cell_length / 2, -this.maze.cell_length / 2);
		for (let i = 0; i < 4; i++) {
			const vertex_one = p5.Vector.add(cell_midPoint, cell_cornerVector);
			cell_cornerVector.rotate(HALF_PI);
			const vertex_two = p5.Vector.add(cell_midPoint, cell_cornerVector);
			this.walls.push(new Wall(vertex_one, vertex_two, true));
		}
	}

	Show(cell_color, wall_color) {
		strokeWeight(2); //Show the cell and their active walls with color
		stroke(wall_color);
		for (let i = 0; i < this.walls.length; i++) {
			if (this.walls[i].is_active) {
				const vertex1 = this.walls[i].vertex1;
				const vertex2 = this.walls[i].vertex2;
				line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
			}
		}

		noStroke();
		fill(cell_color);
		rect(this.absolute_v.x, this.absolute_v.y, this.maze.cell_length, this.maze.cell_length);

		if (debug) {
			fill(255);
			textSize(10);
			text(
				"x: " + this.vector.x + "\n y:" + this.vector.y,
				this.absolute_v.x + this.maze.cell_length / 2,
				this.absolute_v.y + this.maze.cell_length / 2
			);
		}
	}

	CheckNeighbors(visited_cells) {
		//Used in the maze generation algorithm
		if (!this.maze) {
			console.warn("This cell doesn't belongs to any maze !!!");
			return undefined;
		}

		let neighbours = [];
		const initial_vector = createVector(0, -1);

		for (let i = 0; i < this.walls.length; i++) {
			const neighbour = this.maze.GetCellByCoordinate(
				initial_vector.x + this.vector.x,
				initial_vector.y + this.vector.y
			);

			if (neighbour && !visited_cells.includes(neighbour)) {
				neighbours.push(neighbour);
			}

			initial_vector.rotate(HALF_PI);
		}

		if (neighbours.length > 0) {
			let randomNeighbourIndex = floor(random(0, neighbours.length));
			return neighbours[randomNeighbourIndex];
		} else {
			return undefined;
		}
	}
}

const directions = {
	TOP: "top",
	RIGHT: "right",
	BOTTOM: "bottom",
	LEFT: "left",
};
