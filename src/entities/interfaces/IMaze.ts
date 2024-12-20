import { UUIDTypes } from "uuid";
import INode from "./INode";
interface IMaze {
	readonly id: UUIDTypes;
	completedPoint: number
	createNode(url: string): INode;
	getFirstNode(): INode;
	start(): void;
	end(): void;
}

export default IMaze;