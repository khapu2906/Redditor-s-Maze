import Node from "./../../src/entities/Node";
import { Level } from "./../../src/entities/enums/Level";
import { State } from "./../../src/entities/enums/State";
import { IQuiz } from "./../../src/entities/interfaces/IQuiz";
import { UUIDTypes, v4 as uuidv4 } from "uuid";

describe("Node Class", () => {
	let mockQuiz: IQuiz;
	const mazeId: UUIDTypes = uuidv4()
	beforeEach(() => {
	});

	test("Node initializes correctly", () => {
		const node = new Node(Level.EASY, "test-url", mazeId);

		expect(node.completedPoint).toBe(0);
		expect(node.getNextNodes()).toEqual([]);
		expect(node.isFinal).toBe(false);
	});

	test("addNextNode and getNextNodes work correctly", () => {
		const node = new Node(Level.MEDIUM, "test-url", mazeId);
		const nextNode = new Node(Level.HARD, "next-url", mazeId);

		node.addNextNode(nextNode);

		expect(node.getNextNodes()).toContain(nextNode);
	});

	test("clearNextNodes works correctly", () => {
		const node = new Node(Level.MEDIUM, "test-url", mazeId);
		const nextNode = new Node(Level.HARD, "next-url", mazeId);

		node.addNextNode(nextNode);
		expect(node.getNextNodes()).toHaveLength(1);

		node.clearNextNodes();
		expect(node.getNextNodes()).toEqual([]);
	});

	test("start changes state to WORKING", () => {
		const node = new Node(Level.EASY, "test-url", mazeId);
		node.start();

		expect(node["state"]).toBe(State.WORKING);
		expect(node["startTime"]).not.toBeNull();
	});

	test("end calculates points and changes state to DONE", () => {
		const node = new Node(Level.EASY, "test-url", mazeId);

		node.start();
		jest.spyOn(Date, "now").mockReturnValueOnce(node["startTime"]!.getTime() + 5000);

		node.end();

		expect(node["state"]).toBe(State.DONE);
		expect(node["completedPoint"]).toBeGreaterThan(0);
	});

	test("end throws error if called without start", () => {
		const node = new Node(Level.EASY, "test-url", mazeId);

		expect(() => node.end()).toThrowError("Node has not been started yet. Call start() before stateDone().");
	});

	test("end throws error if called multiple times", () => {
		const node = new Node(Level.EASY, "test-url", mazeId);

		node.start();
		node.end();

		expect(() => node.end()).toThrowError("Node end");
	});

	test("_calculatePoint adds points correctly", () => {
		const node = new Node(Level.EASY, "test-url", mazeId);
		const initialPoints = node.completedPoint;

		node.start();
		jest.spyOn(Date, "now").mockReturnValueOnce(node["startTime"]!.getTime() + 3000); // 3 giây

		node.end();

		expect(node.completedPoint).toBeGreaterThan(initialPoints);
	});
});
