import INode from "./interfaces/INode";

import IMaze from "./interfaces/IMaze";

import { Level, LevelMaxNode } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleMaze } from "./Rules";

import { State } from "./enums/State";


class Maze implements IMaze {
	private rule: IRule;
	// private finalNode: INode | null;
	public completedPoint: number = 0;
	private state: State = State.NOT_YET;

	constructor(
		private keywords: Array<String>,
		private level: Level,
		private nodes: Array<INode>
	) {
		this.rule = new RuleMaze(this.level)

		if (this.nodes.length !== LevelMaxNode[this.level]) {
			throw new Error("Amount of Node invalid")
		}
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

				root.getNextNodes().length = 0;
				next.forEach(node => root.addNextNode(node));
			}
		});
	}


	public stateDone(completedTime: number) {
		this.state = State.DONE
		this._calculatePoint(completedTime)
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