import INode from "./interfaces/INode";
import IQuick from "./interfaces/IQuick";

import { Level } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleNode } from "./Rules";

import { State } from "./enums/State";

class Node implements INode {
	public completedPoint: number = 0;

	private rule: IRule;
	private nextNodes: Array<INode> = []
	private state: State = State.NOT_YET;

	public isFinal: boolean = false

	constructor(
		private quicks: Array<IQuick>,
		private level: Level,
		public url: string
	) {
		this.rule = new RuleNode(this.level)
	}

	addNextNode(node: INode) {
		this.nextNodes.push(node);
	}

	getNextNodes() {
		return this.nextNodes
	}

	stateWorking() {
		this.state = State.WORKING
	}

	stateDone(completedTime: number) {
		this.state = State.DONE
		this._calculatePoint(completedTime)
	}

	private _calculatePoint(completedTime: number): void {
		for (const quick of this.quicks) {
			this.completedPoint += quick.completedPoint;
		}
		this.rule.calculatePointWithTime(completedTime);
		this.completedPoint += this.rule.maxCompletedPoint ?? 0;
	}
}

export default Node;