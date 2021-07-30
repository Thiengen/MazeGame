class Player {
	speed = 5;

	Spawn(maze, spawning_point = null) {
		this.target_cell = undefined;
		this.maze = maze;
		this.cell_in = spawning_point
			? maze.GetCellByCoordinate(spawning_point.x, spawning_point.y)
			: maze.GetCellByCoordinate(0, 0);

		if (!this.cell_in) {
			console.error("Player is not spawn in a maze !\nThe game cannot start!");
			return;
		}

		this.position = this.cell_in.absolute_v.copy();
	}

	Render(fill_color, side_color = null) {
		if (this.target_cell !== this.cell_in && this.target_cell) {
			this.position.lerp(this.target_cell.absolute_v, this.speed * deltaTime * 0.001);
			if (this.target_cell.absolute_v.dist(this.position) <= 0.01) {
				this.cell_in = this.target_cell;
			}
		}

		const size = this.maze.cell_length - 10;
		const offset = (this.maze.cell_length - size) / 2;
		fill(fill_color);
		rect(this.position.x + offset, this.position.y + offset, size, size);

		if (side_color) {
			stroke(side_color);
			strokeWeight(0.5);
		}
	}

	Move(direction) {
		const translation = this.MoveToCell(direction, this.cell_in.vector);
		this.target_cell = this.maze.GetCellByCoordinate(translation.x, translation.y);
	}

	MoveToCell(direction, coordinate) {
		switch (direction) {
			case directions.TOP:
				return createVector(0, -1).add(coordinate.x, coordinate.y);
			case directions.RIGHT:
				return createVector(1, 0).add(coordinate.x, coordinate.y);
			case directions.BOTTOM:
				return createVector(0, 1).add(coordinate.x, coordinate.y);
			case directions.LEFT:
				return createVector(-1, 0).add(coordinate.x, coordinate.y);
			default:
				console.warn("Direction not given");
				break;
		}
	}
}

function checkUserInput() {
	if (!(gameSystem.gameState instanceof PlayState)) {
		return;
	}
	const player = gameSystem.player;
	if (player.target_cell && player.target_cell !== player.cell_in) {
		return;
	}
	if (keyIsDown(87) && !player.cell_in.walls[0].is_active) {
		player.Move(directions.TOP);
		return;
	} else if (keyIsDown(65) && !player.cell_in.walls[3].is_active) {
		player.Move(directions.LEFT);
		return;
	} else if (keyIsDown(68) && !player.cell_in.walls[1].is_active) {
		player.Move(directions.RIGHT);
		return;
	} else if (keyIsDown(83) && !player.cell_in.walls[2].is_active) {
		player.Move(directions.BOTTOM);
	}
}

function PlayerMovementWithLabel() {
	if (!(gameSystem.gameState instanceof PlayState)) {
		return;
	}
	const player = gameSystem.player;
	if (player.target_cell && player.target_cell !== player.cell_in) {
		return;
	}
	if (label === "Up" && !player.cell_in.walls[0].is_active) {
		player.Move(directions.TOP);
		return;
	} else if (label === "Right" && !player.cell_in.walls[1].is_active) {
		player.Move(directions.RIGHT);
		return;
	} else if (label === "Down" && !player.cell_in.walls[2].is_active) {
		player.Move(directions.BOTTOM);
		return;
	} else if (label === "Left" && !player.cell_in.walls[3].is_active) {
		player.Move(directions.LEFT);
	}
}
