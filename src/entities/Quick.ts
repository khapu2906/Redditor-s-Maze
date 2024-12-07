import IQuick from "./interfaces/IQuick";

import { Level } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleQuick } from "./Rules";

import { StateQuick } from "./enums/State";

export abstract class Quick implements IQuick {
	protected rule: IRule;
	public completedPoint: number = 0;
	private state: StateQuick = StateQuick.NOT_YET;
	protected correctAnswer: String = "";
	
	constructor(
		private level: Level,
		public content: String,
	) {
		this.rule = new RuleQuick(this.level)
	}

	abstract createQuestion(extendInfo: any): string;

	stateWorking() {
		this.state = StateQuick.WORKING
	}

	stateSuccess(completedTime: number): void {
		this.state = StateQuick.SUCCESS
		this.rule.calculatePointWithTime(completedTime)
		this.completedPoint = this.rule.maxCompletedPoint;
	}

	stateFail() {
		this.state = StateQuick.FAIL
	}

	public checkAnswer(answer: string): boolean {
		if (answer.toLowerCase() === this.correctAnswer.toLowerCase()) {
			return true;
		} else {
			this.stateFail();
			return false
		}
	}
}

export class QuickFillBlank extends Quick {
	override createQuestion(): string {
		const words = this.content.split(' ');

		const randomIndex = Math.floor(Math.random() * words.length);
		this.correctAnswer = words[randomIndex];
		words[randomIndex] = "___";
		return words.join(' ');
	}

	
}

export class QuickMultipleChoice extends Quick {
	override createQuestion(): string {
		return "";
	}
}

export default Quick;