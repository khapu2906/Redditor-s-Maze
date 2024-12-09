import INode from "./interfaces/INode";

import IMaze from "./interfaces/IMaze";

import { Level, LevelMaxNode } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleMaze } from "./Rules";

import { State } from "./enums/State";
import { UUIDTypes, v4 as uuidv4 } from "uuid";

import Node from "./Node";

class Maze implements IMaze {
	public readonly id: UUIDTypes;
	private rule: IRule;
	public completedPoint: number = 0;
	private state: State = State.NOT_YET;
	private startTime: Date | null = null;
	private endTime: Date | null = null;
	private nodes: Array<INode> = []

	constructor(
		private keywords: Array<string>,
		private level: Level,
	) {
		this.id = uuidv4();
		this.rule = new RuleMaze(this.level)
	}

	start() {
		this.startTime = new Date()
		this.bumpUp()
		this.state = State.WORKING;
	}

	createNode(url: string): INode {
		if (this.nodes.length + 1 > LevelMaxNode[this.level]) {
			throw new Error("Amount of Node invalid")
		}
		const node = new Node(this.level, url, this.id)
		this.nodes.push(node)
		
		return node
	}

	getKeyWords() {
		return this.keywords
	}

	getNodes() {
		return this.nodes
	}

	getFirstNode() {
		return this.nodes[0]
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
		const completedTime = this.endTime.getTime() - this.startTime.getTime() / (60 * 1000);
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