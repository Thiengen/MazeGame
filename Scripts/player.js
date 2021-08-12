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

	summonWallDestroyer(onDestroyedWalls) {
		console.log("Summoning wall destroyer");
		onDestroyedWalls();
	}

	Render(fill_color, side_color = null) {
		if (this.target_cell.vector.dist(this.cell_in.vector) > 0) {
			this.position.lerp(this.target_cell.absolute_v, this.speed * deltaTime * 0.001);
			if (this.target_cell.absolute_v.dist(this.position) <= 0.01) {
				this.cell_in = this.target_cell;
				this.onReachDestination();
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

	Move(direction, onReachDestination) {
		if (this.blockByWall(direction) || this.target_cell !== this.cell_in) {
			onReachDestination();
			return;
		}
		const movingDir = directions[direction];
		const targetCellPosition = p5.Vector.add(createVector(movingDir.x, movingDir.y), this.cell_in.vector);
		this.target_cell = this.maze.GetCellByCoordinate(targetCellPosition.x, targetCellPosition.y);
		this.onReachDestination = onReachDestination;
	}

	blockByWall(direction) {
		const wallIndex = Object.keys(directions).indexOf(direction);
		return this.cell_in.walls[wallIndex].is_active;
	}
}
