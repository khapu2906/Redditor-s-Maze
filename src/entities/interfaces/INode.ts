
import { UUIDTypes } from "uuid";
import { IExtendInfo, IQuiz } from "./IQuiz";
import { QuizType } from "../enums/QuizType";

interface INode {
	readonly id: UUIDTypes;
	readonly mazeId: UUIDTypes
	url: string,
	completedPoint: number
	isFinal: boolean
	getNextNodes(): Array<INode>
	addNextNode(node: INode): void
	clearNextNodes(): void;
	createQuiz(info: IExtendInfo, type: QuizType): IQuiz;
	end(): void;
	start(): void;
}

export default INode;