import Maze from "./../../src/entities/Maze";
import Node from "./../../src/entities/Node";
import { Level } from "./../../src/entities/enums/Level";
import { QuickFillBlank, QuickMultipleChoice } from "./../../src/entities/Quick";

describe("Integration Test for Maze and Node", () => {
	test("Maze bumpUp() correctly sets nextNodes and isFinal", () => {
		const quick1 = new QuickFillBlank(Level.EASY, "Question 1");
		const quick2 = new QuickMultipleChoice(Level.EASY, "Question 2");
		const quick3 = new QuickFillBlank(Level.EASY, "Question 3");
		const quick4 = new QuickFillBlank(Level.EASY, "Question 3");

		const node1 = new Node([quick1], Level.EASY, "url1");
		const node2 = new Node([quick2], Level.EASY, "url2");
		const node3 = new Node([quick3], Level.EASY, "url3");
		const node4 = new Node([quick4], Level.EASY, "url3");

		const maze = new Maze(["keyword1", "keyword2"], Level.EASY, [node1, node2, node3, node4]);

		// Gọi bumpUp()
		maze.bumpUp();

		console.log(node4.getNextNodes())
		// Kiểm tra Node cuối cùng
		expect(node4.getNextNodes()).toHaveLength(0);
		expect(node4.isFinal).toBe(true);

		// Kiểm tra các Node khác
		[node1, node2, node3].forEach(node => {
			const nextNodes = node.getNextNodes();
			expect(nextNodes.length).toBeGreaterThanOrEqual(2);
			expect(nextNodes).not.toContain(node); // Đảm bảo Node không tự trỏ vào chính nó
		});
	});
});
