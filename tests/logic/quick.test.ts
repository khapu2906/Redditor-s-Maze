import { QuickFillBlank, QuickMultipleChoice } from './../../src/entities/Quick';
import { Level } from './../../src/entities/enums/Level';
import { StateQuick } from './../../src/entities/enums/State';

describe('QuickFillBlank Tests', () => {
	const mockInfo = {
		content: "This is a test sentence",
		author: "Test Author",
		noiseAuthor: ["Author A", "Author B"],
		url: null
	};

	it('should create a question with a blank', () => {
		const quickFillBlank = new QuickFillBlank(Level.EASY, mockInfo);
		const questionAgg = quickFillBlank.createQuestion();

		expect(questionAgg.question).toContain('___');
		expect(questionAgg.options).toEqual([]);
	});

	it('should check the correct answer - correct', () => {
		const quickFillBlank = new QuickFillBlank(Level.EASY, mockInfo);
		const questionAgg = quickFillBlank.createQuestion();

		const correctAnswer = quickFillBlank.getCorrectAnswer();
		expect(quickFillBlank.checkAnswer(correctAnswer)).toBe(true);
	});

	it('should check the correct answer - wrong', () => {
		const quickFillBlank = new QuickFillBlank(Level.EASY, mockInfo);
		const questionAgg = quickFillBlank.createQuestion();

		const correctAnswer = quickFillBlank.getCorrectAnswer();

		expect(quickFillBlank.checkAnswer("Wrong Answer")).toBe(false);
	});
});

describe('QuickMultipleChoice Tests', () => {
	const mockInfo = {
		content: "This is a test comment",
		author: "Test Author",
		noiseAuthor: ["Author A", "Author B"],
		url: null
	};

	it('should create a multiple choice question', () => {
		const quickMultipleChoice = new QuickMultipleChoice(Level.MEDIUM, mockInfo);
		const questionAgg = quickMultipleChoice.createQuestion();

		expect(questionAgg.question).toContain('Who is author of this comment:');
		expect(questionAgg.options).toContain(mockInfo.author);
		expect(questionAgg.options).toEqual(
			expect.arrayContaining(mockInfo.noiseAuthor)
		);
	});

	it('should check the correct answer - correct', () => {
		const quickMultipleChoice = new QuickMultipleChoice(Level.MEDIUM, mockInfo);
		quickMultipleChoice.createQuestion();

		expect(quickMultipleChoice.checkAnswer(mockInfo.author)).toBe(true);
	});

	it('should check the correct answer - wrong', () => {
		const quickMultipleChoice = new QuickMultipleChoice(Level.MEDIUM, mockInfo);
		quickMultipleChoice.createQuestion();

		expect(quickMultipleChoice.checkAnswer("Wrong Author")).toBe(false);
	});
});
