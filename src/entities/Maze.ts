import { Level, LevelMaxNode } from "./enums/Level";
import IRule from "./interfaces/IRule"

import { State } from "./enums/State";

import { Node, start as startNode } from "./Node";
import { RuleMaze, calculatePointWithTime } from "./Rules";


export class Maze {
	public rule: IRule;
	public completedPoint: number = 0;
	public state: State = State.NOT_YET;
	public startTime: Date | null = null;
	public endTime: Date | null = null;
	public nodes: Array<Node> = []

	constructor(
		public keywords: string,
		public level: Level,
	) {
		this.rule = new RuleMaze(this.level)
	}

	createNode(url: string): Node {
		if (this.nodes.length + 1 > LevelMaxNode[this.level]) {
			throw new Error("Amount of Node invalid")
		}
		const node = new Node(this.level, url)
		this.nodes.push(node)
		
		return node
	}
} 

export function start(maze: Maze) {
	maze.startTime = new Date()
	maze = bumpUp(maze)
	maze.nodes[0] = startNode(maze.nodes[0])
	maze.state = State.WORKING;
}

export function bumpUp(maze: Maze) {
	maze.nodes.forEach((root, index) => {
		if (index === maze.nodes.length - 1) {
			root.isFinal = true
		} else {
			const others = maze.nodes.filter(item => item !== root);
			const shuffled = others.sort(() => 0.5 - Math.random());

			const randomCount = Math.max(2, Math.floor(Math.random() * others.length));
			const next = shuffled.slice(0, randomCount);

			root.clearNextNodes();
			next.forEach(node => root.addNextNode(node));
		}
	});

	return maze
}

export function end(maze: Maze) {
	if (!maze.startTime) {
		throw new Error("Maze has not been started yet. Call start() before stateDone().");
	}
	if (maze.endTime) {
		throw new Error("Maze end");
	}
	maze.state = State.DONE;
	maze.endTime = new Date();
	const completedTime = maze.endTime.getTime() - maze.startTime.getTime() / (60 * 1000);
	for (const node of maze.nodes) {
		maze.completedPoint += node.completedPoint;
	}
	calculatePointWithTime(maze.rule, completedTime)
	maze.completedPoint += maze.rule.maxCompletedPoint ?? 0;
}


export default Maze;
