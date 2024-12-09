import Node from "./../../src/entities/Node";
import { Level } from "./../../src/entities/enums/Level";
import { State } from "./../../src/entities/enums/State";
import { IQuick } from "./../../src/entities/interfaces/IQuick";

describe("Node Class", () => {
	let mockQuick: IQuick;

	beforeEach(() => {
		mockQuick = {
			completedPoint: 10,
			info: {
				content: "Sample content for testing",
				author: "Test Author",
				url: null,
				noiseAuthor: ["Author1", "Author2"],
			},
			createQuestion: jest.fn(),
			checkAnswer: jest.fn().mockReturnValue(true),
		};
	});

	test("Node initializes correctly", () => {
		const node = new Node([mockQuick], Level.EASY, "test-url");

		expect(node.completedPoint).toBe(0);
		expect(node.getNextNodes()).toEqual([]);
		expect(node.isFinal).toBe(false);
	});

	test("addNextNode and getNextNodes work correctly", () => {
		const node = new Node([mockQuick], Level.MEDIUM, "test-url");
		const nextNode = new Node([], Level.HARD, "next-url");

		node.addNextNode(nextNode);

		expect(node.getNextNodes()).toContain(nextNode);
	});

	test("clearNextNodes works correctly", () => {
		const node = new Node([mockQuick], Level.MEDIUM, "test-url");
		const nextNode = new Node([], Level.HARD, "next-url");

		node.addNextNode(nextNode);
		expect(node.getNextNodes()).toHaveLength(1);

		node.clearNextNodes();
		expect(node.getNextNodes()).toEqual([]);
	});

	test("start changes state to WORKING", () => {
		const node = new Node([mockQuick], Level.EASY, "test-url");
		node.start();

		expect(node["state"]).toBe(State.WORKING);
		expect(node["startTime"]).not.toBeNull();
	});

	test("end calculates points and changes state to DONE", () => {
		const node = new Node([mockQuick], Level.EASY, "test-url");

		node.start();
		jest.spyOn(Date, "now").mockReturnValueOnce(node["startTime"]!.getTime() + 5000); // Giả lập thời gian

		node.end();

		expect(node["state"]).toBe(State.DONE);
		expect(node["completedPoint"]).toBeGreaterThan(0);
	});

	test("end throws error if called without start", () => {
		const node = new Node([mockQuick], Level.EASY, "test-url");

		expect(() => node.end()).toThrowError("Node has not been started yet. Call start() before stateDone().");
	});

	test("end throws error if called multiple times", () => {
		const node = new Node([mockQuick], Level.EASY, "test-url");

		node.start();
		node.end();

		expect(() => node.end()).toThrowError("Node end");
	});

	test("_calculatePoint adds points correctly", () => {
		const node = new Node([mockQuick, mockQuick], Level.EASY, "test-url");
		const initialPoints = node.completedPoint;

		node.start();
		jest.spyOn(Date, "now").mockReturnValueOnce(node["startTime"]!.getTime() + 3000); // 3 giây

		node.end();

		expect(node.completedPoint).toBeGreaterThan(initialPoints);
	});
});
