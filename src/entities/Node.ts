import INode from "./interfaces/INode";
import { IQuiz } from "./interfaces/IQuiz";

import { Level } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleNode } from "./Rules";

import { State } from "./enums/State";

class Node implements INode {
	public completedPoint: number = 0;

	private rule: IRule;
	private nextNodes: Array<INode> = []
	private state: State = State.NOT_YET;
	private startTime: Date | null = null;
	private endTime: Date | null = null;

	public isFinal: boolean = false

	constructor(
		private quizs: Array<IQuiz>,
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

	clearNextNodes(): void {
		this.nextNodes = [];
	}

	stateWorking() {
		this.state = State.WORKING
	}

	start() {
		this.startTime = new Date()
		this.stateWorking()
	}

	end() {
		if (!this.startTime) {
			throw new Error("Node has not been started yet. Call start() before stateDone().");
		}
		if (this.endTime) {
			throw new Error("Node end");
		}
		this.state = State.DONE
		this.endTime = new Date();
		const completedTime = this.endTime.getTime() - this.startTime.getTime() / 1000;
		this._calculatePoint(completedTime)
	}

	private _calculatePoint(completedTime: number): void {
		for (const quiz of this.quizs) {
			this.completedPoint += quiz.completedPoint;
		}
		this.rule.calculatePointWithTime(completedTime);
		this.completedPoint += this.rule.maxCompletedPoint ?? 0;
	}
}

export default Node;