import { IExtendInfo } from "./interfaces/IQuiz";
import { QuizType } from "./enums/QuizType.js"

import { Level } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleNode, calculatePointWithTime } from "./Rules";

import { State } from "./enums/State.js";
import { UUIDTypes, v4 as uuidv4 } from "uuid";

import { Quiz } from "./Quiz";

export class Node {
	public readonly id: UUIDTypes;
	public completedPoint: number = 0;

	public rule: IRule;
	public nextNodes: Array<Node> = []
	public state: State = State.NOT_YET;
	public startTime: Date | null = null;
	public endTime: Date | null = null;

	public isFinal: boolean = false
	public quizs: Array<Quiz> = []

	constructor(
		public level: Level,
		public url: string,
		public readonly mazeId: UUIDTypes
	) {
		this.id = uuidv4();
		this.rule = new RuleNode(this.level)
	}

	addNextNode(node: Node) {
		this.nextNodes.push(node);
	}

	getNextNodes() {
		return this.nextNodes
	}

	clearNextNodes(): void {
		this.nextNodes = [];
	}

	createQuiz(info: IExtendInfo, type: QuizType = QuizType.FILL_BLANK): Quiz {
		const quiz = new Quiz(this.level, info, this.id, type)
		this.quizs.push(quiz)

		return quiz;
	}
}

export function start(node: Node) {
	node.startTime = new Date()
	node.state = State.WORKING

	return node
}

export function end(node: Node) {
	if (!node.startTime) {
		throw new Error("Node has not been started yet. Call start() before stateDone().");
	}
	if (node.endTime) {
		throw new Error("Node end");
	}
	node.state = State.DONE
	node.endTime = new Date();
	const completedTime = node.endTime.getTime() - node.startTime.getTime() / (60 * 1000);
	for (const quiz of node.quizs) {
		node.completedPoint += quiz.completedPoint;
	}
	calculatePointWithTime(node.rule, completedTime);
	node.completedPoint += node.rule.maxCompletedPoint ?? 0;

	return node;
}

export default Node;