import Maze from "./Maze";

export class User {
	constructor(
		public id: string,
		public postPlayId: string,
		public maze: Maze
	) {
	}
}
