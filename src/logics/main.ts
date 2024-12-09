import { Quick } from "./../entities/Quick"
import Maze from "./../entities/Maze.js"
import { Node } from "./../entities/Node"
import { Level, LevelMaxNode } from "./../enums/Level";
import IMaze from "../entities/interfaces/IMaze";

class MazeGame {
	private maze: IMaze | null = null;
	constructor() {}
	public createMaze(
		keywords: Array<string>,
		level: Level
	) {
		this.maze = new Maze(
			keywords,
			level,
			[]
		);
	}
}