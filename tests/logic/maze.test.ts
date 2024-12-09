import Maze from "./../../src/entities/Maze";
import Node from "./../../src/entities/Node";
import { Level } from "./../../src/entities/enums/Level";
import { QuizFillBlank, QuizMultipleChoice } from "./../../src/entities/Quiz";

describe("Integration Test for Maze and Node", () => {
	const mockQuizInfo = [{
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
		const quiz1 = new QuizFillBlank(Level.EASY, mockQuizInfo[0]);
		const quiz2 = new QuizMultipleChoice(Level.EASY, mockQuizInfo[1]);
		const quiz3 = new QuizFillBlank(Level.EASY, mockQuizInfo[2]);
		const quiz4 = new QuizFillBlank(Level.EASY, mockQuizInfo[3]);

		const node1 = new Node([quiz1], Level.EASY, "url1");
		const node2 = new Node([quiz2], Level.EASY, "url2");
		const node3 = new Node([quiz3], Level.EASY, "url3");
		const node4 = new Node([quiz4], Level.EASY, "url3");

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
