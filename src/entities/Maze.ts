import INode from "./interfaces/INode";

import IMaze from "./interfaces/IMaze";

import { Level, LevelMaxNode } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleMaze } from "./Rules";

import { State } from "./enums/State";


class Maze implements IMaze {
	private rule: IRule;
	public completedPoint: number = 0;
	private state: State = State.NOT_YET;
	private startTime: Date | null = null;
	private endTime: Date | null = null;

	constructor(
		private keywords: Array<string>,
		private level: Level,
		private nodes: Array<INode>
	) {
		this.rule = new RuleMaze(this.level)

		if (this.nodes.length !== LevelMaxNode[this.level]) {
			throw new Error("Amount of Node invalid")
		}
	}

	start() {
		this.startTime = new Date()
		this.bumpUp()
		this.state = State.WORKING;
	}

	getKeyWords() {
		return this.keywords
	}

	getNodes() {
		return this.nodes
	}

	bumpUp() {
		this.nodes.forEach((root, index) => {
			if (index === this.nodes.length - 1) {
				root.isFinal = true
			} else {
				const others = this.nodes.filter(item => item !== root); 
				const shuffled = others.sort(() => 0.5 - Math.random()); 

				const randomCount = Math.max(2, Math.floor(Math.random() * others.length));
				const next = shuffled.slice(0, randomCount);

				root.clearNextNodes();
				next.forEach(node => root.addNextNode(node));
			}
		});
	}

	public end() {
		if (!this.startTime) {
			throw new Error("Maze has not been started yet. Call start() before stateDone().");
		}
		if (this.endTime) {
			throw new Error("Maze end");
		}
		this.state = State.DONE;
		this.endTime = new Date();
		const completedTime = this.endTime.getTime() - this.startTime.getTime() / 1000;
		this._calculatePoint(completedTime);
	}

	private _calculatePoint(completedTime: number): void {
		for (const node of this.nodes) {
			this.completedPoint += node.completedPoint;
		}
		this.rule.calculatePointWithTime(completedTime);
		this.completedPoint += this.rule.maxCompletedPoint ?? 0;
	}

} 

export default Maze;