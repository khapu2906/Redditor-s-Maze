import Maze from "./../../src/entities/Maze";
import Node from "./../../src/entities/Node";
import { Level } from "./../../src/entities/enums/Level";
import { QuickFillBlank, QuickMultipleChoice } from "./../../src/entities/Quick";

describe("Integration Test for Maze and Node", () => {
	const mockQuickInfo = [{
		content: "This is a test sentence 1",
		author: "Test Author",
		noiseAuthor: ["Author A", "Author B"],
		url: null,
	},
		{
			content: "This is a test sentence 2",
			author: "Test Author A",
			noiseAuthor: ["Author A", "Author B"],
			url: null,
		},
		{
			content: "This is a test sentence 3",
			author: "Test Author",
			noiseAuthor: ["Author B"],
			url: null,
		},
		{
			content: "This is a test sentence 4",
			author: "Test Author",
			noiseAuthor: ["Author A",],
			url: null,
		}
	];
	test("Maze start correctly sets nextNodes and isFinal", () => {
		const quick1 = new QuickFillBlank(Level.EASY, mockQuickInfo[0]);
		const quick2 = new QuickMultipleChoice(Level.EASY, mockQuickInfo[1]);
		const quick3 = new QuickFillBlank(Level.EASY, mockQuickInfo[2]);
		const quick4 = new QuickFillBlank(Level.EASY, mockQuickInfo[3]);

		const node1 = new Node([quick1], Level.EASY, "url1");
		const node2 = new Node([quick2], Level.EASY, "url2");
		const node3 = new Node([quick3], Level.EASY, "url3");
		const node4 = new Node([quick4], Level.EASY, "url3");

		const maze = new Maze(["keyword1", "keyword2"], Level.EASY, [node1, node2, node3, node4]);

		maze.start();

		expect(node4.getNextNodes()).toHaveLength(0);
		expect(node4.isFinal).toBe(true);

		[node1, node2, node3].forEach(node => {
			const nextNodes = node.getNextNodes();
			expect(nextNodes.length).toBeGreaterThanOrEqual(2);
			expect(nextNodes).not.toContain(node);
		});
	});
});
