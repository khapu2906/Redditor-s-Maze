import Maze from "./../../src/entities/Maze";
import Node from "./../../src/entities/Node";
import { Level } from "./../../src/entities/enums/Level";
import { QuizFillBlank, QuizMultipleChoice } from "./../../src/entities/Quiz";
import { QuizType, QuizTypeClass } from "./../../src/entities/enums/QuizType"


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
		const maze = new Maze("keyword1", Level.HARD);

		const node1 = maze.createNode("ur1")
		const quiz1 = node1.createQuiz(mockQuizInfo[0], QuizType.FILL_BLANK)

		const node2 = maze.createNode("ur2")
		const quiz2 = node2.createQuiz(mockQuizInfo[1], QuizType.MULTIPLE_CHOICE)

		const node3 = maze.createNode("ur3")
		const quiz3 = node3.createQuiz(mockQuizInfo[2], QuizType.MULTIPLE_CHOICE)

		const node4 = maze.createNode("ur4")
		const quiz4 = node4.createQuiz(mockQuizInfo[3], QuizType.MULTIPLE_CHOICE)


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
