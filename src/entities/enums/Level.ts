
export enum Level {
	EASY,
	MEDIUM,
	HARD
}

export const LevelMaxNode = {
	[Level.EASY]: 4,
	[Level.MEDIUM]: 5,
	[Level.HARD]: 6,
};

export const DownLevelPoint = {
	[Level.EASY]: -20,
	[Level.MEDIUM]: -10,
	[Level.HARD]: 0,
};

export const DownLevelWithTimeRate = {
	[Level.EASY]: 1,
	[Level.MEDIUM]: 0.6,
	[Level.HARD]: 0.3,
};