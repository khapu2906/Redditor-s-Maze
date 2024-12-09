import { IQuiz, IExtendInfo, IQuestionAgg } from "./interfaces/IQuiz";

import { Level } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleQuiz } from "./Rules";

import { StateQuiz } from "./enums/State";
import { UUIDTypes, v4 as uuidv4 } from "uuid";
export abstract class Quiz implements IQuiz {
	public readonly id: UUIDTypes;

	protected rule: IRule;
	public completedPoint: number = 0;
	private state: StateQuiz = StateQuiz.NOT_YET;
	protected correctAnswer: string = "";
	protected startTime: Date | null = null;
	protected endTime: Date | null = null;
	public isFinal: boolean = false

	constructor(
		private level: Level,
		public info: IExtendInfo,
		public readonly nodeId: UUIDTypes
	) {
		this.id = uuidv4();
		this.rule = new RuleQuiz(this.level)
	}

	abstract createQuestion(): IQuestionAgg;

	start() {
		this.startTime = new Date()
		this.stateWorking()
	}

	stateWorking() {
		this.state = StateQuiz.WORKING
	}

	stateSuccess(): void {
		if (!this.startTime) {
			throw new Error("Quiz has not been started yet. Call start() before stateDone().");
		}
		if (this.endTime) {
			throw new Error("Quiz end");
		}
		this.state = StateQuiz.SUCCESS
		this.endTime = new Date();
		const completedTime = this.endTime.getTime() - this.startTime.getTime() / (60 * 1000);
		this.rule.calculatePointWithTime(completedTime)
		this.completedPoint = this.rule.maxCompletedPoint;
	}

	stateFail() {
		if (!this.startTime) {
			throw new Error("Quiz has not been started yet. Call start() before stateDone().");
		}
		if (this.endTime) {
			throw new Error("Quiz end");
		}
		this.state = StateQuiz.FAIL
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

export class QuizFillBlank extends Quiz {
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

export class QuizMultipleChoice extends Quiz {
	override createQuestion(): IQuestionAgg {
		this.start()
		this.correctAnswer = this.info.author;
		let question = "Who is author of this comment: \n";
		question += this.info.content;
		const options = [
			this.info.author,
			...this.info.noiseAuthor
		]
		return {
			question,
			options: this.__shuffleArray(options)
		} as IQuestionAgg;
	}

	private __shuffleArray(array: Array<string>) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
}
