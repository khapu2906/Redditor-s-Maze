import { IExtendInfo, IQuestionAgg } from "./interfaces/IQuiz";
import { QuizType } from "./enums/QuizType"

import { Level } from "./enums/Level";
import IRule from "./interfaces/IRule"
import { RuleQuiz, calculatePointWithTime, clearMaxCompletedPoint } from "./Rules";

import { StateQuiz } from "./enums/State.js";
import { UUIDTypes, v4 as uuidv4 } from "uuid";


export class Quiz {
	public readonly id: UUIDTypes;

	public rule: IRule;
	public completedPoint: number = 0;
	public state: StateQuiz = StateQuiz.NOT_YET;
	public correctAnswer: string = "";
	public startTime: Date | null = null;
	public endTime: Date | null = null;
	public isFinal: boolean = false

	constructor(
		public level: Level,
		public info: IExtendInfo,
		public readonly nodeId: UUIDTypes,
		public type: QuizType
	) {
		this.id = uuidv4();
		this.rule = new RuleQuiz(this.level)
	}
}

export function start(quiz: Quiz) {
	quiz.startTime = new Date()
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
		quiz.endTime = new Date();
		const completedTime = quiz.endTime.getTime() - quiz.startTime.getTime() / (60 * 1000);
		calculatePointWithTime(quiz.rule, completedTime)
		quiz.completedPoint = quiz.rule.maxCompletedPoint;
	} else {
		quiz.state = StateQuiz.FAIL
		quiz.endTime = new Date();
		clearMaxCompletedPoint(quiz.rule)
		quiz.completedPoint = quiz.rule.maxCompletedPoint
		result = false
	}

	return {
		quiz,
		result
	}
}

export function createQuiz(quiz: Quiz) {
	switch (quiz.type) {
		case QuizType.FILL_BLANK:
			start(quiz)
			const words = quiz.info.content.split(' ');

			const randomIndex = Math.floor(Math.random() * words.length);
			quiz.correctAnswer = words[randomIndex];
			words[randomIndex] = "___";
			const questAgg =  {
				question: words.join(' '),
				options: []
			} as IQuestionAgg

			return {
				quiz,
				questAgg
			}
		case QuizType.MULTIPLE_CHOICE:
			start(quiz)
			quiz.correctAnswer = quiz.info.author;
			let question = "Who is author of this comment: \n";
			question += quiz.info.content;
			const options = [
				quiz.info.author,
				...quiz.info.noiseAuthor
			]
			function __shuffleArray(array: Array<string>) {
				for (let i = array.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[array[i], array[j]] = [array[j], array[i]];
				}
				return array;
			}

			const questAggMC = {
				question: words.join(' '),
				options: __shuffleArray(options)
			} as IQuestionAgg

			return {
				quiz,
				questAgg: questAggMC
			}
		
	}
}
