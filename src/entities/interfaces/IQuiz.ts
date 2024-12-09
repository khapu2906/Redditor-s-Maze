

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
	completedPoint: number;
	info: IExtendInfo;
	createQuestion(): IQuestionAgg;
	checkAnswer(answer: string): boolean;
}
