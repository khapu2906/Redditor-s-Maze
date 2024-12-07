import { Level } from "../enums/Level"

interface IRule {
	maxCompletedPoint: number;
	level: Level;
	calculatePointWithTime(completedTime: number): void;
}

export default IRule;