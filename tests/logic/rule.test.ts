import { RuleMaze, RuleNode, RuleQuiz } from "./../../src/entities/Rules";
import { Level } from "./../../src/entities/enums/Level";
import { DownTimePointKey } from "./../../src/entities/enums/Point";

describe("Rule Classes", () => {
	test("RuleMaze initializes with correct maxCompletedPoint", () => {
		const ruleMaze = new RuleMaze(Level.EASY);
		expect(ruleMaze.maxCompletedPoint).toBe(380);
	});

	test("RuleNode initializes with correct maxCompletedPoint", () => {
		const ruleNode = new RuleNode(Level.MEDIUM);
		expect(ruleNode.maxCompletedPoint).toBe(90);
	});

	test("RuleQuiz initializes with correct maxCompletedPoint", () => {
		const ruleQuiz = new RuleQuiz(Level.HARD);
		expect(ruleQuiz.maxCompletedPoint).toBe(50);
	});

	test("RuleMaze calculates points correctly with time", () => {
		const ruleMaze = new RuleMaze(Level.MEDIUM);

		ruleMaze.calculatePointWithTime(1);
		expect(ruleMaze.maxCompletedPoint).toBe(390 - 0);

		ruleMaze.calculatePointWithTime(3);
		expect(ruleMaze.maxCompletedPoint).toBe(390 - 6);

		ruleMaze.calculatePointWithTime(7);
		expect(ruleMaze.maxCompletedPoint).toBe(390 - 18);

		ruleMaze.calculatePointWithTime(15);
		expect(ruleMaze.maxCompletedPoint).toBe(390 - 36);
	});

	test("RuleNode calculates points correctly with time", () => {
		const ruleNode = new RuleNode(Level.HARD);

		ruleNode.calculatePointWithTime(1);
		expect(ruleNode.maxCompletedPoint).toBe(100 - 0);

		ruleNode.calculatePointWithTime(3);
		expect(ruleNode.maxCompletedPoint).toBe(100 - 3);

		ruleNode.calculatePointWithTime(7);
		expect(ruleNode.maxCompletedPoint).toBe(100 - 9);

		ruleNode.calculatePointWithTime(15);
		expect(ruleNode.maxCompletedPoint).toBe(100 - 18);
	});

	test("RuleQuiz calculates points correctly with time", () => {
		const ruleQuiz = new RuleQuiz(Level.EASY);

		ruleQuiz.calculatePointWithTime(1);
		expect(ruleQuiz.maxCompletedPoint).toBe(30 - 0);

		ruleQuiz.calculatePointWithTime(3);
		expect(ruleQuiz.maxCompletedPoint).toBe(30 - 10);

		ruleQuiz.calculatePointWithTime(7);
		expect(ruleQuiz.maxCompletedPoint).toBe(30 - 30);

		ruleQuiz.calculatePointWithTime(15);
		expect(ruleQuiz.maxCompletedPoint).toBe(30 - 30);
	});
});
