import { Level } from "../enums/Level"

interface IRule {
	maxCompletedPoint: number;
	level: Level;
	calculatePointWithTime(completedTime: number): void;
	clearMaxCompletedPoint(): void;
}

export default IRule;