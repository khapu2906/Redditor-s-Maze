import { Quick } from "./../entities/Quick"
import Maze from "./../entities/Maze"
import { Node } from "./../entities/Node"
import { Level, LevelMaxNode } from "./../enums/Level";
import IMaze from "../entities/interfaces/IMaze";
import { IQuiz, IExtendInfo, IQuestionAgg } from "../interfaces/IQuiz";

class MazeGame {
	private maze: IMaze | null = null;
	constructor(
		keywords: Array<string>,
		public level: Level
	) {
		this.maze = new Maze(
			keywords,
			level
		);
	}

}