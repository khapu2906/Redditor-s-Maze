import Maze from "./../entities/Maze"
import { Level, LevelMaxNode } from "./../enums/Level";
import IMaze from "../entities/interfaces/IMaze";
import INode from "../entities/interfaces/INode";
export class MazeGame {
	public readonly maze: IMaze;
	constructor(
		keywords: Array<string>,
		public level: Level
	) {
		this.maze = new Maze(
			keywords,
			level
		);
	}

	createNode(url: string): INode {
		return this.maze.createNode(url)
	}

	getFirstNode() {
		return this.maze.getFirstNode()
	}
}