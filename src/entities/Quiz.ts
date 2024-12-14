import { IExtendInfo, IQuestionAgg } from "./interfaces/IQuiz";
import { QuizType } from "./enums/QuizType"

import { Level } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleQuiz, calculatePointWithTime, clearMaxCompletedPoint } from "./Rules";

import { StateQuiz } from "./enums/State";

export class Quiz {
	public rule: IRule;
	public completedPoint: number = 0;
	public state: StateQuiz = StateQuiz.NOT_YET;
	public correctAnswer: string = "";
	public startTime: number = 0;
	public endTime: number = 0;
	public isFinal: boolean = false
	public questAgg: IQuestionAgg 

	constructor(
		public level: Level,
		public info: IExtendInfo,
		public type: QuizType
	) {
		this.rule = new RuleQuiz(this.level)
		this.createQuestion(this.type)
	}

	public createQuestion(type: QuizType) {
		try {
			switch (type) {
				case QuizType.FILL_BLANK:
					let words = this.info.content.split(' ');
					if (words.length == 1) {
						words = words[0].split('')
					}
					const randomIndex = Math.floor(Math.random() * words.length);
					this.correctAnswer = words[randomIndex];
					words[randomIndex] = "___";
					this.questAgg = {
						question: words.join(' '),
						options: []
					} as IQuestionAgg

					break;
				case QuizType.MULTIPLE_CHOICE:
					this.correctAnswer = this.info.author;
					let question = "Who is author of this comment: \n";
					question += this.info.content;
					const options = [
						this.info.author,
						...this.info.noiseAuthor
					]
					function __shuffleArray(array: Array<string>) {
						for (let i = array.length - 1; i > 0; i--) {
							const j = Math.floor(Math.random() * (i + 1));
							[array[i], array[j]] = [array[j], array[i]];
						}
						return array;
					}

					this.questAgg = {
						question,
						options: __shuffleArray(options)
					} as IQuestionAgg
					break;
			}
		} catch (error) {
			console.debug("Info:", this.info)
			console.error(error)
		}
	}
}

export function start(quiz: Quiz) {
	quiz.startTime = (new Date()).getTime()
	quiz.state = StateQuiz.WORKING

	return quiz
}

export function checkAnswer(quiz: Quiz, answer: string) {
	let result = false

	if (!quiz.startTime) {
		throw new Error("Quiz has not been started yet. Call start() before stateDone().");
	}
	if (quiz.endTime) {
		throw new Error("Quiz end");
	}

	if (answer.toLowerCase() === quiz.correctAnswer.toLowerCase()) {
		result = true
		quiz.state = StateQuiz.SUCCESS
		quiz.endTime = (new Date()).getTime();
		const completedTime = quiz.endTime - quiz.startTime / (60 * 1000);
		calculatePointWithTime(quiz.rule, completedTime)
		quiz.completedPoint = quiz.rule.maxCompletedPoint;
	} else {
		quiz.state = StateQuiz.FAIL
		quiz.endTime = (new Date()).getTime();
		quiz.completedPoint = 0
		result = false
	}

	return {
		quiz,
		result
	}
}
