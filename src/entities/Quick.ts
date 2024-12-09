import { IQuick, IExtendInfo, IQuestionAgg } from "./interfaces/IQuick";

import { Level } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleQuick } from "./Rules";

import { StateQuick } from "./enums/State";

export abstract class Quick implements IQuick {
	protected rule: IRule;
	public completedPoint: number = 0;
	private state: StateQuick = StateQuick.NOT_YET;
	protected correctAnswer: string = "";
	protected startTime: Date | null = null;
	protected endTime: Date | null = null;

	constructor(
		private level: Level,
		public info: IExtendInfo,
	) {
		this.rule = new RuleQuick(this.level)
	}

	abstract createQuestion(): IQuestionAgg;

	start() {
		this.startTime = new Date()
		this.stateWorking()
	}

	stateWorking() {
		this.state = StateQuick.WORKING
	}

	stateSuccess(): void {
		if (!this.startTime) {
			throw new Error("Quick has not been started yet. Call start() before stateDone().");
		}
		if (this.endTime) {
			throw new Error("Quick end");
		}
		this.state = StateQuick.SUCCESS
		this.endTime = new Date();
		const completedTime = this.endTime.getTime() - this.startTime.getTime() / 1000;
		this.rule.calculatePointWithTime(completedTime)
		this.completedPoint = this.rule.maxCompletedPoint;
	}

	stateFail() {
		if (!this.startTime) {
			throw new Error("Quick has not been started yet. Call start() before stateDone().");
		}
		if (this.endTime) {
			throw new Error("Quick end");
		}
		this.state = StateQuick.FAIL
		this.endTime = new Date();
		this.rule.clearMaxCompletedPoint()
		this.completedPoint = this.rule.maxCompletedPoint
	}

	public checkAnswer(answer: string): boolean {
		if (answer.toLowerCase() === this.correctAnswer.toLowerCase()) {
			this.stateSuccess()
			return true;
		} else {
			this.stateFail();
			return false
		}
	}

	getCorrectAnswer(): string {
		return this.correctAnswer;
	}
}

export class QuickFillBlank extends Quick {
	override createQuestion(): IQuestionAgg {
		this.start()
		const words = this.info.content.split(' ');

		const randomIndex = Math.floor(Math.random() * words.length);
		this.correctAnswer = words[randomIndex];
		words[randomIndex] = "___";
		return {
			question: words.join(' '),
			options: []
		} as IQuestionAgg
	}
}

export class QuickMultipleChoice extends Quick {
	override createQuestion(): IQuestionAgg {
		this.start()
		this.correctAnswer = this.info.author;
		let question = "Who is author of this comment: \n";
		question += this.info.content;
		return {
			question,
			options: [
				this.info.author,
				...this.info.noiseAuthor
			]
		} as IQuestionAgg;
	}
}
