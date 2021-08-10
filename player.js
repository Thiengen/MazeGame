class Player {
	speed = 5;

	Spawn(maze, spawning_point = null) {
		this.maze = maze;
		this.cell_in = spawning_point ? maze.GetCellByCoordinate(spawning_point.x, spawning_point.y) : maze.GetCellByCoordinate(0, 0);
		this.target_cell = this.cell_in;

		if (!this.cell_in) {
			console.error("Player is not spawn in a maze !\nThe game cannot start!");
			return;
		}

		this.position = this.cell_in.absolute_v.copy();
	}

	Render(fill_color, side_color = null) {
		if (this.target_cell.vector.dist(this.cell_in.vector) > 0) {
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
		const targetCellPosition = p5.Vector.add(createVector(direction.x, direction.y), this.cell_in.vector);
		console.log(targetCellPosition);
		this.target_cell = this.maze.GetCellByCoordinate(targetCellPosition.x, targetCellPosition.y);
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

function PlayerMovementWithLabel() {
	if (!(game.gameState instanceof PlayState)) {
		return;
	}
	const player = game.player;
	const result = game.gameState.prediction;
	if (player.target_cell && player.target_cell !== player.cell_in) {
		return;
	}
	if (result === "Up" && !player.cell_in.walls[0].is_active) {
		player.Move(directions.Up);
		return;
	} else if (result === "Right" && !player.cell_in.walls[1].is_active) {
		player.Move(directions.Right);
		return;
	} else if (result === "Down" && !player.cell_in.walls[2].is_active) {
		player.Move(directions.Down);
		return;
	} else if (result === "Left" && !player.cell_in.walls[3].is_active) {
		player.Move(directions.Left);
	}
}
