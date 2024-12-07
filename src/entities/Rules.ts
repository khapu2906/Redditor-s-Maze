
import IRule from "./interfaces/IRule"
import { Level, DownLevelPoint, DownLevelWithTimeRate } from "./enums/Level"
import { DownTimePointKey } from "./enums/Point"

const MAX_COMPLETED_POINT_MAZE  = 200;
const MAX_COMPLETED_POINT_NODE  = 70;
const MAX_COMPLETED_POINT_QUICK = 50;


const DownTimePoint = {
	[DownTimePointKey.BY2M]: 0,
	[DownTimePointKey.F2MT5M]: 10,
	[DownTimePointKey.F5MT10M]: 20,
	[DownTimePointKey.AF10M]: 30,
}

class Rule implements IRule {
	public maxCompletedPoint: number = 0;

	constructor(
		public level: Level
	) {
		this.maxCompletedPoint -= DownLevelPoint[level]
	}

	public calculatePointWithTime(completedTime: number): void {
		let downTimePointKey: DownTimePointKey;

		if (completedTime < 2) {
			downTimePointKey = DownTimePointKey.BY2M
		} else if (completedTime < 5) {
			downTimePointKey = DownTimePointKey.F2MT5M
		} else if (completedTime < 10) {
			downTimePointKey = DownTimePointKey.F5MT10M
		} else {
			downTimePointKey = DownTimePointKey.AF10M
		}

		const downTimePoint: number = DownTimePoint[downTimePointKey];
		const downTimePointRateWithLevel: number = DownLevelWithTimeRate[this.level]

		this.maxCompletedPoint -= downTimePoint * downTimePointRateWithLevel;
	}
}

export class RuleMaze extends Rule {
	public override maxCompletedPoint: number = MAX_COMPLETED_POINT_MAZE;
}

export class RuleNode extends Rule {
	public override maxCompletedPoint: number = MAX_COMPLETED_POINT_NODE;
}

export class RuleQuick extends Rule {
	public override maxCompletedPoint: number = MAX_COMPLETED_POINT_QUICK;
}
