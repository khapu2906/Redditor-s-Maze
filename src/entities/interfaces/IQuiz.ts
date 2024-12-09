

import { UUIDTypes } from "uuid";

export interface IExtendInfo {
	content: string;
	author: string;
	url: string | null;
	noiseAuthor: Array<string>
}

export interface IQuestionAgg {
	question: string;
	options: Array<string>
}
export interface IQuiz {
	readonly id: UUIDTypes;
	readonly nodeId: UUIDTypes
	completedPoint: number;
	info: IExtendInfo;
	isFinal: boolean
	createQuestion(): IQuestionAgg;
	checkAnswer(answer: string): boolean;
}
