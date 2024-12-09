
import IRule from "./interfaces/IRule"
import { Level, DownLevelPoint, DownLevelWithTimeRate } from "./enums/Level"
import { DownTimePointKey } from "./enums/Point"

const MAX_COMPLETED_POINT_MAZE  = 400;
const MAX_COMPLETED_POINT_NODE  = 100;
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
	) {}

	protected setMaxCompletedPoint() {
		this.maxCompletedPoint += DownLevelPoint[this.level]
	}

	public clearMaxCompletedPoint() {
		this.maxCompletedPoint = 0;
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
		this.maxCompletedPoint = this.maxCompletedPoint > 0 ? this.maxCompletedPoint : 0;
	}
}

export class RuleMaze extends Rule {
	public override maxCompletedPoint: number = MAX_COMPLETED_POINT_MAZE;

	constructor(
		level: Level
	) {
		super(level);
		this.setMaxCompletedPoint()
	}
}

export class RuleNode extends Rule {

	public override maxCompletedPoint: number = MAX_COMPLETED_POINT_NODE;

	constructor(
		level: Level
	) {
		super(level);
		this.setMaxCompletedPoint()
	}
}

export class RuleQuick extends Rule {
	public override maxCompletedPoint: number = MAX_COMPLETED_POINT_QUICK;

	constructor(
		level: Level
	) {
		super(level);
		this.setMaxCompletedPoint()
	}
}
